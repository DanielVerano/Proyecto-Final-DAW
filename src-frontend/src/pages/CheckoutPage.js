import React from 'react'
import styled from 'styled-components'
import { Breadcrumb, StripeCheckout } from '../components'

const CheckoutPage = () => {
    return (
        <>
            <Breadcrumb title='Checkout' />
            <Wrapper className='d-flex justify-content-center align-items-center'>
                <StripeCheckout />
            </Wrapper>
        </>
    )
}

const Wrapper = styled.section`
    min-height: calc(100vh - (10vh + 10rem));
`

export default CheckoutPage