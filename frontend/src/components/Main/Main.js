import React from "react"
import Promo from "../Promo/Promo"
import AboutMe from "../AboutMe/AboutMe"
import AboutProject from "../AboutProject/AboutProject"
import Techs from "../Techs/Techs"
import Portfolio from "../Portfolio/Portfolio"

function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main
