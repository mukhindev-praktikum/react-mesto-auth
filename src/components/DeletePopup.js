import React from 'react'
import PropTypes from 'prop-types'
import PopupWithForm from './PopupWithForm'

function DeletePopup ({ card, isOpen, onClose, onDelete }) {
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      isOpen={isOpen}
      onClose={onClose}
    >
      <button
        type="button"
        onClick={() => onDelete(card)}
        className="popup__save-button"
      >
        Да
      </button>
    </PopupWithForm>
  )
}

DeletePopup.propTypes = {
  card: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
}

export default DeletePopup
