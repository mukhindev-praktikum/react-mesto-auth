import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Register ({ onRegister }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit (e) {
    e.preventDefault()
    onRegister({ email, password })
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        name="registerForm"
        onSubmit={handleSubmit}
        action="#"
        noValidate
      >
        <input
          className="auth__input"
          id="register-email"
          name="registerEmail"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          minLength="2"
          maxLength="40"
        />
        <input
          className="auth__input"
          id="register-password"
          name="registerPassword"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          minLength="2"
          maxLength="40"
        />
        <button className="auth__button-submit" type="submit">Зарегистрироваться</button>
        <p className="auth__question">Уже зарегистрированы? <Link className="auth__question-link" to="/sign-in">Войти</Link></p>
      </form>
    </div>
  )
}

Register.propTypes = {
  onRegister: PropTypes.func
}

export default Register
