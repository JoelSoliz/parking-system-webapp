import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../common/SideBar'
import NavBarUser from '../common/NavBarUser'

const AdminLayout = ({ children }) => {
  return (
    <>
      <SideBar>
        {children}
        <NavBarUser />
        <Outlet />
      </SideBar>

    </>
  )
}

export default AdminLayout
