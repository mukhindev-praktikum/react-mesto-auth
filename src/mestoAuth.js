export const BASE_URL = 'https://auth.nomoreparties.co'

export const signup = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .catch((err) => console.log(err))
}

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        return data
      } else {
        return data
      }
    })
    .catch(err => console.log(err))
}

export const getMe = ({ token }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch((err) => console.log(err))
}
