import { useEffect, useState } from 'react'
import api from '../api/client'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => { api.get('admin/users/').then((r) => setUsers(r.data)) }, [])
  return <div><h2>Users</h2>{users.map(u => <div key={u.id}>{u.username} ({u.email})</div>)}</div>
}
