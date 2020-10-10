import React from 'react'
import PropTypes from 'prop-types'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleSubmit (e) {
    e.preventDefault()
    onAddPlace({ name, link })
    setName('')
    setLink('')
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="popup__input popup__input_value_place-name"
        name="popupInputPlaceName"
        type="text"
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
      />
      <span id="place-name-error" className="popup__error" />
      <input
        id="place-photo"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="popup__input popup__input_value_place-photo"
        name="popupInputPlacePhoto"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="place-photo-error" className="popup__error" />
      <button type="submit" className="popup__save-button">Создать</button>
    </PopupWithForm>
  )
}

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAddPlace: PropTypes.func
}

export default AddPlacePopup
