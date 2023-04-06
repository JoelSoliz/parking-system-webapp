import React, { useState } from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ children, needed_permission }) => {
  const [user, _] = useState({
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
