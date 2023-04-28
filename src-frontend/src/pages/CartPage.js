import React from 'react'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import styled from 'styled-components'
import { Breadcrumb, CartItem } from '../components'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/helpers'

const CartPage = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();

  if (cart.length < 1) return (
    <>
      <Breadcrumb title='Carrito' />
      <Wrapper className='d-flex flex-column justify-content-center align-items-center'>
        <h2>Tu carrito está vacío.</h2>
        <Link to='/products' className='btn btn-primary my-2'>Ver productos</Link>
      </Wrapper>
    </>
  )

  return (
    <>
      <Breadcrumb title='Carrito' />
      <Wrapper className='my-5'>
        <div className="columns justify-content-between">
          <h5 className='imagen'>Imagen</h5>
          <h5 className='col-sm-2 text-center' >Item</h5>
          <h5 className='col-sm-2 text-center'>Precio</h5>
          <h5 className='col-sm-2 text-center'>Cantidad</h5>
          <h5 className='col-sm-2 text-center'>Subtotal</h5>
          <span className='borrar'></span>
        </div>
        <hr />
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
        <hr />
        <div className='d-flex justify-content-between my-3'>
          <Link to='/products' className='btn btn-primary'>Seguir comprando</Link>
          <button type='button' className='btn btn-danger' onClick={clearCart}>Limpiar Carrito</button>
        </div>
        <div className='d-flex justify-content-lg-end justify-content-center my-3'>
          <section className='col-lg-4 col-8 totals p-3'>
            <h5 className='d-flex justify-content-between'>Subtotal : <span>{formatPrice(total_amount)}</span></h5>
            <h5 className='d-flex justify-content-between'>Gastos de envío : <span>{formatPrice(shipping_fee)}</span></h5>
            <h4 className='d-flex justify-content-between fw-bold'>Total : <span className='fw-bold'>{formatPrice(total_amount + shipping_fee)}</span></h4>
            <hr />
            {myUser ? <Link to='/checkout' className='btn btn-primary w-100'>Pagar</Link> :
              <Link to='/login' className='btn btn-primary w-100'>Iniciar sesión</Link>}
          </section>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
    min-height: calc(100vh - (10vh + 10rem));

    .columns {
      display: none;
    }

    .imagen {
      min-width: 150px;
      text-align: center;
    }

    .borrar {
      min-width: 1.5rem;
      min-height: 1.5rem;
    }

    .totals {
      border: 1px solid #bcccdc;
    }

    @media (min-width: 992px) {
      .columns {
        display: flex;
      }
    }
`

export default CartPage