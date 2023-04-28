import React from 'react'
import { useUserContext } from "../context/user_context";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { myUser } = useUserContext();

    if (!myUser) {
        return (
            <Wrapper className='d-flex justify-content-center align-items-center'>
                <div className='text-center'>
                    <h2>No tiene permiso para acceder a esta ruta.</h2>
                    <Link to='/' className='btn btn-primary'>Volver al inicio</Link>
                </div>
            </Wrapper>
        )
    }

    return children;
}

const Wrapper = styled.div`
    min-height: calc(100vh - (10vh + 8rem));
`

export default ProtectedRoute