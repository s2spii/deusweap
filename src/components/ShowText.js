import React, { useEffect, useState } from "react";

const ShowText = () => {
  const [homeText, sethomeText] = useState("");

  useEffect(() => {
    const $homeText = document.querySelector("#homeText");
    const text = $homeText.textContent;
    $homeText.textContent = "";

    for (let char of text) {
      const $span = document.createElement("span");
      $span.textContent = char;
      $span.style.opacity = 0;
      $homeText.appendChild($span);
    }

    const spans = document.querySelectorAll("#homeText span");
    let delay = 10;
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.opacity = 1;
      }, delay * index);
    });

    sethomeText("active");
  }, []);

  return (
    <p id="homeText" className={homeText}>
      Bienvenue sur notre site de vente d'armes crypté, où votre sécurité est
      notre priorité absolue. Nous fournissons des armes de haute qualité pour
      les joueurs de GTA RP qui recherchent un avantage sur leurs concurrents.
      Toutes nos transactions sont cryptées de bout en bout pour garantir la
      sécurité de vos informations personnelles et financières. Notre sélection
      d'armes comprend des pistolets, des fusils d'assaut, des mitrailleuses,
      des grenades et bien plus encore. Toutes nos armes sont testées et
      approuvées avant d'être mises en vente, afin de garantir leur qualité et
      leur fiabilité.
    </p>
  );
};

export default ShowText;
