import React from 'react'
import logo from '../assets/logo-no-background.svg'
import { useUserContext } from '../context/user_context'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import profile from '../assets/profile-default.png'

const Navbar = () => {
  const { myUser } = useUserContext();

  return (
    <Wrapper>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">
            <img src={logo} alt="Technify Logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between align-items-lg-center" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/products' className="nav-link">Productos</Link>
              </li>
              <li className="nav-item d-md-none">
                <Link to='/dashboard' className="nav-link">Mi perfil</Link>
              </li>
              <li className="nav-item d-md-none">
                <Link to='/cart' className="nav-link">Carrito</Link>
              </li>
              {myUser && myUser.role === 'admin' && <li className='nav-item d-md-none'>
                <Link to='/admin' className='nav-link' >Panel de administrador</Link>
              </li>}
              {myUser && <li className='nav-item d-md-none'>
                <Link to='/logout' className='nav-link'>Cerrar sesión</Link>
              </li>}
            </ul>
            <div className='d-flex flex-column flex-md-row justify-content-md-center'>
              {myUser ? <div className="dropdown d-none d-md-block">
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={profile} alt="profile" className='profile-img' />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/dashboard" className='dropdown-item'>Mi Perfil</Link>
                  </li>
                  <li>
                    <Link to="/cart" className='dropdown-item'>Carrito</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  {myUser && myUser.role === 'admin' && <li>
                    <Link to='/admin' className='dropdown-item' >Panel de administrador</Link>
                  </li>}
                  <li>
                    <Link to='/logout' className='dropdown-item'>Cerrar sesión</Link>
                  </li>
                </ul>
              </div>
                : <>
                  <button className="btn btn-outline-primary me-0 me-md-2 mb-2 mb-md-0">
                    <Link to='/register' className="nav-link">Registro</Link>
                  </button>
                  <button className="btn btn-primary">
                    <Link to='/login' className="nav-link">Login</Link>
                  </button>
                </>}
            </div>
          </div>
        </div>
      </nav>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .navbar-brand img {
    max-height: 3rem;
  }

  .profile-img {
    max-width: 30px;
  }
`

export default Navbar