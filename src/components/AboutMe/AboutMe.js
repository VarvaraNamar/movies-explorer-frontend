import React from "react"
import myAva from "../../images/varya.png"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__subtitle">Varvara Namar</h3>
          <h4 className="about-me__information">
            Фронтенд-разработчик, 32 года
          </h4>
          <p className="about-me__text">
            Я живу в Мытищах, закончила факультет экономики ПВГУС. У меня есть
            молодой человек. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начала писать код. С 2015 года работала в компании «СКБ
            Контур». После того, как прошла курс по веб-разработке, начала
            заниматься фриланс-заказами и ушла с постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/VarvaraNamar"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={myAva} className="about-me__ava" alt="мой аватар" />
      </div>
    </section>
  )
}

export default AboutMe
