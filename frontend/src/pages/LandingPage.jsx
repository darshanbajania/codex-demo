import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <section className='hero'>
        <h1>Elevate Your Winter Wardrobe</h1>
        <p>Premium jackets, thermal accessories, and exclusive seasonal drops curated for modern explorers.</p>
        <Link to='/products' className='btn'>Shop Collection</Link>
      </section>
      <section className='grid'>
        <img src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800' alt='winter style' />
        <img src='https://images.unsplash.com/photo-1445205170230-053b83016050?w=800' alt='fashion' />
        <img src='https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800' alt='coat' />
      </section>
    </div>
  )
}
