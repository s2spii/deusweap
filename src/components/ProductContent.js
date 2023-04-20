import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cart.action";

const ProductContent = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const formattedSellPrice = product.sell_price.toLocaleString("fr-FR");

  const handleAddToCart = () => {
    const newItem = {
      name: product.name,
      price: product.sell_price,
      buy_price: product.buy_price,
      img_path: product.img_path,
      id: product._id,
    };

    dispatch(addToCart(newItem));
  };

  const handleDisplay = () => {
    setLoading(false);
  };

  return (
    <li>
      <div className="img-container">
        {loading && (
          <Oval
            height={50}
            width={50}
            color="#ffffff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#393053"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        {product.img_path ? (
          <img
            src={product.img_path}
            onLoad={handleDisplay}
            width={200}
            alt=""
          />
        ) : (
          <img
            src="./assets/weapon.png"
            onLoad={handleDisplay}
            width={200}
            alt=""
          />
        )}
      </div>
      <h3>{product.name}</h3>
      <h4>{formattedSellPrice + "$"}</h4>
      <button onClick={handleAddToCart}>Ajouter au panier</button>
    </li>
  );
};

export default ProductContent;
