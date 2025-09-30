import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { checkAuth } from './utils/auth'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    checkAuth().then((res) => {
      setIsAuth(res)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-white text-lg">Loading...</h1>
      </div>
    )
  }

  if (!isAuth) {
    return <Navigate to="/signin" replace />
  }

  return children
}
