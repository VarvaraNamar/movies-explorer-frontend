import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./MoviesCardList.css"
import SearchError from "../SearchError/SearchError"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../Preloader/Preloader"

import {
  MOVIES_FOR_DESKTOP,
  MOVIES_FOR_TABLET,
  MOVIES_FOR_MOBILE,
} from "../../utils/constants"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isRequestError,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {

  const [amountOfMovies, setAmountOfMovies] = useState(0)
  const { pathname } = useLocation()

//количество карточек от разрешения
  function findMoviesAmount() {
    const display = window.innerWidth
    if (display > 1150) {
      setAmountOfMovies(12)
    } else if (display > 760) {
      setAmountOfMovies(8)
    } else {
      setAmountOfMovies(5)
    }
  }

// увеличивает количество фильмов по кнопке "Ещё"
  function increaseMoviesAmount() {
    const display = window.innerWidth
    if (display > 1150) {
      setAmountOfMovies(amountOfMovies + MOVIES_FOR_DESKTOP)
    } else if (display > 760) {
      setAmountOfMovies(amountOfMovies + MOVIES_FOR_TABLET)
    } else {
      setAmountOfMovies(amountOfMovies + MOVIES_FOR_MOBILE)
    }
  }

  useEffect(() => {
    let resizeTimeout

    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        findMoviesAmount()
      }, 500)
    }

  findMoviesAmount()

  window.addEventListener("resize", handleResize)

  return () => {
    clearTimeout(resizeTimeout)
    window.removeEventListener("resize", handleResize)
    }
  }, [])

  function findSavedMovie(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isRequestError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isRequestError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard 
                    key={isSavedFilms ? card._id : card.id}
                    card={card}
                    cards={cards}
                    saved={findSavedMovie(savedMovies, card)}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container"></div>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, amountOfMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    card={card}
                    cards={cards}
                    saved={findSavedMovie(savedMovies, card)}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {cards.length > amountOfMovies ? (
                  <button
                    className="cards__button"
                    onClick={increaseMoviesAmount}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
