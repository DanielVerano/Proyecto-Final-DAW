import React from 'react'
import { useFilterContext } from "../context/filter_context";
import { ProductCard } from '../components'

const ProductList = () => {
  const { filtered_products } = useFilterContext();

  if (filtered_products.length < 1) return <h5>Lo sentimos, no se encontraron productos para mostrar.</h5>

  return (
    <section className='d-flex justify-content-between flex-wrap'>
      {filtered_products.map((product) => {
        return <ProductCard key={product._id} {...product} />
      })}
    </section>
  )
}

export default ProductList