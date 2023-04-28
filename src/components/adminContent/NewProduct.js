import { Button, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/product.action";

const NewProduct = ({ visible }) => {
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [listCategories, setListCategories] = useState([]);
  const [img, setImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/categories/get`)
      .then((res) => setListCategories(res.data));
  }, []);

  const handleFormProduct = (event) => {
    event.preventDefault();

    dispatch(
      addProduct({
        name,
        buy_price: buyPrice,
        sell_price: sellPrice,
        img_path: img,
        categories: categories,
      })
    );
    visible(false);
    alert("Produit ajouté avec succès");
  };

  return (
    <div className="product">
      <form action="" className="new-form" onSubmit={handleFormProduct}>
        <h2>Nouveau produit</h2>
        <Spacer y={0.5} />
        <Input
          required={true}
          labelLeft="Nom du produit"
          underlined
          color="primary"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Input
          required={true}
          labelLeft="Prix d'achat"
          underlined
          color="primary"
          value={buyPrice}
          onChange={(e) => {
            setBuyPrice(e.target.value);
          }}
        />

        <Input
          required={true}
          labelLeft="Prix de vente"
          underlined
          color="primary"
          value={sellPrice}
          onChange={(e) => {
            setSellPrice(e.target.value);
          }}
        />

        <Input
          labelLeft="Chemin de l'image"
          underlined
          color="primary"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        {img ? <img src={img} alt="" width={150} /> : null}

        <div className="select">
          <div className="span-bar">
            <span>Catégorie</span>
          </div>
          <select
            required={true}
            color="primary"
            value={categories}
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
        </div>
        <Spacer y={1} />

        <div className="button-form">
          <Button color="success" type="submit" auto ghost>
            Ajouter un produit
          </Button>
          <Button
            color="error"
            onClick={() => {
              visible(false);
            }}
            auto
            ghost
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
