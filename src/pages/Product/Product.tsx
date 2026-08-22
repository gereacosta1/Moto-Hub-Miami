import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CircleAlert,
  PackageCheck,
} from 'lucide-react'
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Link,
  useParams,
} from 'react-router'

import type { Product as ProductType } from '../../types/product'
import {
  calculateDiscountPercentage,
  formatPrice,
} from '../../utils/currency'

import './Product.css'

interface ProductProps {
  products?: readonly ProductType[]
}

const availabilityLabels: Record<
  ProductType['availability'],
  string
> = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
  'pre-order': 'Pre-Order',
}

function formatCategoryName(value: string) {
  return value
    .split('-')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(' ')
}

function Product({
  products = [],
}: ProductProps) {
  const { slug } = useParams<{
    slug: string
  }>()

  const product = useMemo(
    () =>
      products.find(
        (item) => item.slug === slug,
      ),
    [products, slug],
  )

  const [selectedImage, setSelectedImage] =
    useState(0)

  useEffect(() => {
    setSelectedImage(0)
  }, [product?.id])

  if (!product) {
    return (
      <main className="product-page">
        <section className="product-page__not-found">
          <div className="container">
            <div className="product-page__not-found-inner">
              <div
                className="product-page__not-found-icon"
                aria-hidden="true"
              >
                <CircleAlert
                  size={30}
                  strokeWidth={1.6}
                />
              </div>

              <span>
                Product unavailable
              </span>

              <h1>
                PRODUCT NOT FOUND.
              </h1>

              <p>
                This product may not be part of
                the current inventory yet, or
                the link may no longer be
                available.
              </p>

              <Link
                to="/shop"
                className="button button--dark"
              >
                <ArrowLeft
                  size={17}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                Back to shop
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const {
    name,
    brand,
    category,
    subcategory,
    shortDescription,
    description,
    price,
    compareAtPrice,
    sku,
    images,
    availability,
    stock,
    newArrival,
    bestSeller,
    specifications,
    compatibility,
  } = product

  const currentImage =
    images[selectedImage] ?? images[0]

  const discount =
    calculateDiscountPercentage(
      price,
      compareAtPrice,
    )

  const hasDiscount =
    discount !== null &&
    compareAtPrice !== undefined

  const isUnavailable =
    availability === 'out-of-stock'

  const contactUrl =
    `/contact?product=${encodeURIComponent(
      product.slug,
    )}`

  return (
    <main className="product-page">
      <section className="product-page__main">
        <div className="container">
          <nav
            className="product-page__breadcrumbs"
            aria-label="Breadcrumb"
          >
            <Link to="/">
              Home
            </Link>

            <ChevronRight
              size={13}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <Link to="/shop">
              Shop
            </Link>

            <ChevronRight
              size={13}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <Link
              to={`/shop?category=${category}`}
            >
              {formatCategoryName(
                category,
              )}
            </Link>

            <ChevronRight
              size={13}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span aria-current="page">
              {name}
            </span>
          </nav>

          <div className="product-page__layout">
            <div className="product-page__gallery">
              <div className="product-page__media">
                <div className="product-page__badges">
                  {hasDiscount && (
                    <span className="product-page__badge product-page__badge--sale">
                      {discount}% OFF
                    </span>
                  )}

                  {!hasDiscount &&
                    newArrival && (
                      <span className="product-page__badge">
                        New
                      </span>
                    )}

                  {!hasDiscount &&
                    !newArrival &&
                    bestSeller && (
                      <span className="product-page__badge">
                        Best Seller
                      </span>
                    )}
                </div>

                {currentImage ? (
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="product-page__image"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="product-page__placeholder"
                    aria-label={`${brand} ${name}`}
                  >
                    <span>
                      MOTO
                    </span>

                    <strong>
                      HUB
                    </strong>

                    <small>
                      MIAMI
                    </small>
                  </div>
                )}

                <span
                  className="product-page__media-number"
                  aria-hidden="true"
                >
                  {String(
                    selectedImage + 1,
                  ).padStart(2, '0')}
                </span>
              </div>

              {images.length > 1 && (
                <div
                  className="product-page__thumbnails"
                  aria-label="Product images"
                >
                  {images.map(
                    (image, index) => (
                      <button
                        key={`${image.src}-${index}`}
                        type="button"
                        className={`product-page__thumbnail ${
                          selectedImage ===
                          index
                            ? 'product-page__thumbnail--active'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedImage(
                            index,
                          )
                        }
                        aria-label={`View image ${index + 1} of ${images.length}`}
                        aria-pressed={
                          selectedImage ===
                          index
                        }
                      >
                        <img
                          src={image.src}
                          alt=""
                          draggable={false}
                        />
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            <div className="product-page__info">
              <div className="product-page__meta">
                <span>
                  {brand}
                </span>

                <i aria-hidden="true" />

                <Link
                  to={`/shop?category=${category}`}
                >
                  {formatCategoryName(
                    category,
                  )}
                </Link>

                {subcategory && (
                  <>
                    <i aria-hidden="true" />

                    <span>
                      {formatCategoryName(
                        subcategory,
                      )}
                    </span>
                  </>
                )}
              </div>

              <h1>
                {name}
              </h1>

              <p className="product-page__short-description">
                {shortDescription}
              </p>

              <div className="product-page__pricing">
                <span className="product-page__price">
                  {formatPrice(price)}
                </span>

                {hasDiscount && (
                  <span className="product-page__compare-price">
                    {formatPrice(
                      compareAtPrice,
                    )}
                  </span>
                )}

                {discount !== null && (
                  <span className="product-page__discount">
                    Save {discount}%
                  </span>
                )}
              </div>

              <div className="product-page__availability">
                <div>
                  <span
                    className={`product-page__availability-dot product-page__availability-dot--${availability}`}
                    aria-hidden="true"
                  />

                  <strong>
                    {
                      availabilityLabels[
                        availability
                      ]
                    }
                  </strong>
                </div>

                {typeof stock ===
                  'number' &&
                  stock > 0 && (
                    <span>
                      {stock}{' '}
                      {stock === 1
                        ? 'unit'
                        : 'units'}{' '}
                      available
                    </span>
                  )}
              </div>

              <div className="product-page__actions">
                <Link
                  to={contactUrl}
                  className={`product-page__primary-action ${
                    isUnavailable
                      ? 'product-page__primary-action--unavailable'
                      : ''
                  }`}
                >
                  {isUnavailable
                    ? 'Ask about availability'
                    : 'Contact about this product'}

                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/shop"
                  className="product-page__secondary-action"
                >
                  Continue shopping
                </Link>
              </div>

              <div className="product-page__quick-info">
                <div>
                  <PackageCheck
                    size={19}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Availability shown
                    </strong>

                    Check current product
                    status before ordering.
                  </span>
                </div>

                <div>
                  <Check
                    size={19}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span>
                    <strong>
                      Fitment details
                    </strong>

                    Review compatibility
                    before choosing your
                    part.
                  </span>
                </div>
              </div>

              {sku && (
                <div className="product-page__sku">
                  <span>
                    SKU
                  </span>

                  <strong>
                    {sku}
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="product-page__details section">
        <div className="container">
          <div className="product-page__details-grid">
            <div className="product-page__description">
              <span className="section__eyebrow">
                Product details
              </span>

              <h2>
                BUILT FOR
                <br />
                <span>
                  THE RIDE.
                </span>
              </h2>

              <p>
                {description}
              </p>
            </div>

            <div className="product-page__detail-panels">
              {specifications &&
                specifications.length >
                  0 && (
                  <div className="product-page__panel">
                    <div className="product-page__panel-heading">
                      <span>
                        01
                      </span>

                      <h3>
                        Specifications
                      </h3>
                    </div>

                    <dl className="product-page__specifications">
                      {specifications.map(
                        (specification) => (
                          <div
                            key={`${specification.label}-${specification.value}`}
                          >
                            <dt>
                              {
                                specification.label
                              }
                            </dt>

                            <dd>
                              {
                                specification.value
                              }
                            </dd>
                          </div>
                        ),
                      )}
                    </dl>
                  </div>
                )}

              {compatibility &&
                compatibility.length >
                  0 && (
                  <div className="product-page__panel">
                    <div className="product-page__panel-heading">
                      <span>
                        02
                      </span>

                      <h3>
                        Compatibility
                      </h3>
                    </div>

                    <div className="product-page__compatibility">
                      {compatibility.map(
                        (
                          vehicle,
                          index,
                        ) => {
                          let years =
                            'Check fitment'

                          if (
                            vehicle.years &&
                            vehicle.years
                              .length > 0
                          ) {
                            years =
                              vehicle.years.join(
                                ', ',
                              )
                          } else if (
                            vehicle.yearFrom &&
                            vehicle.yearTo
                          ) {
                            years =
                              `${vehicle.yearFrom}–${vehicle.yearTo}`
                          } else if (
                            vehicle.yearFrom
                          ) {
                            years =
                              `${vehicle.yearFrom}+`
                          } else if (
                            vehicle.yearTo
                          ) {
                            years =
                              `Up to ${vehicle.yearTo}`
                          }

                          return (
                            <div
                              className="product-page__vehicle"
                              key={`${vehicle.make}-${vehicle.model}-${index}`}
                            >
                              <div>
                                <strong>
                                  {
                                    vehicle.make
                                  }
                                </strong>

                                <span>
                                  {
                                    vehicle.model
                                  }
                                </span>
                              </div>

                              <small>
                                {years}
                              </small>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>
                )}

              {(!specifications ||
                specifications.length ===
                  0) &&
                (!compatibility ||
                  compatibility.length ===
                    0) && (
                  <div className="product-page__panel product-page__panel--simple">
                    <div className="product-page__panel-heading">
                      <span>
                        01
                      </span>

                      <h3>
                        Need more information?
                      </h3>
                    </div>

                    <p>
                      Contact Moto Hub Miami
                      for additional product
                      details, specifications
                      or fitment information.
                    </p>

                    <Link
                      to={contactUrl}
                    >
                      Contact us

                      <ArrowRight
                        size={15}
                        strokeWidth={2}
                      />
                    </Link>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Product