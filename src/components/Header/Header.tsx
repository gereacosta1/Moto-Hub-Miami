import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import {
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'

import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link
            to="/"
            className="header__logo"
            onClick={closeMenu}
            aria-label="RIDE Parts home"
          >
            <span>RIDE</span>
            <strong>PARTS</strong>
          </Link>

          <nav
            className={`header__nav ${
              menuOpen ? 'header__nav--open' : ''
            }`}
            aria-label="Main navigation"
          >
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? 'header__link header__link--active'
                  : 'header__link'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? 'header__link header__link--active'
                  : 'header__link'
              }
            >
              Shop
            </NavLink>

            <a
              href="/#categories"
              className="header__link"
              onClick={closeMenu}
            >
              Categories
            </a>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? 'header__link header__link--active'
                  : 'header__link'
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="header__actions">
            <Link
              to="/shop"
              className="header__icon-button"
              aria-label="Search products"
              onClick={closeMenu}
            >
              <Search size={20} strokeWidth={1.8} />
            </Link>

            <button
              type="button"
              className="header__icon-button header__cart"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />

              <span className="header__cart-count">
                0
              </span>
            </button>

            <button
              type="button"
              className="header__menu-button"
              aria-label={
                menuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen((current) => !current)
              }
            >
              {menuOpen ? (
                <X size={25} />
              ) : (
                <Menu size={25} />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </>
  )
}

export default Header