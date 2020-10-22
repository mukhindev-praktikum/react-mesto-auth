const { REACT_APP_API_HOST } = process.env

function handleResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}

const signup = ({ email, password }) => {
  return fetch(`${REACT_APP_API_HOST}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => handleResponse(res))
}

const signin = ({ email, password }) => {
  return fetch(`${REACT_APP_API_HOST}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => handleResponse(res))
}

const getMe = ({ token }) => {
  return fetch(`${REACT_APP_API_HOST}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => handleResponse(res))
}

const updateMe = ({ token, name, about }) => {
  return fetch(`${REACT_APP_API_HOST}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, about })
  })
    .then(res => handleResponse(res))
}

const updateAvatar = ({ token, avatar }) => {
  return fetch(`${REACT_APP_API_HOST}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ avatar })
  })
    .then(res => handleResponse(res))
}

const getCards = ({ token }) => {
  return fetch(`${REACT_APP_API_HOST}/cards`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => handleResponse(res))
}

const createCard = ({ token, name, link }) => {
  return fetch(`${REACT_APP_API_HOST}/cards`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, link })
  })
    .then(res => handleResponse(res))
}

const deleteCard = ({ token, cardId }) => {
  return fetch(`${REACT_APP_API_HOST}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => handleResponse(res))
}

const likeCard = ({ token, cardId }) => {
  return fetch(`${REACT_APP_API_HOST}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => handleResponse(res))
}

const dislikeCard = ({ token, cardId }) => {
  return fetch(`${REACT_APP_API_HOST}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => handleResponse(res))
}

export default {
  signup,
  signin,
  getMe,
  updateMe,
  updateAvatar,
  likeCard,
  dislikeCard,
  getCards,
  createCard,
  deleteCard
}
