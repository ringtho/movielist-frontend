import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('movieToken')
  if (!token) {
    return (
      <Navigate
        replace
        to="/login"
        state={{ alert: 'Authentication is Required' }}
      />
    )
  }
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.object
}

export default ProtectedRoute
