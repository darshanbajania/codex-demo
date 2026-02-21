import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AccountPage from './pages/AccountPage'
import BillingPage from './pages/BillingPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminOrders from './pages/AdminOrders'
import AdminProducts from './pages/AdminProducts'
import { useAuth } from './context/AuthContext'

const Guard = ({ children, admin }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to='/login' />
  if (admin && !user.is_staff) return <Navigate to='/' />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className='container'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/products' element={<ProductPage />} />
          <Route path='/products/:id' element={<ProductDetailsPage />} />
          <Route path='/cart' element={<Guard><CartPage /></Guard>} />
          <Route path='/checkout' element={<Guard><CheckoutPage /></Guard>} />
          <Route path='/account' element={<Guard><AccountPage /></Guard>} />
          <Route path='/billing' element={<Guard><BillingPage /></Guard>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin/dashboard' element={<Guard admin><AdminDashboard /></Guard>} />
          <Route path='/admin/users' element={<Guard admin><AdminUsers /></Guard>} />
          <Route path='/admin/orders' element={<Guard admin><AdminOrders /></Guard>} />
          <Route path='/admin/products' element={<Guard admin><AdminProducts /></Guard>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
