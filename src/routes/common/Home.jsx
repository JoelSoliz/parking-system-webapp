import React from 'react'
import { Typography, Button } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import RequestDetail from '../admin/components/RequestDetail'

const Home = () => {
  const [openModal, setOpenModal] = React.useState(false)
  return (
    <Layout title="Home">
      <Typography variant="h1" color="Highlight">
        Parking System
      </Typography>
      <Typography variant="body1">
        Welcome to Parking System frontend project.
      </Typography>
      <RequestDetail open={openModal} onClose={() => setOpenModal(false)} />
      <Button onClick={() => setOpenModal(true)}>Ver</Button>
    </Layout>
  )
}

export default Home
