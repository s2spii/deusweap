import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const ShowTextV = () => {
  const [homeTextV, sethomeTextV] = useState("");

  useEffect(() => {
    const $homeTextV = document.querySelector("#homeTextV");
    const text = $homeTextV.textContent;
    $homeTextV.textContent = "";

    for (let char of text) {
      const $span = document.createElement("span");
      $span.textContent = char;
      $span.style.opacity = 0;
      $homeTextV.appendChild($span);
    }

    const spans = document.querySelectorAll("#homeTextV span");
    let delay = 10;
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.opacity = 1;
      }, delay * index);
    });

    sethomeTextV("active");
  }, []);

  const spring = useSpring({
    from: {
      x: -200,
    },
    to: {
      x: 0,
    },
  });

  return (
    <p id="homeTextV" className={homeTextV}>
      La mafia Gallia est une mafia française, Gallia étant la traduction latine
      de Gaule. Crée par Paul DUBOIS, aucun membre ne se connaîtra, tout le
      monde aura été contacté en amont pour se rejoindre à Los Santos à une
      heure et un jour précis, dans le seul et unique but de faire énormément
      d’argent. Ces personnes auront été choisies pour leurs compétences dans
      leurs background. Fortement influencé par la “French connection” et les
      connaissances de Paul sur l’héroïne, le lore de l’organisation est donc de
      contrôler tout ce qui touche de près à l'héroïne : artisanale, labo,
      vente.
    </p>
  );
};

export default ShowTextV;
