const fs = require('fs')
const path = require('path')

const repoRoot = path.join(__dirname, '..')
const mapPath = path.join(repoRoot, 'lib', 'product-images.json')
const prodPath = path.join(repoRoot, 'lib', 'products.ts')

if (!fs.existsSync(mapPath)) {
  console.error('Mapping file not found:', mapPath)
  console.error('Run scripts/download_images.ps1 first to generate images and mapping.')
  process.exit(1)
}
if (!fs.existsSync(prodPath)) {
  console.error('products.ts not found:', prodPath)
  process.exit(1)
}

const mapping = JSON.parse(fs.readFileSync(mapPath, 'utf8'))
let content = fs.readFileSync(prodPath, 'utf8')
let replaced = 0

for (const id of Object.keys(mapping)) {
  // Find the product object by id and replace the image field if present
  const re = new RegExp(`(id:\s*${id}[\s\S]*?image:\s*)'[^']*'`, 'm')
  if (re.test(content)) {
    content = content.replace(re, `$1'${mapping[id]}'`)
    replaced++
  } else {
    // If no image field exists, try to insert one after the id line
    const insertRe = new RegExp(`(id:\s*${id}\s*,)`, 'm')
    if (insertRe.test(content)) {
      content = content.replace(insertRe, `$1\n    image: '${mapping[id]}',`)
      replaced++
    }
  }
}

fs.writeFileSync(prodPath, content, 'utf8')
console.log(`Updated ${replaced} product image paths in lib/products.ts`)
console.log('If you run the dev server now, product cards will use the downloaded local images.')
