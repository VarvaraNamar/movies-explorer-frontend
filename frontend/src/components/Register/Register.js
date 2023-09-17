import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import useForm from "../../hooks/useForm"
import { EMAIL_REGEX } from "../../utils/constants"

function Register({ onRegister, isLoading }) {
  const { inputValues, handleChangeInput, isFormValid, errors } = useForm()

  function updateUserInfo(event) {
    event.preventDefault()
    onRegister({
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
    })
  }
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="/signin"
      linkText=" Войти"
      isLoading={isLoading}
      onSubmit={updateUserInfo}
      isDisabledButton={!isFormValid}
    >
      <label className="form__label">
        Имя
        <input
          className="form__input"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="имя"
          required
          value={inputValues.name || ""}
          onChange={handleChangeInput}
        />
        <span className="form__input-error">{errors.name}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
        className="form__input"
          name="email"
          pattern={EMAIL_REGEX}
          type="email"
          placeholder="почта"
          required
          value={inputValues.email || ""}
          onChange={handleChangeInput}
        />
        <span className="form__input-error">
        {errors.email}
        </span>
      </label>
      <label className="form__label">
        Пароль
        <input
          className="form__input"
          name="password"
          type="password"
          placeholder="пароль"
          minLength="4"
          maxLength="10"
          required
          value={inputValues.password || ""}
          onChange={handleChangeInput}
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Register
