import React from "react"
import { Link, NavLink } from "react-router-dom"
import account from "../../images/profile.svg"
import "./Navigation.css"

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
          <NavLink to="/" className="navigation__link navigation__link_active">
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation__link navigation__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link navigation__link_active"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-button">
          <img src={account} alt="иконка аккаунт" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
