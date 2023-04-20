import React from 'react'
import styled from 'styled-components'
import { ProductCard, Loading, Error } from '../components'
import { useProductsContext } from '../context/products_context'

const FeaturedProducts = () => {
  const { products_loading, products_error, products } = useProductsContext();

  if (products_loading) return <Loading />
  if (products_error) return <Error />

  return (
    <Wrapper>
      <h1 className='text-center'>Productos destacados</h1>
      <div className='row justify-content-evenly py-4'>
        {products.slice(0, 3).map((product, index) => {
          return <ProductCard key={index} {...product} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: antiquewhite;
  padding: 1rem;
`

export default FeaturedProducts