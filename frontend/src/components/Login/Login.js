import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import useForm from "../../hooks/useForm"
import { EMAIL_REGEX } from "../../utils/constants"

function Login({ onAuthorization, isLoading }) {
  const { inputValues, handleChangeInput, isFormValid, errors } = useForm()

  function updateUserInfo(event) {
    event.preventDefault()
    onAuthorization({
      email: inputValues.email,
      password: inputValues.password,
    })
  }
  
  return (
    <Form
      noValidate
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      link="/signup"
      linkText=" Регистрация"
      isDisabledButton={!isFormValid}
      isLoading={isLoading}
      onSubmit={updateUserInfo}
    >
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          type="email"
          placeholder="почта"
          required
          pattern={EMAIL_REGEX}
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
          name="password"
          className="form__input"
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

export default Login
