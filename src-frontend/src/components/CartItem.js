import React from 'react'
import styled from 'styled-components'
import { FaTrash } from 'react-icons/fa'
import { formatPrice } from '../utils/helpers'
import { useCartContext } from '../context/cart_context'

const CartItem = ({ id, name, image, price, amount }) => {
  const { removeItem } = useCartContext();

  return (
    <Wrapper className='d-flex justify-content-between mb-3'>
      <div><img src={image} alt={name} className='img-fluid' /></div>
      <div className="nombre col-sm-2 text-center">{name}</div>
      <div className="precio col-sm-2 text-center">{formatPrice(price)}</div>
      <div className="cantidad col-sm-2 text-center">{amount}</div>
      <div className="subtotal col-sm-2 text-center">{formatPrice(price * amount)}</div>
      <button type='button' className='remove-btn' onClick={() => removeItem(id)}><FaTrash /></button>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  div {
    align-self: center;
  }

  img {
    max-width: 150px;
  }

  .nombre {
    font-weight: bold;
  }

  .precio {
    color: #ab7a5f;
  }

  .cantidad {
    font-size: 1.5rem;
  }

  .subtotal {
    color: #ab7a5f;
    font-weight: bold;
  }

  .remove-btn {
    color: #fff;
    background: #bb2525;
    border: transparent;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: pointer;
    align-self: center;
  }
`

export default CartItem