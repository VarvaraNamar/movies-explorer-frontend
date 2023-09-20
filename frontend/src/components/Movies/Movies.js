import React, { useState, useEffect } from "react"
import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { findShortMovie, filterByDuration } from "../../utils/utils"
import * as movies from "../../utils/MoviesApi"

function Movies({ handleLikeFilm, onDeleteCard, savedMovies, loggedIn }) {
  // Состояния компонента
  const [isLoading, setIsLoading] = useState(false)
  const [initialMovies, setInitialMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isShortMovies, setIsShortMovies] = useState(false)
  const [isRequestError, setIsRequestError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  // поиск фильмов
  function handleMovieSearch(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortMovies)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      handleMovieFilter(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          handleMovieFilter(cardsData, query, isShortMovies)
          setIsRequestError(false)
        })
        .catch((err) => {
          setIsRequestError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // фильтрация фильмов
  function handleMovieFilter(movies, query, short) {
    const moviesCardList = findShortMovie(movies, query, short)
    setInitialMovies(moviesCardList)
    setFilteredMovies(short ? filterByDuration(moviesCardList) : moviesCardList)
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  //короткие фильмы
  function switchToShortFilm() {
    setIsShortMovies(!isShortMovies)
    if (!isShortMovies) {
      if (filterByDuration(initialMovies).length === 0) {
        setFilteredMovies(filterByDuration(initialMovies))
      } else {
        setFilteredMovies(filterByDuration(initialMovies))
      }
    } else {
      setFilteredMovies(initialMovies)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
  }

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterByDuration(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      console.log(setIsShortMovies)
      setIsShortMovies(true)
    } else {
      setIsShortMovies(false)
      console.log(setIsShortMovies)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      } else {
        setIsNotFound(false)
      }
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm 
      onSearchMovies={handleMovieSearch}
      onFilterMovies={switchToShortFilm}
      isShortMovies={isShortMovies}/>
      <MoviesCardList 
      cards={filteredMovies}
      isLoading={isLoading}
      isSavedFilms={false}
      isRequestError={isRequestError}
      isNotFound={isNotFound}
      savedMovies={savedMovies}
      handleLikeFilm={handleLikeFilm}
      onDeleteCard={onDeleteCard}/>
      <Footer />
    </section>
  )
}

export default Movies
