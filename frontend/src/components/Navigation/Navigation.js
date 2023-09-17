import React from "react"
import "./Navigation.css"
import { Link, NavLink } from "react-router-dom"
import account from "../../images/profile.svg"

function Navigation({ handleCloseMenu }) {
  return (
    <div className="navigation__block">
      <div className="navigation__block-overlay"></div>
      <div className="navigation__menu">
        <button
          className="navigation__close-button"
          onClick={handleCloseMenu}
        ></button>
        <nav className="navigation__links">
          <NavLink to="/" className="navigation__link">
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation__link"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-button">
          <img src={account} alt="иконка аккаунта" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
