import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const MainLayout = ({ children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      {children}
      <Outlet />
    </Box>
  )
}

export default MainLayout
