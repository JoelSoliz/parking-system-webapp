import React from 'react'
import { useSelector } from 'react-redux'
import { sessionSelector } from '../../store/slices/session'

const ProtectComponent = ({ children, needed_permission }) => {
  const { isAuthenticate, user } = useSelector(sessionSelector)

  return isAuthenticate && needed_permission.includes(user?.role) ? (
    children
  ) : (
    <></>
  )
}

export default ProtectComponent
