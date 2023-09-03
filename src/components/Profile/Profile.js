import React from "react"
import "./Profile.css"
import { NavLink } from "react-router-dom"

function Profile() {
  return (
    <>
      <section className="profile">
        <h3 className="profile__title">Привет, Varvara!</h3>
        <form className="profile__form" noValidate>
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder="имя"
              required
            />
            <span className="profile__input-error"></span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              type="email"
              placeholder="почта"
              required
            />
            <span className="profile__input-error"></span>
          </label>
          <button type="submit" className="profile__button-save">
            Редактировать
          </button>
          <NavLink to="/" className="profile__exit-link">
            <button type="button" className="profile__exit-button">
              Выйти из аккаунта
            </button>
          </NavLink>
        </form>
      </section>
    </>
  )
}

export default Profile
