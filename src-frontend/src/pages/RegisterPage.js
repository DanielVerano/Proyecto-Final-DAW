import React, { useEffect, useState } from 'react'
import { Breadcrumb } from '../components'
import { useUserContext } from '../context/user_context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils/constants'
import styled from 'styled-components';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { myUser, setMyUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const user = { name, surname, email, password };

    try {
      const { data } = await axios.post(
        `${apiUrl}/auth/register`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": 'application/json'
          }
        }
      );

      const { payloadUser, token } = data;
      const { name, userId, role } = payloadUser;
      setMyUser({ name, userId, role, token });
      localStorage.setItem('user', JSON.stringify({ name, userId, role, token }));

      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setErrorMsg(error.response.data.msg);
    }
  }

  useEffect(() => {
    if (myUser) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [myUser]);

  return (
    <>
      <Breadcrumb title='Registro' />
      <Wrapper className='w-100 d-flex flex-column align-items-center justify-content-center'>
        <h2 className='text-center'>Registro</h2>
        <form className='w-100' style={{ maxWidth: '22rem' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className='form-label' htmlFor="name">Nombre:</label>
            <input className="form-control"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className='form-label' htmlFor="surname">Apellidos:</label>
            <input className="form-control"
              type="text"
              name="surname"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className='form-label' htmlFor="email">Email:</label>
            <input className="form-control"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className='form-label' htmlFor="password">Contraseña:</label>
            <input className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mb-3">
            {isLoading ? <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
              : <button type="submit" className="btn btn-primary w-100">Enviar</button>}
          </div>
          {error && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
        </form>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  min-height: calc(100vh - (10vh + 10rem));
`

export default RegisterPage