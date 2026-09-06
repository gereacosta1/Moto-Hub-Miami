import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Product } from '../../types/product'
import {
  calculateDiscountPercentage,
  formatPrice,
} from '../../utils/currency'

import './ProductCard.css'

interface ProductCardProps {
  product: Product
  priority?: boolean
  className?: string
}

const availabilityLabels: Record<
  Product['availability'],
  string
> = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
  'pre-order': 'Pre-Order',
}

function ProductCard({
  product,
  priority = false,
  className = '',
}: ProductCardProps) {
  const {
    slug,
    name,
    brand,
    category,
    price,
    compareAtPrice,
    images,
    availability,
    newArrival,
    bestSeller,
  } = product

  const primaryImage = images[0]

  const discountPercentage =
    calculateDiscountPercentage(
      price,
      compareAtPrice,
    )

  const hasDiscount =
    discountPercentage !== null

  const productUrl = `/product/${slug}`

  const cardClassName = [
    'product-card',
    availability === 'out-of-stock'
      ? 'product-card--unavailable'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClassName}>
      <Link
        to={productUrl}
        className="product-card__image-link"
        aria-label={`View ${brand} ${name}`}
      >
        <div className="product-card__media">
          {primaryImage ? (
            <img
              src={primaryImage.src}
              alt={primaryImage.alt}
              className="product-card__image"
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              draggable={false}
            />
          ) : (
            <div
              className="product-card__image-placeholder"
              aria-label="Bavarian Euro Performance"
            >
              <span>
                BEP
              </span>

              <strong>
                EURO
              </strong>
            </div>
          )}

          <div className="product-card__badges">
            {hasDiscount && (
              <span className="product-card__badge product-card__badge--sale">
                -{discountPercentage}%
              </span>
            )}

            {!hasDiscount && newArrival && (
              <span className="product-card__badge">
                New
              </span>
            )}

            {!hasDiscount &&
              !newArrival &&
              bestSeller && (
                <span className="product-card__badge">
                  Best Seller
                </span>
              )}
          </div>

          <span
            className={`product-card__availability product-card__availability--${availability}`}
          >
            <span
              className="product-card__availability-dot"
              aria-hidden="true"
            />

            {availabilityLabels[availability]}
          </span>

          <span
            className="product-card__open"
            aria-hidden="true"
          >
            <ArrowUpRight
              size={19}
              strokeWidth={2}
            />
          </span>
        </div>
      </Link>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span className="product-card__brand">
            {brand}
          </span>

          <span
            className="product-card__separator"
            aria-hidden="true"
          />

          <span className="product-card__category">
            {category.replaceAll('-', ' ')}
          </span>
        </div>

        <Link
          to={productUrl}
          className="product-card__title-link"
        >
          <h3 className="product-card__title">
            {name}
          </h3>
        </Link>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">
              {formatPrice(price)}
            </span>

            {hasDiscount &&
              compareAtPrice !== undefined && (
                <span className="product-card__compare-price">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
          </div>

          <Link
            to={productUrl}
            className="product-card__view"
            aria-label={`View details for ${brand} ${name}`}
          >
            View

            <ArrowUpRight
              size={15}
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard