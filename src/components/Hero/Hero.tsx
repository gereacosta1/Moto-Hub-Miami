import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MapPin,
} from 'lucide-react'
import { Link } from 'react-router'

import './Hero.css'

const heroCategories = [
  'Parts',
  'Gear',
  'Performance',
  'Accessories',
] as const

function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
    >
      <div
        className="hero__background"
        aria-hidden="true"
      >
        <span className="hero__grid" />
        <span className="hero__glow" />

        <span className="hero__outline hero__outline--one" />
        <span className="hero__outline hero__outline--two" />

        <span className="hero__background-word">
          MIAMI
        </span>
      </div>

      <div className="container hero__container">
        <div className="hero__main">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-line" />

              <span>
                Motorcycle Parts · Miami
              </span>
            </div>

            <h1
              id="hero-title"
              className="hero__title"
            >
              BUILT FOR
              <br />

              <span className="hero__title-accent">
                THE RIDE.
              </span>
            </h1>

            <p className="hero__description">
              Motorcycle parts, riding gear and performance
              upgrades for riders who want more from every
              mile.
            </p>

            <div className="hero__actions">
              <Link
                to="/shop"
                className="hero__primary"
              >
                Shop parts

                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>

              <Link
                to="/contact"
                className="hero__secondary"
              >
                <MapPin
                  size={17}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />

                Contact us
              </Link>
            </div>
          </div>

          <div
            className="hero__visual"
            aria-label="Moto Hub Miami motorcycle parts and performance"
          >
            <div
              className="hero__visual-lines"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div className="hero__visual-top">
              <span>
                MHM / 01
              </span>

              <span>
                MIAMI, FL
              </span>
            </div>

            <div className="hero__brand-mark">
              <span className="hero__brand-moto">
                MOTO
              </span>

              <span className="hero__brand-hub">
                HUB
              </span>

              <span className="hero__brand-miami">
                MIAMI
              </span>
            </div>

            <div className="hero__visual-bottom">
              <div>
                <span className="hero__visual-label">
                  Built around
                </span>

                <strong>
                  Riders
                </strong>
              </div>

              <Link
                to="/shop"
                className="hero__visual-link"
                aria-label="Explore Moto Hub Miami products"
              >
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="hero__categories">
            {heroCategories.map(
              (category, index) => (
                <span key={category}>
                  <small>
                    {String(index + 1).padStart(2, '0')}
                  </small>

                  {category}
                </span>
              ),
            )}
          </div>

          <a
            href="#featured-products"
            className="hero__scroll"
            aria-label="Scroll to featured products"
          >
            <span>
              Explore
            </span>

            <ChevronDown
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div
        className="hero__ticker"
        aria-hidden="true"
      >
        <div className="hero__ticker-track">
          <span>
            PARTS
          </span>

          <i />

          <span>
            PERFORMANCE
          </span>

          <i />

          <span>
            RIDING GEAR
          </span>

          <i />

          <span>
            ACCESSORIES
          </span>

          <i />

          <span>
            MOTO HUB MIAMI
          </span>

          <i />

          <span>
            PARTS
          </span>

          <i />

          <span>
            PERFORMANCE
          </span>

          <i />

          <span>
            RIDING GEAR
          </span>

          <i />

          <span>
            ACCESSORIES
          </span>

          <i />

          <span>
            MOTO HUB MIAMI
          </span>

          <i />
        </div>
      </div>
    </section>
  )
}

export default Hero