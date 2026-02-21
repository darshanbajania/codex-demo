import { useEffect, useState } from 'react'
import api from '../api/client'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null)
  useEffect(() => { api.get('admin/metrics/').then((r) => setMetrics(r.data)) }, [])
  if (!metrics) return <p>Loading...</p>
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className='row'><Link to='/admin/users'>Users</Link><Link to='/admin/orders'>Orders</Link><Link to='/admin/products'>Products</Link></div>
      <div className='cards'>
        <div className='card'>Users: {metrics.users}</div>
        <div className='card'>Products: {metrics.products}</div>
        <div className='card'>Orders: {metrics.orders}</div>
        <div className='card'>Revenue: ${metrics.revenue}</div>
      </div>
    </div>
  )
}
