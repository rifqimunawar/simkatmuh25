import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

// Cek apakah user sudah login
const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />
  }

  return children
}
