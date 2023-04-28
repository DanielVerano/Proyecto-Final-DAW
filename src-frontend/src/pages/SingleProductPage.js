import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { Breadcrumb, Loading, Error, Stars, AddToCart } from "../components";
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'

const SingleProductPage = () => {
  const { productId } = useParams();
  const { single_product, single_product_loading: loading, single_product_error: error, fetchSingleProduct } = useProductsContext();
  const { name, price, image, description, stock, category, numOfReviews, averageRating } = single_product;

  useEffect(() => {
    fetchSingleProduct(productId);
  }, [productId]);

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <>
      <Breadcrumb title='Productos' productName={name} />
      <Wrapper className='container py-5'>
        <Link to="/products" className='btn btn-primary'>Volver atrás</Link>
        <div className="d-flex my-3 flex-wrap">
          <div className="image col-md-6 p-2">
            <img src={image} alt={name} className='img-fluid' />
          </div>
          <div className="col-md-6 p-2">
            <h2>{name}</h2>
            <Stars reviews={numOfReviews} rating={averageRating} />
            <span className='price fw-bold mb-2'>{formatPrice(price)}</span>
            <p>{description}</p>
            <p>
              <span className='fw-bold'>Disponibilidad : </span>
              {stock > 1 ?
                <span className='fw-bold disponible'>En Stock</span> :
                <span className='fw-bold no-disponible'>Fuera de Stock</span>
              }
            </p>
            <p>
              <span className="fw-bold">Código : </span>
              <span>{productId}</span>
            </p>
            <p>
              <span className="fw-bold">Categoría : </span>
              <span>{category}</span>
            </p>
            <hr />
            {stock > 0 && <AddToCart product={single_product} />}
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  min-height: calc(100vh - 10rem);

  .price {
    color: #ab7a5f;
    font-size: 1.5rem;
  }

  .disponible {
    color: green;
  }

  .no-disponible {
    color: red;
  }
`

export default SingleProductPage