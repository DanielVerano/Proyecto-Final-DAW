import React from 'react'
import styled from 'styled-components'
import { Breadcrumb, Filters, ProductList } from "../components";

const ProductsPage = () => {
    return (
        <main>
            <Breadcrumb title='Products' />
            <Wrapper className='min-vh-100'>
                <div className='d-flex w-100 my-3 mx-auto'>
                    <div className="col-lg-3" >
                        <Filters />
                    </div>
                    <div className="col-lg-9">
                        <ProductList />
                    </div>
                </div>
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`
    
`

export default ProductsPage