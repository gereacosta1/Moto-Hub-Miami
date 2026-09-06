import {
  ArrowLeft,
  ArrowRight,
  Home,
} from 'lucide-react'
import { Link } from 'react-router'

import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found">
      <div
        className="not-found__background"
        aria-hidden="true"
      >
        <span className="not-found__number">
          404
        </span>

        <span className="not-found__circle not-found__circle--one" />
        <span className="not-found__circle not-found__circle--two" />
        <span className="not-found__line" />
      </div>

      <div className="container not-found__container">
        <div className="not-found__content">
          <div className="not-found__code">
            <span>
              ERROR
            </span>

            <strong>
              404
            </strong>
          </div>

          <h1>
            WRONG
            <br />

            <span>
              TURN.
            </span>
          </h1>

          <p>
            The page you&apos;re looking for
            doesn&apos;t exist, may have moved,
            or the link is no longer available.
          </p>

          <div className="not-found__actions">
            <Link
              to="/"
              className="not-found__primary"
            >
              <Home
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              Back home

              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/shop"
              className="not-found__secondary"
            >
              Browse products

              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="not-found__footer">
            <span>
              BAVARIAN EURO PERFORMANCE
            </span>

            <i aria-hidden="true" />

            <Link to="/">
              <ArrowLeft
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />

              Return to safety
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound