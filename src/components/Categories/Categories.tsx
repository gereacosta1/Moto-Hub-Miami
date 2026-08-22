import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { featuredCategories } from '../../data/categories'

import './Categories.css'

function Categories() {
  return (
    <section
      className="categories section"
      aria-labelledby="categories-title"
    >
      <div className="container">
        <div className="categories__header">
          <div className="categories__heading">
            <span className="section__eyebrow">
              Shop by category
            </span>

            <h2
              id="categories-title"
              className="section__title categories__title"
            >
              EVERYTHING FOR
              <br />
              <span>YOUR NEXT RIDE.</span>
            </h2>
          </div>

          <div className="categories__intro">
            <p>
              Explore premium motorcycle gear, performance
              parts and accessories selected for riders who
              expect more from every mile.
            </p>

            <Link
              to="/shop"
              className="categories__all"
            >
              Explore all products

              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="categories__grid">
          {featuredCategories.map(
            (category, index) => {
              const categoryUrl =
                `/shop?category=${category.slug}`

              const number = String(
                index + 1,
              ).padStart(2, '0')

              return (
                <article
                  className={`categories__card categories__card--${index + 1}`}
                  key={category.id}
                >
                  <Link
                    to={categoryUrl}
                    className="categories__card-link"
                    aria-label={`Shop ${category.name}`}
                  >
                    <div
                      className="categories__card-background"
                      aria-hidden="true"
                    >
                      <span className="categories__card-word">
                        {category.shortName ??
                          category.name}
                      </span>

                      <span className="categories__card-line" />
                    </div>

                    <div className="categories__card-top">
                      <span className="categories__number">
                        {number}
                      </span>

                      <span className="categories__arrow">
                        <ArrowUpRight
                          size={21}
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <div className="categories__card-content">
                      <span className="categories__label">
                        Category
                      </span>

                      <h3 className="categories__name">
                        {category.name}
                      </h3>

                      <p className="categories__description">
                        {category.description}
                      </p>

                      <span className="categories__shop">
                        Shop collection

                        <ArrowRight
                          size={15}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              )
            },
          )}
        </div>

        <div className="categories__mobile-all">
          <Link
            to="/shop"
            className="button button--dark"
          >
            Explore all products

            <ArrowRight
              size={17}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories