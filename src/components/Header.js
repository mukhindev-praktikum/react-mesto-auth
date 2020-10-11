import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useHistory } from 'react-router-dom'
import imageLogo from '../images/header/__logo.svg'

function Header ({ email, onLogout }) {
  const { pathname } = useLocation()
  const history = useHistory()

  const authButtons = [
    { from: '/sign-in', to: '/sign-up', text: 'Регистрация' },
    { from: '/sign-up', to: '/sign-in', text: 'Войти' }
  ]

  function getButtonJsx (buttons, from) {
    const button = buttons.find((el) => el.from === from)
    if (!button) return null
    return (
      <button
        className="header__auth-button"
        type="button"
        onClick={() => history.push(button.to)}
      >
        {button.text}
      </button>
    )
  }

  return (
    <header className="header">
      <Link className="header__link-home" to="/" title="На главную страницу">
        <img className="header__logo" src={imageLogo} alt="Место" />
      </Link>
      { email
        ? (
          <div className="header__auth">
            <span className="header__auth-email">{email}</span>
            <button
              className="header__auth-button header__auth-button_color_gray"
              type="button"
              onClick={onLogout}
            >
              Выход
            </button>
          </div>
        )
        : getButtonJsx(authButtons, pathname)
      }
    </header>
  )
}

Header.propTypes = {
  email: PropTypes.string,
  onLogout: PropTypes.func
}

export default Header
