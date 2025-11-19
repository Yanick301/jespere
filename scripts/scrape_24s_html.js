#!/usr/bin/env node
// Lightweight HTML scraper for 24s.com using axios + cheerio
// Usage: node scrape_24s_html.js --categories="women-knitwear,women-coats,men-knitwear,men-coats" --limit=50 --downloadImages=false

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { URL } = require('url')

function parseArgs() {
  const args = process.argv.slice(2)
  const out = { categories: [], limit: 50, downloadImages: false }
  for (const a of args) {
    if (a.startsWith('--categories=')) {
      out.categories = a.split('=')[1].split(',').map(s => s.trim()).filter(Boolean)
    } else if (a.startsWith('--limit=')) {
      out.limit = parseInt(a.split('=')[1], 10) || 50
    } else if (a === '--downloadImages' || a === '--downloadImages=true') {
      out.downloadImages = true
    }
  }
  return out
}

function candidatesForCategory(keyword) {
  const base = 'https://www.24s.com'
  const k = keyword.toLowerCase()
  return [
    `${base}/en-eu/women/${k}`,
    `${base}/en-eu/men/${k}`,
    `${base}/en-eu/shop/women/${k}`,
    `${base}/en-eu/shop/men/${k}`,
    `${base}/en-us/women/${k}`,
    `${base}/en-us/men/${k}`,
    `${base}/us-en/${k}`,
    `${base}/en/${k}`,
  ]
}

async function tryFetch(url) {
  try {
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0; +https://example.com/bot)' }, timeout: 15000 })
    if (res.status >= 200 && res.status < 300) return res.data
  } catch (e) {
    return null
  }
  return null
}

function extractProductLinksFromHtml(html, baseUrl) {
  const $ = cheerio.load(html)
  const links = new Set()
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href')
    if (!href) return
    // Heuristics: product urls often contain "/product/" or have many path segments
    if (/product|product-detail|\/p\-|/i.test(href) || href.split('/').length > 4) {
      try {
        const u = new URL(href, baseUrl).toString()
        if (u.includes('24s.com')) links.add(u.split('?')[0])
      } catch (e) {}
    }
  })
  return Array.from(links)
}

function extractProductData(html, pageUrl) {
  const $ = cheerio.load(html)
  const data = {}
  data.url = pageUrl
  data.title = ($('h1').first().text() || $('meta[property="og:title"]').attr('content') || '').trim()
  data.brand = ($('[data-testid="brand"]').text() || '').trim()
  data.price = ($('[data-testid="price"]').first().text() || $('[itemprop="price"]').attr('content') || $('meta[property="product:price:amount"]').attr('content') || '').trim()
  data.description = ($('.product-description').text() || $('#description').text() || $('meta[name="description"]').attr('content') || '').trim()

  // images: gather obvious imgs, og:image
  const imgs = new Set()
  const og = $('meta[property="og:image"]').attr('content')
  if (og) imgs.add(og)
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy')
    if (src && src.includes('http')) imgs.add(src.split('?')[0])
  })
  data.images = Array.from(imgs).slice(0, 12)

  // specs or key/value pairs
  const specs = []
  $('.product-specs li, .characteristics li, [data-testid="specs"] li').each((i, el) => {
    const t = $(el).text().trim()
    if (t) specs.push(t)
  })
  data.specs = specs

  // sizes/colors
  data.sizes = []
  $('[data-testid="size-selector"] option, select.size option, .product-sizes option').each((i, el) => {
    const t = $(el).text().trim()
    if (t) data.sizes.push(t)
  })
  data.colors = []
  $('[data-testid="color-selector"] option, .product-colors img, .color-swatch').each((i, el) => {
    const t = $(el).attr('alt') || $(el).attr('title') || $(el).text()
    if (t) data.colors.push(t.trim())
  })

  return data
}

