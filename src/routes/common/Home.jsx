import React from 'react'
import { Typography } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import Map from '../../components/map/Map'

const Home = () => {
  return (
    <Layout title="Home">
      <Typography variant="h1" color="Highlight">
        Parking System
      </Typography>
      <Typography variant="body1">
        Welcome to Parking System frontend project.
      </Typography>
      <Map />
    </Layout>
  )
}

export default Home
