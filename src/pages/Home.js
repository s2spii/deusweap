import React from "react";
import Header from "../components/Header";
import ShowText from "../components/ShowText";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import ShowTextV from "../components/ShowTextV2";

const Home = () => {
  const rightToLeft = useSpring({
    from: {
      x: 200,
    },
    to: {
      x: 0,
    },
  });

  return (
    <div style={{ overflowX: false }}>
      <Header />
      <div className="home">
        <ShowText />
        <animated.div className="best-seller" style={{ ...rightToLeft }}>
          <h2>AK-47</h2>
          <img src="./assets/weapons/Assault Rifles/Assault Rifle.png" alt="" />
          <NavLink to="/produits">Voir plus</NavLink>
        </animated.div>
      </div>
      <section className="desc-group home">
        <img src="/assets/weapon.png" alt="Logo Mafia Gallia" width={300} />
        <ShowTextV />
      </section>
    </div>
  );
};

export default Home;
