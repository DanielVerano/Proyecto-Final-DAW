import React from 'react'
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import logo from '../assets/logo-footer.svg'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <div className='container-fluid d-flex justify-content-evenly align-items-center bg-dark text-light text-center'>
        <div className="col">
          <span>Síguenos en</span>
          <p className='redes-sociales'>
            <a href="https://facebook.com"><BsFacebook /></a>
            <a href="https://twitter.com"><BsTwitter /></a>
            <a href="https://instagram.com"><BsInstagram /></a>
          </p>
        </div>
        <div className="col">
          <img src={logo} alt="Technify Logo" className='logo' />
        </div>
        <div className="col">
          <span>Métodos de pago</span>
          <p>
            <FaCcVisa />
            <FaCcMastercard />
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
    div.container-fluid {
        height: 10rem;
    }

    .redes-sociales a {
      color: inherit;
    }

    svg {
      height: 1.5rem;
      width: 2rem;
    }

    .logo {
      max-height: 3rem;
    }
`

export default Footer