import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/user_context'
import { Breadcrumb } from '../components'
import styled from 'styled-components'
import axios from 'axios'
import { apiUrl as url } from '../utils/constants'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const { myUser: { userId, token }, setMyUser } = useUserContext();
  const [user, setUser] = useState({ name: '', surname: '', email: '', avatar: '' });
  const [image, setImage] = useState(null);

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
      const { name, surname, email, avatar } = response.data;
      setUser({ name, surname, email, avatar });
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
      const response = await axios.patch(
        `${url}/users/updateUser`,
        JSON.stringify(user),
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      setMyUser(response.data.user);
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleSelectFile = (e) => {
    const image = e.target.files[0];
    if (image.type.startsWith('image')) {
      setImage(image);
    }
  }

  const handleUpload = async (e) => {
    const data = new FormData();
    data.set('image', image);
    try {
      // 1era petición: Subir imagen a Cloudinary
      const res = await axios.post(`${url}/users/upload`, data);
      // 2nda petición: Actualizar avatar del usuario
      const res2 = await axios.patch(
        `${url}/users/updateAvatar`,
        JSON.stringify({ ...user, avatar: res.data.secure_url }),
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      const { name, surname, email, avatar } = res2.data;
      setUser({ name, surname, email, avatar });
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
          <img src={user.avatar} alt="profile_pic" className='img-fluid avatar' />
          <div className='my-3'>
            <input type="file" name="image" id="image" onChange={handleSelectFile} multiple={false} accept='image/*' />
            {image && <button className="btn btn-warning my-2" onClick={handleUpload}>Editar Avatar</button>}
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