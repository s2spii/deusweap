import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, isLogged } from "./actions/auth.action";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const isAuthenticated = useSelector((state) => state.authReducer.isLogged);
  const isAdmininistrator = useSelector((state) => state.authReducer.isAdmin);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(isLogged());
      await dispatch(isAdmin());
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch]);

  if (!isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Products />} path="/produits" />
          {isAdmininistrator ? (
            <Route element={<Admin />} path="/admin" />
          ) : null}
        </Routes>
      ) : (
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Login />} path="*" />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
