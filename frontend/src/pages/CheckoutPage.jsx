import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const [form, setForm] = useState({ address: '', city: '', postal_code: '' })
  const { refresh } = useCart()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    await api.post('checkout/', form)
    await refresh()
    navigate('/billing')
  }

  return (
    <form onSubmit={submit} className='checkout'>
      <h2>Checkout</h2>
      <input required placeholder='Address' onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <input required placeholder='City' onChange={(e) => setForm({ ...form, city: e.target.value })} />
      <input required placeholder='Postal Code' onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
      <button className='btn'>Complete Purchase</button>
    </form>
  )
}
