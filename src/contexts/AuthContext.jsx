import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in on mount
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ authenticated: true })
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha })
      const { token } = response.data
      localStorage.setItem('token', token)
      setUser({ email, authenticated: true })
      setLoading(false)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.',
      }
    }
  }

  const register = async (nome, email, senha) => {
    try {
      await api.post('/auth/register', { nome, email, senha })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao registrar. Tente novamente.',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export default AuthContext
