import React from "react"
import myAva from "../../images/varya.png"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__subtitle">Варвара Намар</h3>
          <h4 className="about-me__information">
            Фронтенд-разработчик, 32 года
          </h4>
          <p className="about-me__text">
            Я живу в Мытищах, в настоящий момент работаю над развитием своего бренда аксессуаров для собак. Я люблю слушать музыку, увлекаюсь живописью.
            Недавно начала писать код. С 2018 года работала мастером маникюра. После того, как прошла курс по веб-разработке, начала
            заниматься фриланс-заказами.
          </p>
          <a
            href="https://github.com/VarvaraNamar"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="about-me__wrapper-ava">
          <img src={myAva} className="about-me__ava" alt="Моя аватарка" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe
