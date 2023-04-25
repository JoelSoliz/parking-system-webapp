import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { sessionSelector } from '../../store/slices/session'

const PrivateRoute = ({ children, needed_permission }) => {
  const { isAuthenticate, user } = useSelector(sessionSelector)

  return isAuthenticate && needed_permission.includes(user?.role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  )
}

export default PrivateRoute
