import {
  CheckCircle2,
  MapPin,
  Search,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router'

import './Benefits.css'

const benefits = [
  {
    id: 'rider-focused',
    number: '01',
    icon: Wrench,
    title: 'Built for riders',
    description:
      'A focused selection of motorcycle parts, gear and performance upgrades without the clutter of a generic marketplace.',
  },
  {
    id: 'fitment',
    number: '02',
    icon: Search,
    title: 'Find the right fit',
    description:
      'Use your motorcycle details, categories and product information to narrow down the parts that make sense for your bike.',
  },
  {
    id: 'miami',
    number: '03',
    icon: MapPin,
    title: 'Miami based',
    description:
      'A local-first motorcycle shopping experience built around riders in Miami and across South Florida.',
  },
  {
    id: 'clear-shopping',
    number: '04',
    icon: CheckCircle2,
    title: 'Shop with clarity',
    description:
      'Straightforward pricing, availability and specifications help you compare products before making your choice.',
  },
] as const

function Benefits() {
  return (
    <section
      className="benefits section"
      aria-labelledby="benefits-title"
    >
      <div className="container">
        <div className="benefits__header">
          <div>
            <span className="section__eyebrow">
              Why Moto Hub
            </span>

            <h2
              id="benefits-title"
              className="section__title benefits__title"
            >
              MORE THAN
              <br />
              <span>JUST PARTS.</span>
            </h2>
          </div>

          <div className="benefits__header-copy">
            <p>
              Built around motorcycles, riders and the
              details that matter when choosing your next
              upgrade.
            </p>

            <Link
              to="/contact"
              className="benefits__contact"
            >
              Need help choosing?

              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="benefits__grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <article
                className="benefits__card"
                key={benefit.id}
              >
                <div className="benefits__card-top">
                  <span className="benefits__number">
                    {benefit.number}
                  </span>

                  <div
                    className="benefits__icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <div className="benefits__card-content">
                  <h3>
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.description}
                  </p>
                </div>

                <span
                  className="benefits__card-line"
                  aria-hidden="true"
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits