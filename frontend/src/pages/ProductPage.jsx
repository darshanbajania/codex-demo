import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    api.get('products/').then((r) => setProducts(r.data))
  }, [])

  const filtered = products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h2>Products</h2>
      <input placeholder='Search by name or category' value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className='cards'>
        {filtered.map((p) => (
          <Link key={p.id} to={`/products/${p.id}`} className='card'>
            <img src={p.image_url} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
