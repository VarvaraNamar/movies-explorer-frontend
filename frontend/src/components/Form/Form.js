import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/logo.svg"
import "./Form.css"

function Form({ link, linkText, title, buttonText, children,  question, onSubmit,
  isLoading, isDisabledButton }) {
  return (
    <div className="form__block">
      <Link to="/" className="logo">
        <img src={logo} alt="лого" />
      </Link>
      <h3 className="form__title">{title}</h3>
      <form className="form" id="form" noValidate onSubmit={onSubmit}>
        {children}
        <button className={
            isLoading || isDisabledButton
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
          disabled={isDisabledButton ? true : false}
          type="submit">
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default Form
