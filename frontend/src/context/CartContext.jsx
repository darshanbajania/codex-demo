import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/client'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const refresh = async () => {
    try {
      const { data } = await api.get('cart/')
      setItems(data)
    } catch {
      setItems([])
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access')) refresh()
  }, [])

  const addToCart = async (productId, quantity = 1) => {
    await api.post('cart/', { product_id: productId, quantity })
    await refresh()
  }

  const updateQty = async (id, quantity) => {
    await api.patch(`cart/${id}/`, { quantity })
    await refresh()
  }

  const removeItem = async (id) => {
    await api.delete(`cart/${id}/`)
    await refresh()
  }

  const count = items.reduce((acc, i) => acc + i.quantity, 0)
  const subtotal = items.reduce((acc, i) => acc + Number(i.product.price) * i.quantity, 0)

  return <CartContext.Provider value={{ items, count, subtotal, refresh, addToCart, updateQty, removeItem }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
