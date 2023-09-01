import React from "react"
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input
          className="search__input"
          name="query"
          placeholder="Фильм"
          type="text"
        ></input>
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox />
      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm