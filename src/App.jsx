import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import DashboardPage from './pages/DashboardPage'
import EntradaPage from './pages/EntradaPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SaidaPage from './pages/SaidaPage'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ResponsiveDrawer>
              <DashboardPage />
            </ResponsiveDrawer>
          </ProtectedRoute>
        }
      />
      <Route
        path="/entrada"
        element={
          <ProtectedRoute>
            <ResponsiveDrawer>
              <EntradaPage />
            </ResponsiveDrawer>
          </ProtectedRoute>
        }
      />
      <Route
        path="/saida"
        element={
          <ProtectedRoute>
            <ResponsiveDrawer>
              <SaidaPage />
            </ResponsiveDrawer>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
