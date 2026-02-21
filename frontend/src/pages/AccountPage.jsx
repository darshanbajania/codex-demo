import { useEffect, useState } from 'react'
import api from '../api/client'

export default function AccountPage() {
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    api.get('profile/').then((r) => setProfile(r.data))
    api.get('orders/me/').then((r) => setOrders(r.data))
  }, [])

  if (!profile) return <p>Loading...</p>

  return (
    <div>
      <h2>My Account</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <h3>Recent Orders</h3>
      {orders.map((o) => <div key={o.id}>#{o.id} - ${o.total} - {o.status}</div>)}
    </div>
  )
}
