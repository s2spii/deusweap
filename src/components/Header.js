import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "./CartContext";
import ShowCart from "./ShowCart";

const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <ul className="header">
      <NavLink to={"/"} className={(nav) => (nav.isActive ? "nav-active" : "")}>
        <i className="fa-solid fa-house"></i> Accueil
      </NavLink>
      <NavLink
        to={"/produits"}
        className={(nav) => (nav.isActive ? "nav-active" : "")}
      >
        <i className="fa-solid fa-gun"></i> Nos Produits
      </NavLink>
      {cart.length > 0 ? (
        <NavLink
          onClick={() => {
            document.getElementById("cart").style.display = "flex";
          }}
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <i className="fa-solid fa-cart-shopping"></i> Panier ({cart.length})
        </NavLink>
      ) : null}
      <li>Se déconnecter</li>

      <ShowCart />
    </ul>
  );
};

export default Header;
