import React from 'react'
import PropTypes from 'prop-types'
import PopupWithForm from './PopupWithForm'

function InfoTooltip ({ isOpen, onClose, message, icon }) {
  return (
    <PopupWithForm
      name="message"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={`popup__info-icon-${icon}`} />
      <p className="popup__info-text">
        {message}
      </p>
    </PopupWithForm>
  )
}

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  icon: PropTypes.string,
  message: PropTypes.string
}

export default InfoTooltip
