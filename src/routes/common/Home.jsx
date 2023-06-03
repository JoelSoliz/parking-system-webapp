import React from 'react'
import { Typography, Box } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import Map from '../../components/map/Map'

const Home = () => {
  return (
    <Layout title="Home">
      <Box
        sx={{
          marginY: -2,
          marginBottom: '20px',
        }}
      >
        <Typography variant="h1" color="Highlight">
          Parking System
        </Typography>
      </Box>
      <Map />
    </Layout>
  )
}

export default Home
