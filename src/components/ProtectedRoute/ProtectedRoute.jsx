import React from 'react'
import { Navigate } from 'react-router-dom'

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

export default ProtectedRoute
