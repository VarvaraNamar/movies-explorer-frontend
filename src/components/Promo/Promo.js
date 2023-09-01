import React from "react"
import landingLogo from "../../images/landing-logo.svg"
import NavTab from "../NavTab/NavTab"
import "./Promo.css"

function Promo() {
  return (
    <section className="promo">
      <div className="promo__block">
        <div className="promo__text-block">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className="promo__planet" src={landingLogo} alt="изображение" />

        <NavTab />
      </div>
    </section>
  )
}

export default Promo
