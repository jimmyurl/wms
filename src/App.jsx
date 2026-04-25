import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { WarehouseProvider } from './context/WarehouseContext'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import InventoryPage from './pages/InventoryPage'
import ReceivingPage from './pages/ReceivingPage'
import OrdersPage from './pages/OrdersPage'
import ShippingPage from './pages/ShippingPage'
import ReturnsPage from './pages/ReturnsPage'
import LaborPage from './pages/LaborPage'
import ReportsPage from './pages/ReportsPage'
import { Spinner } from './components/ui'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-ink-900">
      <Spinner size={28} />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return <WarehouseProvider>{children}</WarehouseProvider>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="receiving" element={<ReceivingPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="returns" element={<ReturnsPage />} />
            <Route path="labor" element={<LaborPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}