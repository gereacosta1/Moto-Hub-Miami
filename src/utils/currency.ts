const DEFAULT_LOCALE = 'en-US'
const DEFAULT_CURRENCY = 'USD'

const currencyFormatters = new Map<string, Intl.NumberFormat>()

function getCurrencyFormatter(
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
): Intl.NumberFormat {
  const key = `${locale}-${currency}`

  const cachedFormatter = currencyFormatters.get(key)

  if (cachedFormatter) {
    return cachedFormatter
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  currencyFormatters.set(key, formatter)

  return formatter
}

export function formatCurrency(
  amount: number,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
): string {
  if (!Number.isFinite(amount)) {
    return getCurrencyFormatter(currency, locale).format(0)
  }

  return getCurrencyFormatter(currency, locale).format(amount)
}

export function formatPrice(amount: number): string {
  return formatCurrency(amount)
}

export function calculateDiscountPercentage(
  price: number,
  compareAtPrice?: number,
): number | null {
  if (
    compareAtPrice === undefined ||
    compareAtPrice <= 0 ||
    price < 0 ||
    price >= compareAtPrice
  ) {
    return null
  }

  return Math.round(
    ((compareAtPrice - price) / compareAtPrice) * 100,
  )
}

export function formatDiscountPercentage(
  price: number,
  compareAtPrice?: number,
): string | null {
  const discount = calculateDiscountPercentage(
    price,
    compareAtPrice,
  )

  return discount === null ? null : `${discount}% OFF`
}