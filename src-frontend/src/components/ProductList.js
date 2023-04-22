import React from 'react'
import { useFilterContext } from "../context/filter_context";
import { ProductCard } from '../components'

const ProductList = () => {
  const { filtered_products } = useFilterContext();

  return (
    <section className='d-flex justify-content-between'>
      {filtered_products.map((product) => {
        return <ProductCard key={product._id} {...product} />
      })}
    </section>
  )
}

export default ProductList