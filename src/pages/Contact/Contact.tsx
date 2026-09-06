import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Send,
  Wrench,
} from 'lucide-react'
import {
  type FormEvent,
  useMemo,
  useState,
} from 'react'
import {
  Link,
  useSearchParams,
} from 'react-router'

import './Contact.css'

type FormStatus =
  | 'idle'
  | 'sending'
  | 'success'
  | 'error'

function formatProductSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(' ')
}

function Contact() {
  const [searchParams] = useSearchParams()

  const [formStatus, setFormStatus] =
    useState<FormStatus>('idle')

  const productSlug =
    searchParams.get('product') ?? ''

  const productName = useMemo(
    () =>
      productSlug
        ? formatProductSlug(productSlug)
        : '',
    [productSlug],
  )

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const body = new URLSearchParams()

    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        body.append(key, value)
      }
    })

    try {
      setFormStatus('sending')

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })

      if (!response.ok) {
        throw new Error(
          'Unable to submit contact form',
        )
      }

      setFormStatus('success')
      form.reset()
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-page__hero">
        <div
          className="contact-page__hero-background"
          aria-hidden="true"
        >
          <span className="contact-page__hero-word">
            BEP
          </span>

          <span className="contact-page__hero-circle contact-page__hero-circle--one" />

          <span className="contact-page__hero-circle contact-page__hero-circle--two" />

          <span className="contact-page__hero-line" />
        </div>

        <div className="container contact-page__hero-container">
          <span className="contact-page__eyebrow">
            Bavarian Euro Performance
          </span>

          <h1>
            LET&apos;S TALK
            <br />

            <span>
              PERFORMANCE.
            </span>
          </h1>

          <p>
            Need help finding a part, checking
            fitment or choosing your next upgrade?
            Send us your vehicle details and
            we&apos;ll help point you in the right
            direction.
          </p>
        </div>
      </section>

      <section className="contact-page__content">
        <div className="container">
          <div className="contact-page__layout">
            <div className="contact-page__information">
              <span className="section__eyebrow">
                Get in touch
              </span>

              <h2>
                BUILT AROUND
                <br />

                <span>
                  YOUR VEHICLE.
                </span>
              </h2>

              <p className="contact-page__information-copy">
                Tell us what you&apos;re looking
                for, what you drive and any fitment
                details you already have. The more
                information you provide, the easier
                it is to narrow down the right
                option.
              </p>

              <div className="contact-page__details">
                <div className="contact-page__detail">
                  <div
                    className="contact-page__detail-icon"
                    aria-hidden="true"
                  >
                    <MapPin
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span>
                      Location
                    </span>

                    <strong>
                      Miami, Florida
                    </strong>

                    <p>
                      Serving European vehicle
                      owners across South Florida.
                    </p>
                  </div>
                </div>

                <div className="contact-page__detail">
                  <div
                    className="contact-page__detail-icon"
                    aria-hidden="true"
                  >
                    <Wrench
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span>
                      Product assistance
                    </span>

                    <strong>
                      Parts &amp; Fitment
                    </strong>

                    <p>
                      Ask about products,
                      compatibility and performance
                      upgrades for your vehicle.
                    </p>
                  </div>
                </div>

                <div className="contact-page__detail">
                  <div
                    className="contact-page__detail-icon"
                    aria-hidden="true"
                  >
                    <Clock3
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span>
                      Inquiries
                    </span>

                    <strong>
                      Send us a message
                    </strong>

                    <p>
                      Submit your request and
                      include as much vehicle and
                      product detail as possible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-page__shop-card">
                <div>
                  <span>
                    Already browsing?
                  </span>

                  <strong>
                    Explore the catalog.
                  </strong>
                </div>

                <Link
                  to="/shop"
                  aria-label="Browse Bavarian Euro Performance products"
                >
                  <ArrowRight
                    size={19}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <div className="contact-page__form-card">
              <div className="contact-page__form-header">
                <div>
                  <span>
                    Contact form
                  </span>

                  <h2>
                    How can we help?
                  </h2>
                </div>

                <MessageSquareText
                  size={25}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </div>

              {productName && (
                <div className="contact-page__product">
                  <span>
                    Product inquiry
                  </span>

                  <strong>
                    {productName}
                  </strong>
                </div>
              )}

              {formStatus === 'success' && (
                <div
                  className="contact-page__status contact-page__status--success"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <div>
                    <strong>
                      Message sent.
                    </strong>

                    <span>
                      Your inquiry has been
                      submitted successfully.
                    </span>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  className="contact-page__status contact-page__status--error"
                  role="alert"
                >
                  <Mail
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <div>
                    <strong>
                      Couldn&apos;t send the message.
                    </strong>

                    <span>
                      Please try again once the
                      contact form is connected
                      on the live site.
                    </span>
                  </div>
                </div>
              )}

              <form
                className="contact-page__form"
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="contact"
                />

                {productSlug && (
                  <input
                    type="hidden"
                    name="product"
                    value={productSlug}
                  />
                )}

                <div className="contact-page__form-row">
                  <div className="contact-page__field">
                    <label htmlFor="contact-name">
                      Name

                      <span aria-hidden="true">
                        *
                      </span>
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="contact-page__field">
                    <label htmlFor="contact-email">
                      Email

                      <span aria-hidden="true">
                        *
                      </span>
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="contact-page__form-row">
                  <div className="contact-page__field">
                    <label htmlFor="contact-phone">
                      Phone
                    </label>

                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Optional"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="contact-page__field">
                    <label htmlFor="contact-topic">
                      Topic

                      <span aria-hidden="true">
                        *
                      </span>
                    </label>

                    <select
                      id="contact-topic"
                      name="topic"
                      defaultValue={
                        productName
                          ? 'product'
                          : ''
                      }
                      required
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select a topic
                      </option>

                      <option value="product">
                        Product inquiry
                      </option>

                      <option value="fitment">
                        Fitment help
                      </option>

                      <option value="availability">
                        Availability
                      </option>

                      <option value="general">
                        General question
                      </option>
                    </select>
                  </div>
                </div>

                <div className="contact-page__field">
                  <label htmlFor="contact-vehicle">
                    Vehicle
                  </label>

                  <input
                    id="contact-vehicle"
                    name="vehicle"
                    type="text"
                    placeholder="e.g. 2021 BMW M3"
                  />
                </div>

                <div className="contact-page__field">
                  <label htmlFor="contact-message">
                    Message

                    <span aria-hidden="true">
                      *
                    </span>
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    placeholder="Tell us what you're looking for..."
                    defaultValue={
                      productName
                        ? `I'm interested in ${productName}.`
                        : ''
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-page__submit"
                  disabled={
                    formStatus === 'sending'
                  }
                >
                  <Send
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />

                  {formStatus === 'sending'
                    ? 'Sending...'
                    : 'Send message'}

                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>

                <p className="contact-page__form-note">
                  By submitting this form,
                  you&apos;re sending an inquiry
                  to Bavarian Euro Performance.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact