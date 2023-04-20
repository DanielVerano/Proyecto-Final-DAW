import React, { useEffect } from 'react'
import { useUserContext } from '../context/user_context'
import { useNavigate } from 'react-router-dom'

const LogoutPage = () => {
    const { setMyUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        setMyUser(null);
        localStorage.removeItem('user');

        setTimeout(() => {
            navigate('/');
        }, 2000);
    }, []);

    return (
        <h1 className='text-center'>Cerrando sesión...</h1>
    )
}

export default LogoutPage