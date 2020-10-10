import React from 'react'
import PropTypes from 'prop-types'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef()

  function handleSubmit (e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: inputRef.current.value
    })
    inputRef.current.value = ''
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-avatar"
        className="popup__input popup__input_value_profile-avatar"
        name="popupInputAvatarPhoto"
        type="url"
        placeholder="Ссылка на картинку"
        required
        ref={inputRef}
      />
      <span id="profile-avatar-error" className="popup__error" />
      <button
        type="submit"
        className="popup__save-button"
      >
        Сохранить
      </button>
    </PopupWithForm>
  )
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateAvatar: PropTypes.func
}

export default EditAvatarPopup
