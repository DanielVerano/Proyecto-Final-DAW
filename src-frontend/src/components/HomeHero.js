import React from 'react'
import landing_img from '../assets/landing-image.webp'
import { Link } from 'react-router-dom'

const HomeHero = () => {
  return (
    <section className='row align-items-center justify-content-center py-5'>
      <article className='col-lg-6 px-4 text-center'>
        <img src={landing_img} alt="placeholder" style={{ maxWidth: '100%' }} />
      </article>
      <article className='col-lg-6 px-4 text-center'>
        <h1>Bienvenid@ a Technify</h1>
        <h3>Tu página para encontrar las mejores novedades sobre gadgets y productos tecnológicos.</h3>
        <Link to='/products' className='btn btn-primary my-2 w-25'>Ver productos</Link>
      </article>
    </section>
  )
}

export default HomeHero