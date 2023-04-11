import React from 'react'
import { Typography } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import UserDetailsModal from '../admin/components/UserDetailsModal'

const Home = () => {
  return (
    <Layout title="Home">
      <Typography variant="h1" color="Highlight">
        Parking System
      </Typography>
      <Typography variant="body1">
        Welcome to Parking System frontend project.
      </Typography>
      <UserDetailsModal />
    </Layout>
  )
}

export default Home
