import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"

function Login() {
  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
    >
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
        <span className="form__input-error">Введите пароль</span>
      </label>
    </Form>
  )
}

export default Login
