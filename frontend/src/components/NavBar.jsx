import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function NavBar() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  return (
    <nav className='nav'>
      <Link to='/' className='brand'>Winter Luxe</Link>
      <div className='nav-links'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/account'>Account</Link>}
        {user && <Link to='/billing'>Billing</Link>}
        {user?.is_staff && <Link to='/admin/dashboard'>Admin</Link>}
        <Link to='/cart'>Cart ({count})</Link>
        {!user ? <Link to='/login'>Login</Link> : <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  )
}
