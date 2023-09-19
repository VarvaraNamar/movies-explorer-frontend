import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SearchForm({ onSearchMovies, onFilterMovies, isShortMovies }) {
  const location = useLocation()

  // наличие ошибки в запросе
  const [isSearchError, setIsSearchError] = useState(false)

  // хранение запроса пользователя
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localSearch = localStorage.getItem("movieSearch")
      setSearch(localSearch)
    }
  }, [location])

  function updateUserInfo(e) {
    e.preventDefault()
    if (search.trim().length === 0) {
      setIsSearchError(true)
    } else {
      setIsSearchError(false)
      onSearchMovies(search)
    }
  }
  
  function updateSearch(event) {
    setSearch(event.target.value)
  }

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={updateUserInfo}>
        <input
          className="search__input"
          id="search-input"
          name="query"
          placeholder="Фильм"
          type="text"
          required
          value={search || ""}
          onChange={updateSearch}
        ></input>
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox 
        onFilterMovies={onFilterMovies}
        isShortMovies={isShortMovies}/>

        {isSearchError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}
      
      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
