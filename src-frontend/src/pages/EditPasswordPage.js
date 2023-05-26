import React, { useState } from 'react'
import { useUserContext } from '../context/user_context'
import { Breadcrumb } from '../components'
import styled from 'styled-components'
import axios from 'axios'
import { apiUrl as url } from '../utils/constants'

const EditPasswordPage = () => {
  const { myUser: { token } } = useUserContext();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.patch(
        `${url}/users/updatePassword`,
        JSON.stringify({ oldPassword, newPassword }),
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      setSuccess(true);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setError(error.response);
    }
  }

  return (
    <>
      <Breadcrumb title='Edit Password' />
      <Wrapper className='w-100 d-flex flex-column align-items-center justify-content-center'>
        <h2 className='text-center'>Cambiar contraseña</h2>
        <form className='w-100' style={{ maxWidth: '22rem' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className='form-label' htmlFor="oldPassword">Contraseña actual:</label>
            <input className="form-control"
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className='form-label' htmlFor="newPassword">Nueva contraseña:</label>
            <input className="form-control"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <button type='submit' className="btn btn-danger w-100 mb-3">Actualizar contraseña</button>
          {/* Error */}
          {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}
          {/* Success */}
          {success && <div className='alert alert-success text-center' role='alert'>Contraseña actualizada</div>}
        </form>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  min-height: calc(100vh - (10vh + 10rem));
`

export default EditPasswordPage