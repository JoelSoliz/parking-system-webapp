import React from 'react'
import { Typography } from '@mui/material'
import Layout from '../../components/Layout/Layout'

const Unauthorized = () => {
  return (
    <Layout title="Unauthorized">
      <Typography>You aren't authorized to be here!</Typography>
    </Layout>
  )
}

export default Unauthorized
