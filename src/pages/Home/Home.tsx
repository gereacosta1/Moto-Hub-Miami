import Benefits from '../../components/Benefits/Benefits'
import Categories from '../../components/Categories/Categories'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Hero from '../../components/Hero/Hero'
import VehicleFinder from '../../components/VehicleFinder/VehicleFinder'

import type { Product } from '../../types/product'

interface HomeProps {
  products?: readonly Product[]
}

function Home({
  products = [],
}: HomeProps) {
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 8)

  return (
    <main>
      <Hero />

      <VehicleFinder />

      <Categories />

      <FeaturedProducts
        products={featuredProducts}
      />

      <Benefits />
    </main>
  )
}

export default Home