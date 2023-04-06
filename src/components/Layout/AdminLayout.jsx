import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = ({ children }) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  )
}

export default AdminLayout
