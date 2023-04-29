import React, { useEffect } from 'react'
import { useUserContext } from '../context/user_context'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LogoutPage = () => {
    const { myUser, setMyUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (myUser) {
            setMyUser(null);
            localStorage.removeItem('user');
        }

        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, []);

    return (
        <Wrapper className='d-flex justify-content-center align-items-center'>
            <h1 className='text-center'>Cerrando sesión...</h1>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    min-height: calc(100vh - (10vh + 8rem));
`

export default LogoutPage