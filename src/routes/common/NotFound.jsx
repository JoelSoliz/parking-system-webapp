import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

const NotFound = () => {
  console.log('Not found')
  return (
    <Layout title="Not Found">
      <Typography>
        Page not found! Go back <Link to="/">Home</Link>
      </Typography>
    </Layout>
  )
}

export default NotFound
