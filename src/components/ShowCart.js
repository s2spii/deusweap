import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  addQuantity,
  deleteCart,
  deleteOfCart,
  removeOfCart,
} from "../actions/cart.action";
import { isEmpty } from "./Utils";
import { getLoggedUser } from "../actions/user.action";

const ShowCart = () => {
  const group = useSelector((state) => state.userReducer.users.name);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedUser());
  }, [dispatch]);
  const [loading, setLoading] = useState(true);
  const [onOver, setOnOver] = useState(false);
  let totalPrice = 0;
  let storage = JSON.parse(window.localStorage.deusweap_cart);
  const cart = useSelector((state) => state.cartReducer);

  const webhook = require("webhook-discord");
  const Hook = new webhook.Webhook(
    "https://discord.com/api/webhooks/1094987971712790548/LXki_beA5j7WwsV5NFDGfZp7gROmWm6SSaOWv7XCAtFhFw5Fl_SgHTLAI9WAUSrrUpYg"
  );

  if (storage && Array.isArray(storage)) {
    for (let i = 0; i < storage.length; i++) {
      const item = storage[i];
      totalPrice += item.price * item.quantity;
    }

    let totalBenefice = totalPrice;
    let data = `Une nouvelle commande est arrivée ! \n\n **Groupe:** \n > ${group} \n\n **Produits:** \n`;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      data += `> x${item.quantity} __${item.name}__ \n`;
      totalBenefice -= item.buy_price * item.quantity;
    }
    data += `\n **Bénéfice:** \n > ${totalBenefice.toLocaleString()}$ \n **Total:** \n > ${totalPrice.toLocaleString()}$`;

    const message = new webhook.MessageBuilder()
      .setText("||here||")
      .setTitle("Nouvelle commande !")
      .setName("Fernando")
      .setColor("#32CD32")
      .setDescription(data)
      .setAvatar(
        "https://cdn.discordapp.com/attachments/967158049548693574/1095001006921756832/Capture_decran_2023-03-21_231331.png"
      );

    const sendToDiscord = () => {
      Hook.send(message);
      document.getElementById("cart").style.display = "none";
      dispatch(deleteCart());
    };

    const handleDisplay = () => {
      setLoading(false);
    };

    const handleRemove = (product) => {
      dispatch(removeOfCart(product));
    };

    const handleDelete = (productId) => {
      dispatch(deleteOfCart(productId));
    };

    const handleAddQuantity = (productId) => {
      dispatch(addQuantity(productId));
    };

    return (
      <div className="showCart" id="cart">
        <div className="showCart-content">
          <ul className="cartContent">
            {!isEmpty(cart) &&
              cart.map((product, index) => (
                <li key={index}>
                  <i
                    onMouseEnter={() => setOnOver(true)}
                    onMouseLeave={() => setOnOver(false)}
                    onClick={() => handleDelete(product.id)}
                  >
                    {onOver ? "x" : product.quantity}
                  </i>
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

                  <h4>{product.price.toLocaleString("fr-FR")}$</h4>

                  <div className="button-container">
                    <button onClick={() => handleRemove(product.id)}>-</button>
                    <span>
                      Total:{" "}
                      {(product.price * product.quantity).toLocaleString()}$
                    </span>
                    <button onClick={() => handleAddQuantity(product.id)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <div className="pay_cart">
            <button
              onClick={() => {
                document.getElementById("cart").style.display = "none";
              }}
            >
              Réduire
            </button>
            <div>Prix total: {totalPrice.toLocaleString()}$</div>
            <button
              onClick={() => {
                sendToDiscord();
              }}
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="showCart" id="cart"></div>;
  }
};

export default ShowCart;
