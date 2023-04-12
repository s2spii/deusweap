import React from "react";
import Header from "../components/Header";
import ShowText from "../components/ShowText";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home">
        <ShowText />
        <div className="best-seller">
          <h2>AK-47</h2>
          <img src="./assets/weapons/Assault Rifles/Assault Rifle.png" alt="" />
          <NavLink to="/produits/fusils">Voir plus</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
