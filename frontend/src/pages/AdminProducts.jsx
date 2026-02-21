import { useEffect, useState } from 'react'
import api from '../api/client'

const empty = { name: '', description: '', price: '', category: 'jackets', stock: 0, image_url: '', featured: false }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(empty)

  const load = () => api.get('products/').then((r) => setProducts(r.data))
  useEffect(load, [])

  const add = async (e) => {
    e.preventDefault()
    await api.post('products/', form)
    setForm(empty)
    load()
  }

  return (
    <div>
      <h2>Products Admin</h2>
      <form onSubmit={add} className='checkout'>
        <input placeholder='Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder='Description' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder='Price' value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder='Image URL' value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <button className='btn'>Create Product</button>
      </form>
      {products.map((p) => <div key={p.id}>{p.name} - ${p.price}</div>)}
    </div>
  )
}
