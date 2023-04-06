import React from 'react'
import { Helmet } from 'react-helmet'

const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Parking System</title>
      </Helmet>
      {children}
    </>
  )
}

export default Layout
