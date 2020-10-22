import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import api from '../api'
import Header from './Header'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import Main from './Main'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import DeletePopup from './DeletePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App () {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [pendingDeletion, setPendingDeletion] = React.useState({ card: {}, isOpen: false })
  const [selectedCard, setSelectedCard] = React.useState({ card: {}, isOpen: false })
  const [currentUser, setCurrentUser] = React.useState({})
  const [userEmail, setUserEmail] = React.useState('')
  const [cards, setCards] = React.useState([])
  const [infoTooltip, setInfoTooltip] = React.useState({ message: '', icon: '', isOpen: false })

  const history = useHistory()

  function handleError (error) {
    console.error(error)
  }

  useEffect(() => {
    checkToken()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getMe({ token: localStorage.token }), api.getCards({ token: localStorage.token })])
        .then(([{ data: user }, { data: cardsFromServer }]) => {
          setCurrentUser(user)
          setCards(cardsFromServer.reverse())
        })
        .catch(handleError)
    }
  }, [loggedIn])

  function checkToken () {
    if (localStorage.token) {
      api.getMe({ token: localStorage.token })
        .then((res) => {
          if (res.data) {
            setLoggedIn(true)
            setUserEmail(res.data.email)
            history.push('/')
          } else {
            localStorage.removeItem('token')
            setLoggedIn(false)
            setCurrentUser({})
            setUserEmail('')
          }
        })
    }
  }

  function handleLogout () {
    localStorage.removeItem('token')
    setLoggedIn(false)
    setCurrentUser({})
    setUserEmail('')
  }

  function handleLogin ({ email, password }) {
    api.signin({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          setLoggedIn(true)
          checkToken()
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setInfoTooltip({ message: 'Некорректно заполнено одно из полей', icon: 'cross', isOpen: true })
        } else if (err.status === 401) {
          setInfoTooltip({ message: 'Неверный логин или пароль', icon: 'cross', isOpen: true })
        } else {
          setInfoTooltip({ message: 'Что-то пошло не так! Попробуйте ещё раз', icon: 'cross', isOpen: true })
        }
      })
  }

  function handleRegister ({ email, password }) {
    api.signup({ email, password })
      .then((res) => {
        if (res.data) {
          setInfoTooltip({ message: 'Вы успешно зарегистрировались!', icon: 'check', isOpen: true })
          history.push('/login')
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setInfoTooltip({ message: 'Некорректно заполнено одно из полей', icon: 'cross', isOpen: true })
        } else if (err.status === 403) {
          setInfoTooltip({ message: 'Вы уже зарегистрированы', icon: 'cross', isOpen: true })
        } else {
          setInfoTooltip({ message: 'Что-то пошло не так! Попробуйте ещё раз', icon: 'cross', isOpen: true })
        }
      })
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard({ card, isOpen: true })
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setPendingDeletion({ card: {}, isOpen: false })
    setSelectedCard({ ...selectedCard, isOpen: false })
    setInfoTooltip({ ...infoTooltip, isOpen: false })
  }

  function handleSetCards (updatedCards) {
    setCards(updatedCards)
  }

  function handleUpdateUser ({ name, about }) {
    api.updateMe({ token: localStorage.token, name, about })
      .then(() => {
        setCurrentUser({ ...currentUser, name, about })
        setIsEditProfilePopupOpen(false)
      })
      .catch(handleError)
  }

  function handleUpdateAvatar ({ avatar }) {
    api.updateAvatar({ token: localStorage.token, avatar })
      .then(() => {
        setCurrentUser({ ...currentUser, avatar })
        setIsEditAvatarPopupOpen(false)
      })
      .catch(handleError)
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(el => el === currentUser._id)

    function handleResponseCardLike ({ data: newCard }) {
      const newCards = cards.map(el => el._id === card._id ? newCard : el)
      setCards(newCards)
    }

    if (!isLiked) {
      api.likeCard({ token: localStorage.token, cardId: card._id })
        .then(handleResponseCardLike)
        .catch(handleError)
    } else {
      api.dislikeCard({ token: localStorage.token, cardId: card._id })
        .then(handleResponseCardLike)
        .catch(handleError)
    }
  }

  function handleRequestDelete (card) {
    setPendingDeletion({ card, isOpen: true })
  }

  function handleCardDelete (card) {
    api.deleteCard({ token: localStorage.token, cardId: card._id })
      .then(() => {
        const newCards = cards.filter(el => el._id !== card._id)
        setCards(newCards)
        setPendingDeletion({ card: {}, isOpen: false })
      })
      .catch(handleError)
  }

  function handleAddPlaceSubmit ({ name, link }) {
    api.createCard({ token: localStorage.token, name, link })
      .then(({ data: newCard }) => {
        setCards([newCard, ...cards])
        setIsAddPlacePopupOpen(false)
      })
      .catch(handleError)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          onLogout={handleLogout}
        />
        <Switch>
          <Route path="/sign-in" exact>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up" exact>
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onSetCards={handleSetCards}
            onCardLike={handleCardLike}
            onCardDelete={handleRequestDelete}
          />
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard.card}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
        />
        <DeletePopup
          card={pendingDeletion.card}
          isOpen={pendingDeletion.isOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
        />
        <InfoTooltip
          message={infoTooltip.message}
          icon={infoTooltip.icon}
          isOpen={infoTooltip.isOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
