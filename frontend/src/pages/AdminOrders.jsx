import { useEffect, useState } from 'react'
import api from '../api/client'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  useEffect(() => { api.get('admin/orders/').then((r) => setOrders(r.data)) }, [])
  return <div><h2>Orders</h2>{orders.map(o => <div key={o.id}>#{o.id} ${o.total} {o.status}</div>)}</div>
}
