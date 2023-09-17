import React, { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import Navigation from "../Navigation/Navigation"
import logo from "../../images/logo.svg"
import menu from "../../images/menu-button.svg"
import account from "../../images/profile.svg"
import "./Header.css"

function Header() {
  const location = useLocation()
  const [isClicked, setIsClicked] = useState(false)

  const getShowHeaderOne = () => {
    const { pathname } = location
    return pathname === "/"
  }

  const getShowHeaderTwo = () => {
    const { pathname } = location
    return (
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    )
  }

  function handleOpen() {
    setIsClicked(true)
  }

  function handleCloseMenu() {
    setIsClicked(false)
  }

  return (
    <>
      {getShowHeaderOne() && (
        <header className="header">
          <Link to="/" className="logo">
            <img src={logo} alt="лого" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-color">
              Войти
            </Link>
          </div>
        </header>
      )}

      {getShowHeaderTwo() && (
        <header className="header header_green">
          <Link to="/" className="logo">
            <img src={logo} alt="лого" />
          </Link>
          <div className="header__button-container header__button-container_films">
            <NavLink className="header__button" to="/movies">
              Фильмы
            </NavLink>
            <NavLink className="header__button" to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img
                className="header__account-image"
                src={account}
                alt="изображение кнопки аккаунта"
              />
            </Link>
            <button className="header__menu-button" onClick={handleOpen}>
              <img src={menu} alt="мобильное меню" />
            </button>
          </div>
          {isClicked ? <Navigation handleCloseMenu={handleCloseMenu} /> : ""}
        </header>
      )}
    </>
  )
}

export default Header
