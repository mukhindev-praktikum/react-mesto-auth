import React from 'react'
import PropTypes from 'prop-types'
import imageNoAvatar from '../images/profile/__avatar.png'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main ({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const { avatar, name, about } = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-edit"
          onClick={onEditAvatar}
          title="Сменить аватар"
        >
          <img className="profile__avatar" src={avatar || imageNoAvatar} alt={`Аватар пользователя ${name}`} />
        </button>
        <div className="profile__info">
          <div className="profile__name-container">
            <h2 className="profile__name">{name}</h2>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
              title="Редактировать"
            />
          </div>
          <p className="profile__about">{about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
          title="Добавить"
        />
      </section>
      <section className="places" aria-label="Места">
        {cards.map((card) =>
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        )}
      </section>
    </main>
  )
}

Main.propTypes = {
  cards: PropTypes.array,
  onEditAvatar: PropTypes.func,
  onEditProfile: PropTypes.func,
  onAddPlace: PropTypes.func,
  onCardClick: PropTypes.func,
  onSetCards: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func
}

export default Main
