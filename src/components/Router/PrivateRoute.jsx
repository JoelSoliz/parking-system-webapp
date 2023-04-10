import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, needed_permission }) => {
  const [user] = useState({
    authenticated: true,
    permissions: ['admin_view'],
  })

  return user.authenticated && user.permissions.includes(needed_permission) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  )
}

export default PrivateRoute
