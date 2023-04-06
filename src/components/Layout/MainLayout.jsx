import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import NavBar from '../common/NavBar'

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        marginTop="100px"
      >
        {children}
        <Outlet />
      </Box>
    </>
  )
}

export default MainLayout
