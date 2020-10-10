import React from 'react'
import PropTypes from 'prop-types'

function ImagePopup ({ card, isOpen, onClose }) {
  function getImagePopupClasses () {
    const classes = ['popup popup_opacity_low popup_lightbox']
    if (isOpen) classes.push('popup_opened')
    return classes.join(' ')
  }

  return (
    <div className={getImagePopupClasses()}>
      <div className="popup__lightbox-wrapper">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          className="popup__lightbox-photo"
          src={card.link} alt={`Фотография места ${card.name}`}
        />
        <p className="popup__lightbox-label">{card.name}</p>
      </div>
    </div>
  )
}

ImagePopup.propTypes = {
  card: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default ImagePopup
