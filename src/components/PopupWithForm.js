import React from 'react'
import PropTypes from 'prop-types'

function PopupWithForm ({ children, name, title, isOpen, onClose, onSubmit }) {
  function getPopupWithFormClasses () {
    const classes = [`popup popup_${name}`]
    if (isOpen) classes.push('popup_opened')
    return classes.join(' ')
  }

  return (
    <div className={getPopupWithFormClasses()}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          action="#"
          noValidate
        >
          {children}
        </form>
      </div>
    </div>
  )
}

PopupWithForm.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
}

export default PopupWithForm
