import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Link,
  useSearchParams,
} from 'react-router'

import ProductCard from '../../components/ProductCard/ProductCard'
import type { Product } from '../../types/product'

import './Shop.css'

interface ShopProps {
  products?: readonly Product[]
}

type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'name'

function normalizeValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function formatCategoryName(category: string) {
  return category
    .split('-')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(' ')
}

function matchesVehicle(
  product: Product,
  year: string,
  make: string,
  model: string,
) {
  if (!year && !make && !model) {
    return true
  }

  if (
    !product.compatibility ||
    product.compatibility.length === 0
  ) {
    return false
  }

  const requestedYear = year
    ? Number(year)
    : null

  const requestedMake =
    normalizeValue(make)

  const requestedModel =
    normalizeValue(model)

  return product.compatibility.some(
    (vehicle) => {
      const makeMatches =
        !requestedMake ||
        normalizeValue(vehicle.make) ===
          requestedMake

      const modelMatches =
        !requestedModel ||
        normalizeValue(vehicle.model) ===
          requestedModel

      let yearMatches = true

      if (
        requestedYear !== null &&
        Number.isFinite(requestedYear)
      ) {
        if (
          vehicle.years &&
          vehicle.years.length > 0
        ) {
          yearMatches =
            vehicle.years.includes(
              requestedYear,
            )
        } else {
          const afterStart =
            vehicle.yearFrom === undefined ||
            requestedYear >=
              vehicle.yearFrom

          const beforeEnd =
            vehicle.yearTo === undefined ||
            requestedYear <= vehicle.yearTo

          yearMatches =
            afterStart && beforeEnd
        }
      }

      return (
        makeMatches &&
        modelMatches &&
        yearMatches
      )
    },
  )
}

