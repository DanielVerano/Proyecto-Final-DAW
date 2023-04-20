import React, { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../utils/constants'
import { useUserContext } from '../context/user_context'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb } from '../components'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { myUser, setMyUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    const user = { email, password };
    login(user);
  }

  const login = async (user) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/auth/login`,
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

      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1000);
    } catch (error) {
      // console.log(error.response);
      setIsLoading(false);
      setError(true);
      setErrorMsg(error.response.data.msg);
    }
  }

  if (myUser) {
    navigate('/dashboard');
  }

  return (
    <>
      <Breadcrumb title='Login' />
      <section className='w-100 d-flex flex-column align-items-center justify-content-center' style={{ minHeight: `calc(100vh - (20vh + 10rem))` }}>
        <h2 className='text-center'>Login</h2>
        <form className='w-100' style={{ maxWidth: '22rem' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className='form-label' htmlFor="email">Email</label>
            <input className="form-control"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className='form-label' htmlFor="password">Contraseña</label>
            <input className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="d-grid gap-2 mb-3">
            {isLoading ?
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              : <button type="submit" className="btn btn-primary btn-block">Login</button>}
          </div>
          {error && <div className="alert alert-danger my-2" role="alert">{errorMsg}</div>}
        </form>
      </section>
    </>
  );
}

export default LoginPage