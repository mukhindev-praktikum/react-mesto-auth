import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useHistory } from 'react-router-dom'
import imageLogo from '../images/header/__logo.svg'

function Header ({ email, onLogout }) {
  const { pathname } = useLocation()
  const history = useHistory()
  const [width, setWidth] = React.useState(0)
  const [burgerActive, setBurgerActive] = React.useState(false)

  React.useEffect(() => {
    function resizeListener (e) {
      setWidth(e.target.innerWidth)
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  React.useEffect(() => {
    setWidth(window.innerWidth)
    if (width > 768) setBurgerActive(false)
  }, [width])

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

  const bugerMenuJsx = (
    <>
      <span className="header__auth-email">{email}</span>
      <button
        className="header__auth-button header__auth-button_color_gray header__auth-button_place_burger"
        type="button"
        onClick={onLogout}
      >
        Выход
      </button>
    </>
  )

  function getAuthMenuJsx (windowWidth) {
    if (windowWidth > 768) {
      return (
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
    } else {
      return (
        <div className="header__auth">
          {!burgerActive
            ? <button
              className="header__burger-button"
              type="button"
              onClick={() => setBurgerActive(true)}
              title="Показать меню"
            />
            : <button
              className="header__burger-button header__burger-button_state_close"
              type="button"
              onClick={() => setBurgerActive(false)}
              title="Скрыть меню"
            />
          }
        </div>
      )
    }
  }

  return (
    <>
      {burgerActive && email &&
        (
          <div className="header__burger-menu">{bugerMenuJsx}</div>
        )
      }
      <header className="header">
        <Link className="header__link-home" to="/" title="На главную страницу">
          <img className="header__logo" src={imageLogo} alt="Место" />
        </Link>
        { email
          ? getAuthMenuJsx(width)
          : getButtonJsx(authButtons, pathname)
        }
      </header>
    </>
  )
}

Header.propTypes = {
  email: PropTypes.string,
  onLogout: PropTypes.func
}

export default Header
