import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Login ({ onLogin }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit (e) {
    e.preventDefault()
    onLogin({ email, password })
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        className="auth__form"
        name="loginForm"
        onSubmit={handleSubmit}
        action="#"
        noValidate
      >
        <input
          className="auth__input"
          id="login-email"
          name="loginEmail"
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
          id="login-password"
          name="loginPassword"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          minLength="2"
          maxLength="40"
        />
        <button className="auth__button-submit" type="submit">Войти</button>
        <p className="auth__question">Ещё не зарегистрированы? <Link className="auth__question-link" to="/sign-up">Регистрация</Link></p>
      </form>
    </div>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func
}

export default Login
