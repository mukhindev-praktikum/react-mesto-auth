import React from 'react'
import PropTypes from 'prop-types'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {
  const { _id: userId } = React.useContext(CurrentUserContext)
  const isOwn = card.owner === userId
  const isLiked = card.likes.some(el => el === userId)
  const numberOfLikes = card.likes.length

  function getlikeClasses () {
    const classes = ['place__like']
    if (isLiked) classes.push('place__like_active')
    return classes.join(' ')
  }

  return (
    <article className="place">
      <div className="place__photo-square-container">
        <img
          className="place__photo"
          src={card.link}
          alt={`Фотография места ${card.name}`}
          onClick={() => onCardClick(card)}
        />
      </div>
      <div className="place__panel">
        <h3 className="place__name">{card.name}</h3>
        <div className="place__like-group">
          <button
            type="button"
            className={getlikeClasses()}
            title="Мне нравится"
            onClick={() => onCardLike(card)}
          />
          <span className="place__like-counter">{numberOfLikes}</span>
        </div>
      </div>
      {isOwn
        ? <button
          className="place__delete-button"
          onClick={() => onCardDelete(card)}
          title="Удалить"
        />
        : null}
    </article>
  )
}

Card.propTypes = {
  card: PropTypes.object,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func
}

export default Card
