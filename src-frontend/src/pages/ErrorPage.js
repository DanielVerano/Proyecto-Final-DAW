import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <Wrapper className='d-flex justify-content-center align-items-center'>
            <div className='text-center'>
                <h2>Error 404</h2>
                <p>Página no encontrada</p>
                <Link to='/' className='btn btn-primary'>Volver al inicio</Link>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-height: calc(100vh - (10vh + 8rem));
`

export default ErrorPage