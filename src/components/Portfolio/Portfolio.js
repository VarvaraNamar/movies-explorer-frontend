import React from "react";
import arrow from "../../images/arrow.svg";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__list">
        <a
          href="https://varvaranamar.github.io/mesto-react/"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__subtitle">Статичный сайт</p>
          <img
            className="portfolio__arrow-link"
            src={arrow}
            alt="стрелка для ссылки"
          />
        </a>
        <a
          href="https://varvaranamar.github.io/russian-travel/index.html"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__subtitle">Адаптивный сайт</p>
          <img
            className="portfolio__arrow-link"
            src={arrow}
            alt="стрелка для ссылки"
          />
        </a>
        <a
          href="https://varvaranamar.github.io/mesto-react/"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__subtitle">Одностраничное приложение</p>
          <img
            className="portfolio__arrow-link"
            src={arrow}
            alt="стрелка для ссылки"
          />
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
