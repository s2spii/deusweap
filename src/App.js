import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Products />} path="/produits" />
        <Route element={<Admin />} path="/admin" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
