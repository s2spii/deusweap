import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, editProduct } from "../../actions/product.action";

const ProductAdmin = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(data.name);
  const [buyPrice, setBuyPrice] = useState(data.buy_price);
  const [sellPrice, setSellPrice] = useState(data.sell_price);
  const [url_path, setUrl_path] = useState(data.img_path);

  const dispatch = useDispatch();

  const handleEdit = (id) => {
    const editedData = {
      name,
      buy_price: buyPrice,
      sell_price: sellPrice,
      id: id,
      img_path: url_path,
      categories: data.categories,
    };

    dispatch(editProduct(editedData));
  };

  const img_reduced = data.img_path.slice(0, 10) + "...";

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
          <input
            type="text"
            value={url_path}
            onChange={(e) => setUrl_path(e.target.value)}
          />
        </li>

        <li>
          <i
            className="fa-solid fa-check hover"
            style={{ marginRight: "10px" }}
            onClick={() => {
              setEdit(false);
              handleEdit(data.id);
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
        <li>{sellPrice.toLocaleString()}$</li>
        <li>{img_reduced}</li>
        <li>
          <i
            className="fa-solid fa-pen hover"
            style={{ marginRight: "10px" }}
            onClick={() => setEdit(true)}
          ></i>

          <i
            className="fa-solid fa-trash hover"
            style={{ marginLeft: "10px" }}
            onClick={() => dispatch(deleteProduct(data.id))}
          ></i>
        </li>
      </div>
    );
  }
};

export default ProductAdmin;
