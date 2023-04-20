import React from 'react'
import logo from '../assets/logo-no-background.svg'
import { useUserContext } from '../context/user_context'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Navbar = () => {
  const { myUser } = useUserContext();

  return (
    <Wrapper>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">
            <img src={logo} alt="Technify Logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/dashboard' className="nav-link">Mi perfil</Link>
              </li>
              <li className="nav-item">
                <Link to='/products' className="nav-link">Productos</Link>
              </li>
              <li className="nav-item">
                <Link to='/cart' className="nav-link">Carrito</Link>
              </li>
            </ul>
            <div className='d-flex justify-content-center'>
              {!myUser && <button className="btn btn-outline-primary mx-2">
                <Link to='/register' className="nav-link">Registro</Link>
              </button>}
              {myUser && myUser.role === 'admin' && <button className='btn btn-warning mx-2'>
                <Link to='/admin' className='nav-link' >Panel de administrador</Link>
              </button>}
              {myUser ? <button className="btn btn-primary">
                <Link to='/logout' className="nav-link">Cerrar sesión</Link>
              </button>
                : <button className="btn btn-primary">
                  <Link to='/login' className="nav-link">Login</Link>
                </button>}
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
  div.collapse {
    justify-content: space-between;

    ul {
      align-items: center;
    }
  }
`

export default Navbar