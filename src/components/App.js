import React, { useEffect } from 'react'
import api from '../utils/api'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import DeletePopup from './DeletePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App () {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [pendingDeletion, setPendingDeletion] = React.useState({ card: {}, isOpen: false })
  const [selectedCard, setSelectedCard] = React.useState({ card: {}, isOpen: false })
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  function handleError (error) {
    console.error(error)
  }

  useEffect(() => {
    Promise.all([api.getMe(), api.getCards()])
      .then(([user, cardsFromServer]) => {
        setCurrentUser(user)
        setCards(cardsFromServer)
      })
      .catch(handleError)
  }, [])

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
  }

  function handleSetCards (updatedCards) {
    setCards(updatedCards)
  }

  function handleUpdateUser ({ name, about }) {
    api.updateMe({ name, about })
      .then(() => {
        setCurrentUser({ ...currentUser, name, about })
        setIsEditProfilePopupOpen(false)
      })
      .catch(handleError)
  }

  function handleUpdateAvatar ({ avatar }) {
    api.updateAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar })
        setIsEditAvatarPopupOpen(false)
      })
      .catch(handleError)
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(el => el._id === currentUser._id)

    function handleResponseCardLike (newCard) {
      const newCards = cards.map(el => el._id === card._id ? newCard : el)
      setCards(newCards)
    }

    if (!isLiked) {
      api.likeCard(card._id)
        .then(handleResponseCardLike)
        .catch(handleError)
    } else {
      api.dislikeCard(card._id)
        .then(handleResponseCardLike)
        .catch(handleError)
    }
  }

  function handleRequestDelete (card) {
    setPendingDeletion({ card, isOpen: true })
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(el => el._id !== card._id)
        setCards(newCards)
        setPendingDeletion({ card: {}, isOpen: false })
      })
      .catch(handleError)
  }

  function handleAddPlaceSubmit ({ name, link }) {
    api.createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        setIsAddPlacePopupOpen(false)
      })
      .catch(handleError)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onSetCards={handleSetCards}
          onCardLike={handleCardLike}
          onCardDelete={handleRequestDelete}
          cards={cards}
        />
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
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
