import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/client'
import { useCart } from '../context/CartContext'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    api.get(`products/${id}/`).then((r) => setProduct(r.data))
  }, [id])

  if (!product) return <p>Loading...</p>

  return (
    <div className='detail'>
      <img src={product.image_url} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className='price'>${product.price}</p>
        <button className='btn' onClick={() => addToCart(product.id)}>Add to cart</button>
      </div>
    </div>
  )
}
