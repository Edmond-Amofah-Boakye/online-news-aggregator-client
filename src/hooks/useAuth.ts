import { useEffect, useState } from 'react'
import { authServiice } from '../services/user.service'

const useAuth = () => {
    const [user, setUser] = useState(authServiice.getUser)
    const [isAuthenticated, setIsAuthenticated] = useState(authServiice.isAuthenticated)
    const [role, setRole] = useState(authServiice.userRole)
    const [isLoading, setIsLoading] = useState(authServiice.isLoading)


    useEffect(() => {
      setUser(authServiice.getUser)
      setIsAuthenticated(authServiice.isAuthenticated)
      setRole(authServiice.userRole)
      setIsLoading(authServiice.isLoading)
    }, [])
    

  return {
    user,
    isAuthenticated,
    role,
    isLoading
  }
}

export default useAuth