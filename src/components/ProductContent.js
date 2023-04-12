import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Oval } from "react-loader-spinner";

const ProductContent = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const newItem = {
      name: product.name,
      price: product.sell_price,
      buy_price: product.buy_price,
      img_path: product.img_path,
    };
    addToCart(newItem);
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
        <img src={product.img_path} onLoad={handleDisplay} width={200} alt="" />
      </div>
      <h3>{product.name}</h3>
      <h4>{product.sell_price.toLocaleString() + "$"}</h4>
      <button onClick={handleAddToCart}>Ajouter au panier</button>
    </li>
  );
};

export default ProductContent;
