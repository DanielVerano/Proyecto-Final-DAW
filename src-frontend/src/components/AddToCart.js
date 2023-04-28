import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'

const AddToCart = ({ product }) => {
  const { stock } = product;
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((old) => {
      let temp = old + 1;
      if (temp > stock) temp = stock;
      return temp;
    });
  }

  const decrease = () => {
    setAmount((old) => {
      let temp = old - 1;
      if (temp < 1) temp = 1;
      return temp;
    });
  }

  return (
    <Wrapper>
      <div className='d-flex align-items-center mb-3'>
        <span className='fw-bold'>Cantidad : </span>
        <button className='btn' onClick={decrease}>
          <FaMinus />
        </button>
        <span className='amount'>{amount}</span>
        <button className="btn" onClick={increase}>
          <FaPlus />
        </button>
      </div>
      <Link to='/cart' className='btn btn-primary' onClick={() => addToCart(product, amount)}>Añadir al carrito</Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .amount {
    font-size: 1.5rem;
  }
`

export default AddToCart