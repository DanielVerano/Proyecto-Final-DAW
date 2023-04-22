import React from 'react'
import { useProductsContext } from "../context/products_context";
import { ProductCard } from '../components'

const ProductList = () => {
  const { products } = useProductsContext();
  console.log(products);
  return (
    <section className='d-flex justify-content-between'>
      {products.map((product) => {
        return <ProductCard key={product._id} {...product} />
      })}
    </section>
  )
}

export default ProductList