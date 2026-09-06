import {
  ArrowRight,
  Bike,
  Search,
} from 'lucide-react'
import {
  type FormEvent,
  useMemo,
  useState,
} from 'react'
import {
  Link,
  useNavigate,
} from 'react-router'

import './VehicleFinder.css'

const motorcycleMakes = [
  'Aprilia',
  'BMW',
  'Can-Am',
  'Ducati',
  'GasGas',
  'Harley-Davidson',
  'Honda',
  'Husqvarna',
  'Indian',
  'Kawasaki',
  'KTM',
  'Moto Guzzi',
  'MV Agusta',
  'Royal Enfield',
  'Suzuki',
  'Triumph',
  'Yamaha',
] as const

function VehicleFinder() {
  const navigate = useNavigate()

  const currentYear = new Date().getFullYear()

  const years = useMemo(
    () =>
      Array.from(
        {
          length: currentYear - 1989,
        },
        (_, index) => currentYear - index,
      ),
    [currentYear],
  )

  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')

  const canSearch =
    year.trim() !== '' &&
    make.trim() !== '' &&
    model.trim() !== ''

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!canSearch) {
      return
    }

    const params = new URLSearchParams({
      year,
      make: make.trim(),
      model: model.trim(),
    })

    navigate(`/shop?${params.toString()}`)
  }

  return (
    <section
      className="vehicle-finder"
      aria-labelledby="vehicle-finder-title"
    >
      <div className="vehicle-finder__background">
        <span
          className="vehicle-finder__background-word"
          aria-hidden="true"
        >
          BEP
        </span>

        <span
          className="vehicle-finder__line vehicle-finder__line--top"
          aria-hidden="true"
        />

        <span
          className="vehicle-finder__line vehicle-finder__line--bottom"
          aria-hidden="true"
        />
      </div>

      <div className="container vehicle-finder__container">
        <div className="vehicle-finder__content">
          <div className="vehicle-finder__heading">
            <span className="vehicle-finder__eyebrow">
              <Bike
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              Motorcycle Fitment Finder
            </span>

            <h2
              id="vehicle-finder-title"
              className="vehicle-finder__title"
            >
              FIND PARTS THAT
              <br />

              <span>
                FIT YOUR BIKE.
              </span>
            </h2>

            <p className="vehicle-finder__description">
              Enter your motorcycle details and find
              parts, accessories and performance upgrades
              for your specific bike.
            </p>
          </div>

          <div className="vehicle-finder__panel">
            <div className="vehicle-finder__panel-header">
              <div>
                <span className="vehicle-finder__panel-label">
                  Your motorcycle
                </span>

                <strong>
                  Select your fitment
                </strong>
              </div>

              <span
                className="vehicle-finder__panel-number"
                aria-hidden="true"
              >
                01
              </span>
            </div>

            <form
              className="vehicle-finder__form"
              onSubmit={handleSubmit}
            >
              <div className="vehicle-finder__field">
                <label htmlFor="vehicle-year">
                  Year
                </label>

                <div className="vehicle-finder__control">
                  <select
                    id="vehicle-year"
                    value={year}
                    onChange={(event) =>
                      setYear(event.target.value)
                    }
                    required
                  >
                    <option value="">
                      Select year
                    </option>

                    {years.map((vehicleYear) => (
                      <option
                        key={vehicleYear}
                        value={vehicleYear}
                      >
                        {vehicleYear}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="vehicle-finder__field">
                <label htmlFor="vehicle-make">
                  Make
                </label>

                <div className="vehicle-finder__control">
                  <input
                    id="vehicle-make"
                    type="text"
                    list="motorcycle-makes"
                    value={make}
                    onChange={(event) =>
                      setMake(event.target.value)
                    }
                    placeholder="e.g. Yamaha"
                    autoComplete="off"
                    required
                  />

                  <datalist id="motorcycle-makes">
                    {motorcycleMakes.map(
                      (manufacturer) => (
                        <option
                          key={manufacturer}
                          value={manufacturer}
                        />
                      ),
                    )}
                  </datalist>
                </div>
              </div>

              <div className="vehicle-finder__field">
                <label htmlFor="vehicle-model">
                  Model
                </label>

                <div className="vehicle-finder__control">
                  <input
                    id="vehicle-model"
                    type="text"
                    value={model}
                    onChange={(event) =>
                      setModel(event.target.value)
                    }
                    placeholder="e.g. YZF-R6"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="vehicle-finder__submit"
                disabled={!canSearch}
              >
                <Search
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                Find parts

                <ArrowRight
                  size={17}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </form>

            <div className="vehicle-finder__footer">
              <span>
                Not sure what fits?
              </span>

              <Link to="/shop">
                Browse all products

                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VehicleFinder