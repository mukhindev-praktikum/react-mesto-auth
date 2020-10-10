import React from 'react'
import imageLogo from '../images/header/__logo.svg'

function Header () {
  return (
    <header className="header">
      <a className="header__link-home" href="/" title="На главную страницу">
        <img className="header__logo" src={imageLogo} alt="Место" />
      </a>
    </header>
  )
}

export default Header