function Shop({
  products = [],
}: ShopProps) {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams()

  const query =
    searchParams.get('q') ?? ''

  const selectedCategory =
    searchParams.get('category') ?? ''

  const year =
    searchParams.get('year') ?? ''

  const make =
    searchParams.get('make') ?? ''

  const model =
    searchParams.get('model') ?? ''

  const selectedSort =
    (searchParams.get('sort') ??
      'featured') as SortOption

  const [searchDraft, setSearchDraft] =
    useState(query)

  useEffect(() => {
    setSearchDraft(query)
  }, [query])

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(Boolean),
      ),
    ).sort((a, b) =>
      a.localeCompare(b),
    )
  }, [products])

  const filteredProducts =
    useMemo(() => {
      const normalizedQuery =
        normalizeValue(query)

      const result = products.filter(
        (product) => {
          const searchableText =
            normalizeValue(
              [
                product.name,
                product.brand,
                product.category,
                product.subcategory ?? '',
                product.shortDescription,
                ...(product.tags ?? []),
              ].join(' '),
            )

          const matchesSearch =
            !normalizedQuery ||
            searchableText.includes(
              normalizedQuery,
            )

          const matchesCategory =
            !selectedCategory ||
            product.category ===
              selectedCategory ||
            product.subcategory ===
              selectedCategory

          const vehicleMatches =
            matchesVehicle(
              product,
              year,
              make,
              model,
            )

          return (
            matchesSearch &&
            matchesCategory &&
            vehicleMatches
          )
        },
      )

      return [...result].sort(
        (a, b) => {
          switch (selectedSort) {
            case 'price-asc':
              return a.price - b.price

            case 'price-desc':
              return b.price - a.price

            case 'name':
              return a.name.localeCompare(
                b.name,
              )

            case 'featured':
            default: {
              const featuredDifference =
                Number(Boolean(b.featured)) -
                Number(Boolean(a.featured))

              if (featuredDifference !== 0) {
                return featuredDifference
              }

              const newDifference =
                Number(
                  Boolean(b.newArrival),
                ) -
                Number(
                  Boolean(a.newArrival),
                )

              if (newDifference !== 0) {
                return newDifference
              }

              const sellerDifference =
                Number(
                  Boolean(b.bestSeller),
                ) -
                Number(
                  Boolean(a.bestSeller),
                )

              if (sellerDifference !== 0) {
                return sellerDifference
              }

              return a.name.localeCompare(
                b.name,
              )
            }
          }
        },
      )
    }, [
      products,
      query,
      selectedCategory,
      selectedSort,
      year,
      make,
      model,
    ])

  const vehicleFilterActive =
    Boolean(year || make || model)

  const filtersActive =
    Boolean(
      query ||
        selectedCategory ||
        vehicleFilterActive,
    )

  function updateParameter(
    name: string,
    value: string,
  ) {
    const next =
      new URLSearchParams(searchParams)

    if (value) {
      next.set(name, value)
    } else {
      next.delete(name)
    }

    setSearchParams(next)
  }

  function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    updateParameter(
      'q',
      searchDraft.trim(),
    )
  }

  function clearFilters() {
    const next =
      new URLSearchParams(searchParams)

    next.delete('q')
    next.delete('category')
    next.delete('year')
    next.delete('make')
    next.delete('model')

    setSearchParams(next)
    setSearchDraft('')
  }

  function clearVehicle() {
    const next =
      new URLSearchParams(searchParams)

    next.delete('year')
    next.delete('make')
    next.delete('model')

    setSearchParams(next)
  }

  return (
    <main className="shop">
      <section className="shop__hero">
        <div
          className="shop__hero-background"
          aria-hidden="true"
        >
          <span>
            SHOP
          </span>
        </div>

        <div className="container shop__hero-container">
          <span className="shop__eyebrow">
            Moto Hub Miami
          </span>

          <h1>
            FIND YOUR
            <br />
            <span>
              NEXT UPGRADE.
            </span>
          </h1>

          <p>
            Explore motorcycle parts, riding
            gear, accessories and performance
            upgrades built around your ride.
          </p>
        </div>
      </section>

      <section
        className="shop__catalog"
        aria-labelledby="shop-catalog-title"
      >
        <div className="container">
          <div className="shop__toolbar">
            <div className="shop__toolbar-top">
              <div>
                <span className="shop__toolbar-label">
                  Catalog
                </span>

                <h2 id="shop-catalog-title">
                  All products
                </h2>
              </div>

              <div className="shop__count">
                <strong>
                  {filteredProducts.length}
                </strong>

                <span>
                  {filteredProducts.length ===
                  1
                    ? 'product'
                    : 'products'}
                </span>
              </div>
            </div>

            <div className="shop__controls">
              <form
                className="shop__search"
                onSubmit={handleSearch}
              >
                <Search
                  size={18}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />

                <input
                  type="search"
                  value={searchDraft}
                  onChange={(event) =>
                    setSearchDraft(
                      event.target.value,
                    )
                  }
                  placeholder="Search products, brands..."
                  aria-label="Search products"
                />

                {searchDraft && (
                  <button
                    type="button"
                    className="shop__search-clear"
                    aria-label="Clear search"
                    onClick={() => {
                      setSearchDraft('')
                      updateParameter(
                        'q',
                        '',
                      )
                    }}
                  >
                    <X
                      size={16}
                      strokeWidth={2}
                    />
                  </button>
                )}
              </form>

              <div className="shop__sort">
                <SlidersHorizontal
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <label
                  htmlFor="shop-sort"
                  className="sr-only"
                >
                  Sort products
                </label>

                <select
                  id="shop-sort"
                  value={selectedSort}
                  onChange={(event) =>
                    updateParameter(
                      'sort',
                      event.target.value,
                    )
                  }
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="price-asc">
                    Price: Low to High
                  </option>

                  <option value="price-desc">
                    Price: High to Low
                  </option>

                  <option value="name">
                    Name: A–Z
                  </option>
                </select>
              </div>
            </div>

            {categories.length > 0 && (
              <div
                className="shop__categories"
                aria-label="Product categories"
              >
                <button
                  type="button"
                  className={`shop__category ${
                    !selectedCategory
                      ? 'shop__category--active'
                      : ''
                  }`}
                  aria-pressed={
                    !selectedCategory
                  }
                  onClick={() =>
                    updateParameter(
                      'category',
                      '',
                    )
                  }
                >
                  All
                </button>

                {categories.map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      className={`shop__category ${
                        selectedCategory ===
                        category
                          ? 'shop__category--active'
                          : ''
                      }`}
                      aria-pressed={
                        selectedCategory ===
                        category
                      }
                      onClick={() =>
                        updateParameter(
                          'category',
                          category,
                        )
                      }
                    >
                      {formatCategoryName(
                        category,
                      )}
                    </button>
                  ),
                )}
              </div>
            )}

            {vehicleFilterActive && (
              <div className="shop__vehicle-filter">
                <div>
                  <span>
                    Fitment filter
                  </span>

                  <strong>
                    {[
                      year,
                      make,
                      model,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={clearVehicle}
                >
                  Clear fitment

                  <X
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="shop__grid">
              {filteredProducts.map(
                (product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 4}
                  />
                ),
              )}
            </div>
          ) : (
            <div className="shop__empty">
              <div className="shop__empty-icon">
                <Search
                  size={28}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </div>

              {products.length === 0 ? (
                <>
                  <span>
                    Inventory update
                  </span>

                  <h3>
                    Products are coming soon.
                  </h3>

                  <p>
                    We&apos;re preparing the
                    Moto Hub Miami catalog.
                    Check back soon for parts,
                    gear and performance
                    upgrades.
                  </p>

                  <Link
                    to="/contact"
                    className="shop__empty-action"
                  >
                    Contact us

                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <span>
                    No matches
                  </span>

                  <h3>
                    No products found.
                  </h3>

                  <p>
                    Try changing your search,
                    category or motorcycle
                    fitment to see more
                    products.
                  </p>

                  {filtersActive && (
                    <button
                      type="button"
                      className="shop__empty-action"
                      onClick={clearFilters}
                    >
                      Clear filters

                      <X
                        size={15}
                        strokeWidth={2}
                      />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Shop