async function scrapeCategory(keywordOrUrl, limit = 50, downloadImages = false) {
  console.log('Scraping category:', keywordOrUrl)
  let html = null
  let baseUrl = null
  if (/^https?:\/\//i.test(keywordOrUrl)) {
    html = await tryFetch(keywordOrUrl)
    baseUrl = keywordOrUrl
  } else {
    const candidates = candidatesForCategory(keywordOrUrl)
    for (const c of candidates) {
      html = await tryFetch(c)
      if (html) {
        baseUrl = c
        break
      }
    }
    // fallback: try homepage and search for links containing keyword
    if (!html) {
      const homepage = await tryFetch('https://www.24s.com')
      if (homepage) {
        const found = extractProductLinksFromHtml(homepage, 'https://www.24s.com').filter(u => u.toLowerCase().includes(keywordOrUrl))
        if (found.length) {
          html = await tryFetch(found[0])
          baseUrl = found[0]
        }
      }
    }
  }

  if (!html) {
    console.warn('Category page not found for', keywordOrUrl)
    return []
  }

  // extract product links on first page
  let links = extractProductLinksFromHtml(html, baseUrl)
  // try to find pagination links and append (very lightweight)
  const $ = cheerio.load(html)
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href')
    if (!href) return
    if (/page=|\/page\//i.test(href)) {
      try { links.push(new URL(href, baseUrl).toString()) } catch (e) {}
    }
  })

  links = Array.from(new Set(links)).slice(0, Math.max(100, limit * 2))
  console.log(`Found ${links.length} candidate product links (will visit up to ${limit})`)

  const outDir = path.resolve(process.cwd(), 'scripts', 'scrape-output')
  mkdirp.sync(outDir)
  const results = []
  let count = 0
  for (const link of links) {
    if (count >= limit) break
    try {
      const pageHtml = await tryFetch(link)
      if (!pageHtml) continue
      const product = extractProductData(pageHtml, link)
      if (!product.title || !product.images.length) continue
      count++
      product._source_category = keywordOrUrl
      product._index = count
      results.push(product)
      const filePath = path.join(outDir, `${keywordOrUrl.replace(/[^a-z0-9_-]/gi, '_')}-${count}.json`)
      fs.writeFileSync(filePath, JSON.stringify(product, null, 2))
      console.log(`Saved ${filePath}`)

      if (downloadImages && product.images && product.images.length) {
        const imgDir = path.join(process.cwd(), 'public', 'images', '24s', keywordOrUrl.replace(/[^a-z0-9_-]/gi, '_'))
        mkdirp.sync(imgDir)
        for (let i = 0; i < product.images.length; i++) {
          const imgUrl = product.images[i]
          try {
            const res = await axios.get(imgUrl, { responseType: 'arraybuffer', timeout: 20000 })
            const ext = path.extname(new URL(imgUrl).pathname) || '.jpg'
            const name = `img-${count}-${i}${ext}`
            fs.writeFileSync(path.join(imgDir, name), res.data)
            // replace url with local path
            product.images[i] = `/images/24s/${keywordOrUrl.replace(/[^a-z0-9_-]/gi, '_')}/${name}`
          } catch (e) {
            console.warn('Failed to download image', imgUrl)
          }
        }
        // update saved file with image paths
        fs.writeFileSync(filePath, JSON.stringify(product, null, 2))
      }

      // polite delay
      await new Promise(r => setTimeout(r, 800 + Math.random() * 400))
    } catch (e) {
      console.warn('Error scraping product', link, e.message)
    }
  }

  const outAll = path.join(outDir, `${keywordOrUrl.replace(/[^a-z0-9_-]/gi, '_')}-products.json`)
  fs.writeFileSync(outAll, JSON.stringify(results, null, 2))
  console.log(`Category ${keywordOrUrl}: saved ${results.length} products to ${outAll}`)
  return results
}

async function main() {
  const args = parseArgs()
  if (!args.categories.length) {
    console.log('No categories specified. Example: --categories="women-knitwear,women-coats"')
    process.exit(1)
  }
  const combined = []
  for (const c of args.categories) {
    try {
      const res = await scrapeCategory(c, args.limit, args.downloadImages)
      combined.push(...res)
    } catch (e) {
      console.warn('Failed category', c, e.message)
    }
  }
  const allPath = path.resolve(process.cwd(), 'scripts', 'scrape-output', 'all-24s-products.json')
  fs.writeFileSync(allPath, JSON.stringify(combined, null, 2))
  console.log(`Saved combined ${combined.length} products to ${allPath}`)
}

if (require.main === module) main().catch(e => { console.error(e); process.exit(1) })
