import { Box, Typography } from '@mui/material'
import React from 'react'

function App() {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h1" color="Highlight">
        Parking System
      </Typography>
      <Typography variant="body1">
        Welcome to Parking System frontend project.
      </Typography>
    </Box>
  )
}

export default App
