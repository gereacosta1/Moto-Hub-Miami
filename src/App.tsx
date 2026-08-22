import {
  Route,
  Routes,
} from 'react-router'

import SiteLayout from './components/Layout/SiteLayout'
import { products } from './data/products'

import Contact from './pages/Contact/Contact'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Product from './pages/Product/Product'
import Shop from './pages/Shop/Shop'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route
          index
          element={
            <Home products={products} />
          }
        />

        <Route
          path="shop"
          element={
            <Shop products={products} />
          }
        />

        <Route
          path="product/:slug"
          element={
            <Product products={products} />
          }
        />

        <Route
          path="contact"
          element={<Contact />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  )
}

export default App