import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ShowCart from "./ShowCart";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, logout } from "../actions/auth.action";

const Header = () => {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const isAdministrator = useSelector((state) => state.authReducer.isAdmin);

  useEffect(() => {
    dispatch(isAdmin());
  }, [isAdministrator]);

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
        >
          <i className="fa-solid fa-cart-shopping"></i> Panier ({cart.length})
        </NavLink>
      ) : null}

      {isAdministrator ? (
        <NavLink
          to="/admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <i className="fa-solid fa-user"></i> Admin
        </NavLink>
      ) : null}

      <NavLink to="/login" onClick={() => dispatch(logout())}>
        <i className="fa-solid fa-right-from-bracket"></i> Se déconnecter
      </NavLink>

      <ShowCart />
    </ul>
  );
};

export default Header;
