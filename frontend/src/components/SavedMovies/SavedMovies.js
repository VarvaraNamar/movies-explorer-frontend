import React, { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import { filterByDuration, findShortMovie } from "../../utils/utils"

function SavedMovies({ savedMovies, onDeleteCard }) {
  
  // список фильмов по запросу
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  // короткометражки выключены по умолчанию
  const [isShortMovies, setIsShortMovies] = useState(false)
  // пустой список фильтра фильмов
  const [isNotFound, setIsNotFound] = useState(false)
  // текущий запрос в поиске
  const [searchQuery, setSearchQuery] = useState("")

  function handleMovieSearch(query) {
    setSearchQuery(query)
  }

  function switchToShortFilm() {
    setIsShortMovies(!isShortMovies)
  }

  useEffect(() => {
    const moviesCardList = findShortMovie(savedMovies, searchQuery)
    setFilteredMovies(
      isShortMovies ? filterByDuration(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortMovies, searchQuery])

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <SearchForm 
        onSearchMovies={handleMovieSearch}
        onFilterMovies={switchToShortFilm}/>
      <MoviesCardList 
        cards={filteredMovies}
        isSavedFilms={true}
        savedMovies={savedMovies}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
        />
      <Footer />
    </section>
  )
}

export default SavedMovies
