import React from "react"
import "./MoviesCard.css"
import { durationTransformer } from "../../utils/utils"

function MoviesCard({
  card,
  isSavedFilms,
  handleLikeFilm,
  onDeleteCard,
  saved,
  savedMovies,
}) {

  // клик по фильму
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  // удалить фильм
  function onDelete() {
    onDeleteCard(card)
  }

  // класс лайка
  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"}`

  return (
    <>
      <li key={card.id} className="card">
        <div className="card__title-block">
          <h2 className="card__title">{card.nameRU}</h2>
          <span className="card__duration">{" "}
              {durationTransformer(card.duration)}</span>
        </div>
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" 
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }/>
            </a>
        <div className="card__container">
        {isSavedFilms ? (
            <button
              type="button"
              className="card__button-delete"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
            )}
            </div>
      </li>

    </>
  )
}

export default MoviesCard
