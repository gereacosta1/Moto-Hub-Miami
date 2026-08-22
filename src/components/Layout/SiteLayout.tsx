import { useEffect } from 'react'
import {
  Outlet,
  useLocation,
} from 'react-router'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function SiteLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  )
}

export default SiteLayout