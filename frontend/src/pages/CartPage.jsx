import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem } = useCart()
  const navigate = useNavigate()

  return (
    <div>
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div key={item.id} className='row'>
          <span>{item.product.name}</span>
          <input type='number' min='1' value={item.quantity} onChange={(e) => updateQty(item.id, Number(e.target.value))} />
          <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      <button className='btn' onClick={() => navigate('/checkout')}>Checkout</button>
    </div>
  )
}
