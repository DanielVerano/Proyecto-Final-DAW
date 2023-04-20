import React from 'react'
import styled from 'styled-components'
// import placeholder from '../assets/product-placeholder.jpg'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/helpers';

const ProductCard = ({ image, name, price, _id }) => {
  return (
    <Wrapper className='col-lg-4 py-2'>
      <div className='text-center'>
        <img src={image} alt="placeholder" className='img-fluid' />
      </div>
      <footer className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h5>{name}</h5>
          <p>{formatPrice(price)}</p>
        </div>
        <div className='d-flex justify-content-end'>
          <Link to={`/products/${_id}`} className='btn btn-primary'>Ver producto</Link>
        </div>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  max-width: 300px;
`

export default ProductCard