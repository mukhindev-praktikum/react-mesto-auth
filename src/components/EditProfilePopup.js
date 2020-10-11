import React from 'react'
import PropTypes from 'prop-types'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    // Прерываем, если в currentUser нет данных
    if ((!Object.keys(currentUser).length)) return
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  function handleSubmit (e) {
    e.preventDefault()
    onUpdateUser({ name, about: description })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="popup__input popup__input_value_profile-name"
        name="popupInputProfileName"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        pattern="[А-ЯЁа-яёA-Za-z-\s]*"
      />
      <span id="profile-name-error" className="popup__error" />
      <input
        id="profile-about"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="popup__input popup__input_value_profile-about"
        name="popupInputProfileAbout"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span id="profile-about-error" className="popup__error" />
      <button type="submit" className="popup__save-button">Сохранить</button>
    </PopupWithForm>
  )
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateUser: PropTypes.func
}

export default EditProfilePopup
