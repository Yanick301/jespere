// scripts/scrape_24s.js
// Usage: node scrape_24s.js [categoryUrl]
// Requires: npm i playwright fs-extra

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

async function scrapeCategory(categoryUrl, maxProducts = 200) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(categoryUrl, { waitUntil: 'domcontentloaded' })

  // Accept cookies if any
  try {
    await page.locator('button:has-text("Accept")').first().click({ timeout: 2000 })
  } catch (e) {}

  const products = new Map()

  // Helper to load more by scrolling
  let previousHeight = 0
  while (products.size < maxProducts) {
    const cards = await page.$$('[data-testid="product-card"], a.product-card, div[data-product-id]')
    for (const card of cards) {
      try {
        const href = await card.getAttribute('href') || await card.getAttribute('data-href') || await card.getAttribute('data-product-url')
        const id = await card.getAttribute('data-product-id') || href
        const title = await card.innerText().catch(() => '')
        if (!href) continue
        const url = href.startsWith('http') ? href : new URL(href, categoryUrl).toString()
        if (!products.has(url)) products.set(url, { url, title: title.trim() })
      } catch (e) {
        // ignore
      }
    }

    // scroll to bottom to load more
    const height = await page.evaluate(() => document.body.scrollHeight)
    if (height === previousHeight) break
    previousHeight = height
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))
    await page.waitForTimeout(1200)
  }

  const results = []
  const outDir = path.resolve(process.cwd(), 'scripts', 'scrape-output')
  fs.mkdirSync(outDir, { recursive: true })

  let i = 0
  for (const [url, meta] of products) {
    if (i >= maxProducts) break
    i++
    console.log(`Scraping [${i}] ${url}`)
    try {
      const p = await browser.newPage()
      await p.goto(url, { waitUntil: 'domcontentloaded' })

      // Title
      const title = (await p.title()) || meta.title || ''

      // Price selectors
      const price = await p.locator('[data-testid="price"], .price, [itemprop="price"]').first().innerText().catch(() => '')

      // Description
      const description = await p.locator('[data-testid="description"], .product-description, #description').first().innerText().catch(() => '')

      // Images
      const imageEls = await p.$$('[data-testid="product-image"], img[src*="cdn"], .slick-slide img')
      const images = []
      for (const img of imageEls) {
        const src = await img.getAttribute('src') || await img.getAttribute('data-src')
        if (src) images.push(src.startsWith('http') ? src : new URL(src, url).toString())
      }

      // Characteristics - try to find key/value lists
      const specs = []
      try {
        const rows = await p.$$('[data-testid="specs"] li, .product-specs li, .characteristics li')
        for (const r of rows) {
          const text = (await r.innerText()).trim()
          if (text) specs.push(text)
        }
      } catch (e) {}

      const result = {
        url,
        title: title.trim(),
        price: price.trim(),
        description: description.trim(),
        images: Array.from(new Set(images)).slice(0, 12),
        specs,
      }

      results.push(result)
      const outFile = path.join(outDir, `product-${i}.json`)
      fs.writeFileSync(outFile, JSON.stringify(result, null, 2))
      await p.close()

      // polite delay
      await page.waitForTimeout(500)
    } catch (err) {
      console.error('Product scrape error', err.message)
    }
  }

  await browser.close()
  const fullOut = path.join(outDir, 'products.json')
  fs.writeFileSync(fullOut, JSON.stringify(results, null, 2))
  console.log(`Saved ${results.length} products to ${fullOut}`)
  return results
}

if (require.main === module) {
  const url = process.argv[2] || 'https://www.24s.com/en-us/women'
  const max = parseInt(process.argv[3] || '50', 10)
  scrapeCategory(url, max).catch(e => {
    console.error(e)
    process.exit(1)
  })
}
