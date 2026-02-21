import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/client'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loadProfile = async () => {
    try {
      const { data } = await api.get('profile/')
      setUser(data)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access')) loadProfile()
  }, [])

  const login = async (username, password) => {
    const { data } = await api.post('auth/login/', { username, password })
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    await loadProfile()
  }

  const register = async (username, email, password) => {
    await api.post('auth/register/', { username, email, password })
    await login(username, password)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
