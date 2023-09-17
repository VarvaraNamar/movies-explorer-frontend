import React, { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router-dom"
import "./Profile.css"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import useForm from "../../hooks/useForm"
import { EMAIL_REGEX } from "../../utils/constants"

function Profile({ isLoading, signOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext)
  const { inputValues, handleChangeInput, isFormValid, updateForm, errors } =
    useForm()
  const [isLastValues, setIsLastValues] = useState(false)

  useEffect(() => {
    if (currentUser) {
      updateForm(currentUser)
    }
  }, [currentUser, updateForm])

  function updateUserInfo(event) {
    event.preventDefault()
    onUpdateUser({
      name: inputValues.name,
      email: inputValues.email,
    })
  }

  useEffect(() => {
    if (
      currentUser.name === inputValues.name &&
      currentUser.email === inputValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues])

  return (
    <>
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form className="profile__form" noValidate onSubmit={updateUserInfo}>
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              name="name"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder="имя"
              required
              value={inputValues.name || ""}
              onChange={handleChangeInput}
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              name="email"
              type="email"
              placeholder="почта"
              pattern={EMAIL_REGEX}
              required
              value={inputValues.email || ""}
              onChange={handleChangeInput}
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
          <button type="submit" disabled={!isFormValid ? true : false}
            className={
              isLoading || isLastValues || !isFormValid
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }>
            Редактировать
          </button>
          <NavLink to="/" className="profile__exit-link">
            <button type="button" className="profile__exit-button" onClick={signOut}>
              Выйти из аккаунта
            </button>
          </NavLink>
        </form>
      </section>
    </>
  )
}

export default Profile
