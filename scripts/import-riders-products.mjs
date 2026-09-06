import fs from 'node:fs/promises'

const STORE = 'https://riderspartsmiami.com'
const OUTPUT = './src/data/products.ts'
const TARGET_PRODUCTS = 300

const importantBrands = [
  'akrapovic',
  'alpinestars',
  'arai',
  'bell',
  'brembo',
  'cardo',
  'dynojet',
  'givi',
  'hjc',
  'k&n',
  'leovince',
  'michelin',
  'ohlins',
  'öhlins',
  'pirelli',
  'puig',
  'sena',
  'shoei',
  'vance',
  'yoshimura',
]

function normalize(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
}

function cleanText(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeString(value = '') {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\n', ' ')
    .replaceAll('\r', ' ')
}

function slugify(value = '') {
  return normalize(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getSearchText(product) {
  return normalize(
    [
      product.title,
      product.vendor,
      product.product_type,
      ...(product.tags ?? []),
    ].join(' '),
  )
}

function getCategory(product) {
  const text = getSearchText(product)

  if (
    text.includes('exhaust') ||
    text.includes('muffler') ||
    text.includes('slip-on') ||
    text.includes('slip on') ||
    text.includes('header pipe')
  ) {
    return 'exhaust'
  }

  if (
    text.includes('brake') ||
    text.includes('rotor') ||
    text.includes('caliper')
  ) {
    return 'brakes'
  }

  if (
    text.includes('suspension') ||
    text.includes('shock') ||
    text.includes('fork')
  ) {
    return 'suspension'
  }

  if (
    text.includes('tire') ||
    text.includes('tyre') ||
    text.includes('wheel') ||
    text.includes('rim')
  ) {
    return 'wheels-tires'
  }

  if (
    text.includes('intake') ||
    text.includes('air filter') ||
    text.includes('velocity stack')
  ) {
    return 'intake'
  }

  if (
    text.includes('engine') ||
    text.includes('piston') ||
    text.includes('camshaft') ||
    text.includes('fuel') ||
    text.includes('ecu')
  ) {
    return 'engine'
  }

  if (
    text.includes('battery') ||
    text.includes('electrical') ||
    text.includes('electronic') ||
    text.includes('light') ||
    text.includes('led') ||
    text.includes('charger') ||
    text.includes('intercom')
  ) {
    return 'electronics'
  }

  if (
    text.includes('oil') ||
    text.includes('cleaner') ||
    text.includes('maintenance') ||
    text.includes('spark plug') ||
    text.includes('lubricant')
  ) {
    return 'maintenance'
  }

  if (
    text.includes('seat') ||
    text.includes('grip') ||
    text.includes('handlebar')
  ) {
    return 'interior'
  }

  if (
    text.includes('fairing') ||
    text.includes('windshield') ||
    text.includes('windscreen') ||
    text.includes('fender') ||
    text.includes('mirror')
  ) {
    return 'exterior'
  }

  return 'accessories'
}

function getScore(product) {
  const text = getSearchText(product)

  let score = 0

  if (product.images?.length) {
    score += 25
  }

  const available = product.variants?.some(
    (variant) => variant.available,
  )

  if (available) {
    score += 30
  }

  if (
    importantBrands.some((brand) =>
      text.includes(brand),
    )
  ) {
    score += 25
  }

  const usefulKeywords = [
    'helmet',
    'glove',
    'jacket',
    'boot',
    'exhaust',
    'muffler',
    'tire',
    'brake',
    'suspension',
    'shock',
    'filter',
    'engine',
    'chain',
    'sprocket',
    'battery',
    'light',
    'mirror',
    'windshield',
    'windscreen',
    'intercom',
  ]

  for (const keyword of usefulKeywords) {
    if (text.includes(keyword)) {
      score += 5
    }
  }

  const price = Number(
    product.variants?.[0]?.price ?? 0,
  )

  if (price >= 20 && price <= 2500) {
    score += 10
  }

  return score
}

async function fetchPage(page) {
  const url =
    `${STORE}/products.json?limit=250&page=${page}`

  console.log(`Fetching page ${page}...`)

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    )
  }

  const data = await response.json()

  return data.products ?? []
}

function createProduct(product, index) {
  const firstVariant =
    product.variants?.[0] ?? {}

  const price =
    Number(firstVariant.price) || 0

  const compareAt =
    Number(firstVariant.compare_at_price) || 0

  const available =
    product.variants?.some(
      (variant) => variant.available,
    ) ?? false

  const category =
    getCategory(product)

  const vendor =
    product.vendor?.trim() ||
    'Motorcycle Parts'

  const productType =
    product.product_type?.trim() ||
    'Motorcycle Product'

  const images = (product.images ?? [])
    .slice(0, 3)
    .map((image) => ({
      src: image.src,
      alt: `${vendor} ${product.title}`,
    }))

  const shortDescription =
    `${vendor} ${productType.toLowerCase()} selected for performance, fitment and everyday riding applications.`

  const description =
    `${product.title} by ${vendor}. Review fitment and specifications before ordering to make sure this product is compatible with your motorcycle.`

  const sku =
    firstVariant.sku?.trim() || undefined

  return {
    id: String(product.id),
    slug:
      product.handle ||
      slugify(product.title),
    name: product.title.trim(),
    brand: vendor,
    category,
    shortDescription,
    description,
    price,
    compareAtPrice:
      compareAt > price
        ? compareAt
        : undefined,
    sku,
    images,
    availability:
      available
        ? 'in-stock'
        : 'out-of-stock',
    featured: index < 12,
    newArrival: false,
    bestSeller: index < 24,
    tags: (product.tags ?? [])
      .map(String)
      .slice(0, 12),
  }
}

function renderProduct(product) {
  const lines = []

  lines.push('  {')
  lines.push(
    `    id: '${escapeString(product.id)}',`,
  )
  lines.push(
    `    slug: '${escapeString(product.slug)}',`,
  )
  lines.push(
    `    name: '${escapeString(product.name)}',`,
  )
  lines.push(
    `    brand: '${escapeString(product.brand)}',`,
  )
  lines.push(
    `    category: '${product.category}',`,
  )
  lines.push(
    `    shortDescription: '${escapeString(product.shortDescription)}',`,
  )
  lines.push(
    `    description: '${escapeString(product.description)}',`,
  )
  lines.push(
    `    price: ${product.price},`,
  )

  if (product.compareAtPrice) {
    lines.push(
      `    compareAtPrice: ${product.compareAtPrice},`,
    )
  }

  if (product.sku) {
    lines.push(
      `    sku: '${escapeString(product.sku)}',`,
    )
  }

  lines.push('    images: [')

  for (const image of product.images) {
    lines.push('      {')
    lines.push(
      `        src: '${escapeString(image.src)}',`,
    )
    lines.push(
      `        alt: '${escapeString(image.alt)}',`,
    )
    lines.push('      },')
  }

  lines.push('    ],')

  lines.push(
    `    availability: '${product.availability}',`,
  )

  lines.push(
    `    featured: ${product.featured},`,
  )

  lines.push(
    `    newArrival: ${product.newArrival},`,
  )

  lines.push(
    `    bestSeller: ${product.bestSeller},`,
  )

  lines.push(
    `    tags: ${JSON.stringify(product.tags)},`,
  )

  lines.push('  },')

  return lines.join('\n')
}

async function main() {
  const pages = await Promise.all([
    fetchPage(1),
    fetchPage(2),
    fetchPage(3),
  ])

  const allProducts =
    pages.flat()

  console.log(
    `Found ${allProducts.length} products`,
  )

  const uniqueProducts =
    Array.from(
      new Map(
        allProducts.map((product) => [
          product.id,
          product,
        ]),
      ).values(),
    )

  const selected =
    uniqueProducts
      .filter((product) => {
        const price =
          Number(
            product.variants?.[0]?.price ??
              0,
          )

        return (
          product.title &&
          price > 0 &&
          product.images?.length > 0
        )
      })
      .sort(
        (a, b) =>
          getScore(b) - getScore(a),
      )
      .slice(0, TARGET_PRODUCTS)

  console.log(
    `Selected ${selected.length} products`,
  )

  const products =
    selected.map(createProduct)

  const file = `import type { Product } from '../types/product'

export const products: readonly Product[] = [
${products.map(renderProduct).join('\n')}
]
`

  await fs.writeFile(
    OUTPUT,
    file,
    'utf8',
  )

  console.log('')
  console.log('DONE')
  console.log(
    `Generated ${OUTPUT}`,
  )
  console.log(
    `${products.length} products imported`,
  )
}

main().catch((error) => {
  console.error('')
  console.error('IMPORT FAILED')
  console.error(error)
  process.exit(1)
})