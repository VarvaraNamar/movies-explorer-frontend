import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link onClick={() => navigate(-2)} className="not-found__button">
        Назад
      </Link>
    </section>
  )
}

export default NotFound
