import axios from "axios";
import React, { useEffect, useState } from "react";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [listCategories, setListCategories] = useState([]);
  const [img, setImg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories/get")
      .then((res) => setListCategories(res.data));
  }, []);

  const handleFormProduct = (event) => {
    event.preventDefault();

    axios.post("http://localhost:5000/product/add", {
      name,
      buy_price: buyPrice,
      sell_price: sellPrice,
      img_path: img,
      categories: categories,
    });
  };

  return (
    <div className="new-form-container">
      <div className="product">
        <form action="" className="new-form" onSubmit={handleFormProduct}>
          <h2>Nouveau produit:</h2>
          <label htmlFor="name" name="name">
            Nom du produit:
          </label>
          <input
            required={true}
            type="text"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="buy_price" name="buy_price">
            Prix d'achat:
          </label>
          <input
            required={true}
            type="text"
            id="buy_price"
            onChange={(e) => {
              setBuyPrice(e.target.value);
            }}
          />
          <label htmlFor="sell_price" name="sell_price">
            Prix de vente:
          </label>
          <input
            required={true}
            type="text"
            id="sell_price"
            onChange={(e) => {
              setSellPrice(e.target.value);
            }}
          />
          <label htmlFor="img_path">Chemin de l'image:</label>
          <input
            type="text"
            id="img_path"
            name="img_path"
            onChange={(e) => setImg(e.target.value)}
          />
          {img ? <img src={img} alt="" width={150} /> : null}
          <label htmlFor="category">Catégorie:</label>
          <select
            required={true}
            id="category"
            onChange={(e) => {
              setCategories(e.target.value);
            }}
          >
            <option value=""></option>
            {listCategories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input type="submit" className="button" value="Nouveau Produit" />
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
