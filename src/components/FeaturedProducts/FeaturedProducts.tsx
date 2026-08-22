import {
  ArrowRight,
  PackageSearch,
} from 'lucide-react'
import { Link } from 'react-router'

import ProductCard from '../ProductCard/ProductCard'
import type { Product } from '../../types/product'

import './FeaturedProducts.css'

interface FeaturedProductsProps {
  products?: readonly Product[]
}

function FeaturedProducts({
  products = [],
}: FeaturedProductsProps) {
  const hasProducts = products.length > 0

  return (
    <section
      id="featured-products"
      className="featured-products section"
      aria-labelledby="featured-products-title"
    >
      <div
        className="featured-products__background"
        aria-hidden="true"
      >
        <span className="featured-products__background-text">
          PERFORMANCE
        </span>

        <span className="featured-products__accent-line" />
      </div>

      <div className="container">
        <div className="featured-products__header">
          <div className="featured-products__heading">
            <span className="section__eyebrow">
              Featured inventory
            </span>

            <h2
              id="featured-products-title"
              className="section__title featured-products__title"
            >
              PARTS WORTH
              <br />
              <span>THE UPGRADE.</span>
            </h2>
          </div>

          <div className="featured-products__intro">
            <p>
              Discover selected motorcycle parts, riding gear
              and performance upgrades from our current
              inventory.
            </p>

            <Link
              to="/shop"
              className="featured-products__view-all"
            >
              View all products

              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {hasProducts ? (
          <>
            <div className="featured-products__grid">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 2}
                  className="featured-products__card"
                />
              ))}
            </div>

            <div className="featured-products__mobile-action">
              <Link
                to="/shop"
                className="button button--dark"
              >
                View all products

                <ArrowRight
                  size={17}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="featured-products__empty">
            <div
              className="featured-products__empty-icon"
              aria-hidden="true"
            >
              <PackageSearch
                size={30}
                strokeWidth={1.6}
              />
            </div>

            <div className="featured-products__empty-content">
              <span>
                Inventory update
              </span>

              <h3>
                Featured products coming soon.
              </h3>

              <p>
                Our featured selection is being prepared.
                Explore the shop or check back soon for the
                latest parts and gear.
              </p>
            </div>

            <Link
              to="/shop"
              className="featured-products__empty-link"
            >
              Browse shop

              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts