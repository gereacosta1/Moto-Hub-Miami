import {
  ArrowUpRight,
  MapPin,
  MessageSquareText,
} from 'lucide-react'
import { Link } from 'react-router'

import { featuredCategories } from '../../data/categories'

import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div
        className="footer__background"
        aria-hidden="true"
      >
        <span className="footer__background-word">
          MOTO
        </span>

        <span className="footer__background-line" />
      </div>

      <div className="container footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link
              to="/"
              className="footer__logo"
              aria-label="Moto Hub Miami home"
            >
              <span className="footer__logo-moto">
                MOTO
              </span>

              <strong className="footer__logo-hub">
                HUB
              </strong>

              <small>
                MIAMI
              </small>
            </Link>

            <p>
              Motorcycle parts, riding gear,
              accessories and performance upgrades
              built around riders in Miami and
              South Florida.
            </p>

            <div className="footer__location">
              <MapPin
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span>
                Miami, Florida
              </span>
            </div>
          </div>

          <div className="footer__column">
            <span className="footer__column-label">
              01
            </span>

            <h3>
              Navigation
            </h3>

            <nav aria-label="Footer navigation">
              <Link to="/">
                Home
              </Link>

              <Link to="/shop">
                Shop
              </Link>

              <Link to="/contact">
                Contact
              </Link>
            </nav>
          </div>

          <div className="footer__column">
            <span className="footer__column-label">
              02
            </span>

            <h3>
              Categories
            </h3>

            <nav aria-label="Product categories">
              {featuredCategories.map(
                (category) => (
                  <Link
                    key={category.id}
                    to={`/shop?category=${category.slug}`}
                  >
                    {category.name}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="footer__column footer__contact">
            <span className="footer__column-label">
              03
            </span>

            <h3>
              Need help?
            </h3>

            <p>
              Looking for a specific part or
              unsure about fitment? Send us your
              motorcycle details.
            </p>

            <Link
              to="/contact"
              className="footer__contact-link"
            >
              <MessageSquareText
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              Contact Moto Hub

              <ArrowUpRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="footer__middle">
          <div className="footer__statement">
            <span>
              Parts
            </span>

            <i aria-hidden="true" />

            <span>
              Performance
            </span>

            <i aria-hidden="true" />

            <span>
              Riding Gear
            </span>

            <i aria-hidden="true" />

            <span>
              Miami
            </span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {currentYear} Moto Hub Miami.
            All rights reserved.
          </span>

          <span>
            Motorcycle Parts &amp; Accessories
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer