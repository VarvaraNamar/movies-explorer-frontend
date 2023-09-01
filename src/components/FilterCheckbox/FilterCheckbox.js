import React from "react"
import "./FilterCheckbox.css"

function FilterCheckbox({ onFilterMovies, isShortMovies }) {
  return (
    <form className="filter">
      <input
        type="checkbox"
        className="filter__checkbox"
        onChange={onFilterMovies}
        checked={isShortMovies}
      ></input>
      <span className="filter__title">Короткометражки</span>
    </form>
  )
}

export default FilterCheckbox
