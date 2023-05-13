import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/user_context'
import { Breadcrumb } from '../components'
import styled from 'styled-components'
import profile_pic from '../assets/profile-default.png'
import axios from 'axios'
import { apiUrl as url } from '../utils/constants'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const { myUser: { userId, token } } = useUserContext();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${url}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleChange = (e) => {
    const tag = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [tag]: value });
  }

  const updateProfile = async () => {
    try {
      const response = await axios.post(
        `${url}/users/updateUser`,
        JSON.stringify(user),
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Breadcrumb title='Dashboard' />
      <Wrapper className='d-flex flex-wrap align-items-center p-3'>
        <div className="col-12 col-md-6 text-center p-3">
          <img src={profile_pic} alt="profile_pic" className='img-fluid' />
          <div className='my-3'>
            <button className="btn btn-warning">Editar Avatar</button>
          </div>
        </div>
        <div className=" col-12 col-md-6 p-3">
          <div className="mb-3">
            <label htmlFor="name" className='form-label fs-4'>Nombre</label>
            <input type="text" name="name" className='form-control' value={user.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className='form-label fs-4'>Apellidos</label>
            <input type="text" name="apellidos" className='form-control' value={user.surname} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className='form-label fs-4'>Email</label>
            <input type="email" name="email" className='form-control' value={user.email} onChange={handleChange} />
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={updateProfile}>Actualizar Perfil</button>
          <Link to='/editPassword' className="btn btn-danger w-100 mb-3">Actualizar Contraseña</Link>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  min-height: calc(100vh - (10vh + 8rem));
`

export default DashboardPage