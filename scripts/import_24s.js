#!/usr/bin/env node
// scripts/import_24s.js
// Reads scripts/scrape-output/all-24s-products.json and generates `lib/imported_products.ts`

const fs = require('fs')
const path = require('path')

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normalizeProduct(p, idx) {
  const id = 10000 + idx
  const name = p.title || `Product ${id}`
  const priceMatch = (p.price || '').replace(/[€,$\s]/g, '').match(/\d+[\.,]?\d*/)
  const price = priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : (Math.random() * 500 + 50)
  const images = (p.images || []).slice(0, 6)
  return {
    id,
    slug: slugify(name) + '-' + id,
    name,
    description: p.description || '',
    longDescription: p.description || '',
    price: Number(price.toFixed(2)),
    originalPrice: null,
    currency: 'EUR',
    category: p._source_category || '24s',
    images,
    colors: p.colors || [],
    sizes: p.sizes || [],
    rating: 4.2,
    reviews: Math.floor(Math.random() * 120) + 1,
    material: (p.specs || []).join('; '),
  }
}

const inPath = path.resolve(process.cwd(), 'scripts', 'scrape-output', 'all-24s-products.json')
if (!fs.existsSync(inPath)) {
  console.error('Input file not found:', inPath)
  process.exit(1)
}

const raw = JSON.parse(fs.readFileSync(inPath, 'utf8'))
const normalized = raw.map((p, i) => normalizeProduct(p, i + 1))

const outPath = path.resolve(process.cwd(), 'lib', 'imported_products.ts')
const fileContent = `// Auto-generated from scripts/scrape-output/all-24s-products.json
export const IMPORTED_PRODUCTS = ${JSON.stringify(normalized, null, 2)} as const

export function getImportedProductById(id) {
  return IMPORTED_PRODUCTS.find(p => p.id === id)
}

export function getImportedProducts() {
  return IMPORTED_PRODUCTS.slice()
}
`

fs.writeFileSync(outPath, fileContent, 'utf8')
console.log('Wrote', outPath, 'with', normalized.length, 'products')
