import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (window.localStorage.deusweap_cart) {
      const storedCart = JSON.parse(
        window.localStorage.getItem("deusweap_cart")
      );
      if (storedCart) {
        setCart(storedCart);
      }
    }
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, item];
      window.localStorage.setItem("deusweap_cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeOfCart = (obj) => {
    setCart(() => {
      const storage = JSON.parse(window.localStorage.getItem("deusweap_cart"));
      const index = storage.findIndex((item) => item.name === obj.name);
      if (index !== -1) {
        storage.splice(index, 1);
        window.localStorage.setItem("deusweap_cart", JSON.stringify(storage));
        return storage;
      }
    });
  };

  const deleteCart = () => {
    document.getElementById("cart").style.display = "none";
    window.localStorage.deusweap_cart = "";
    setCart("");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeOfCart, deleteCart }}>
      {children}
    </CartContext.Provider>
  );
};
