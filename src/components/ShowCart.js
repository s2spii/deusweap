import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const ShowCart = () => {
  const { addToCart, removeOfCart, deleteCart } = useContext(CartContext);
  let totalPrice = 0;
  let count;
  let storage;

  const webhook = require("webhook-discord");
  const Hook = new webhook.Webhook(
    "https://discord.com/api/webhooks/1094987971712790548/LXki_beA5j7WwsV5NFDGfZp7gROmWm6SSaOWv7XCAtFhFw5Fl_SgHTLAI9WAUSrrUpYg"
  );

  if (window.localStorage.deusweap_cart) {
    storage = JSON.parse(window.localStorage.deusweap_cart);

    for (let i = 0; i < storage.length; i++) {
      const item = storage[i].price;
      totalPrice += item;
    }

    count = Object.values(
      JSON.parse(window.localStorage.deusweap_cart).reduce(function (
        obj,
        item
      ) {
        if (!obj[item.name]) {
          obj[item.name] = {
            name: item.name,
            price: item.price,
            buy_price: item.buy_price,
            img: item.img_path,
            quantity: 1,
          };
        } else {
          obj[item.name].quantity++;
        }
        return obj;
      },
      {})
    );
  }

  function addQuantity(obj) {
    const newItem = {
      name: obj.name,
      price: obj.price,
      buy_price: obj.buy_price,
      img_path: obj.img,
    };

    addToCart(newItem);
  }

  if (window.localStorage.deusweap_cart) {
    let totalBenefice = totalPrice;
    let data = `Une nouvelle commande est arrivée ! \n\n **Produits:** \n`;
    for (let i = 0; i < count.length; i++) {
      const item = count[i];
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
      deleteCart();
    };

    return (
      <div className="showCart" id="cart">
        <div className="showCart-content">
          <ul className="weaponsContent">
            {count.map((product, index) => (
              <li key={index} data-quantity={product.quantity}>
                <img src={product.img} width={200} alt="" />
                <h3>{product.name}</h3>

                <h4>{product.price.toLocaleString()}$</h4>

                <div className="button-container">
                  <button onClick={() => removeOfCart(product)}>-</button>
                  <span>
                    Total: {(product.price * product.quantity).toLocaleString()}
                    $
                  </span>
                  <button onClick={() => addQuantity(product)}>+</button>
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
            <button onClick={() => sendToDiscord()}>Commander</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="showCart"></div>;
  }
};

export default ShowCart;
