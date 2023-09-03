import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"

function Register() {
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
    >
      <label className="form__label">
        Имя
        <input
          name="name"
          className="form__input"
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="имя"
          required
        />
        <span className="form__input-error">Заполните поле</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          type="email"
          placeholder="почта"
          required
        />
        <span className="form__input-error">
          Адрес электронной почты должен содержать символ "@".
        </span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          type="password"
          placeholder="пароль"
          minLength="4"
          maxLength="10"
          required
        />
        <span className="form__input-error">Заполните поле</span>
      </label>
    </Form>
  )
}

export default Register
