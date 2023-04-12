import axios from "axios";
import React, { useState } from "react";

const ProductAdmin = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(data.name);
  const [buyPrice, setBuyPrice] = useState(data.buy_price);
  const [sellPrice, setSellPrice] = useState(data.sell_price);

  const editProduct = (id) => {
    axios.post("http://localhost:5000/product/edit/" + id, {
      name,
      buy_price: buyPrice,
    });
  };

  const deleteProduct = (id) => {
    axios.delete("http://localhost:5000/product/delete/" + id);
  };

  if (edit) {
    return (
      <div className="row-table">
        <li>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </li>
        <li>
          <input
            type="text"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </li>
        <li>
          <input
            type="text"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
          />
        </li>

        <li>
          <i
            className="fa-solid fa-check hover"
            style={{ marginRight: "10px" }}
            onClick={() => {
              setEdit(false);
              editProduct(data._id);
            }}
          ></i>

          <i
            className="fa-solid fa-x hover"
            style={{ marginLeft: "10px" }}
            onClick={() => setEdit(false)}
          ></i>
        </li>
      </div>
    );
  } else {
    return (
      <div className="row-table">
        <li>{name}</li>
        <li>{buyPrice.toLocaleString()}$</li>
        <li>{data.sell_price.toLocaleString()}$</li>
        <li>
          <i
            className="fa-solid fa-pen hover"
            style={{ marginRight: "10px" }}
            onClick={() => setEdit(true)}
          ></i>

          <i
            className="fa-solid fa-trash hover"
            style={{ marginLeft: "10px" }}
            onClick={() => deleteProduct(data._id)}
          ></i>
        </li>
      </div>
    );
  }
};

export default ProductAdmin;
