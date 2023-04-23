import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const Stars = ({ rating, reviews }) => {
  const calcStars = Array.from({ length: 5 }, (_, index) => {
    return <span key={index}>
      {rating >= index + 1 ? <BsStarFill /> : rating >= index + 0.5 ? <BsStarHalf /> : <BsStar />}
    </span>
  })

  return (
    <Wrapper className='d-flex align-items-center mb-2'>
      <div className="stars">
        {calcStars}
      </div>
      <div className="reviews">
        ({reviews} valoraciones)
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .stars {
    margin-right: 0.5rem;
  }

  span {
    color: rgb(255,185,0);
    margin-right: 0.25rem;
  }
`

export default Stars