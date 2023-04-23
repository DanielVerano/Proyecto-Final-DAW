import React from 'react'
import styled from 'styled-components'

const Breadcrumb = ({ title, productName }) => {
  return (
    <Wrapper className='d-flex align-items-center py-2 px-3' aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">Home</li>
        {title && <li className="breadcrumb-item active" aria-current="page">{title}</li>}
        {productName && <li className="breadcrumb-item">{productName}</li>}
      </ol>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background: rgb(255, 223, 205);
`

export default Breadcrumb