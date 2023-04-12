// App.js ou un autre composant React
import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import ProductAdmin from "../components/adminContent/ProductAdmin";
import NewProduct from "../components/adminContent/NewProduct";
import NewGroup from "../components/adminContent/NewGroup";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";

function Admin() {
  const products = useSelector((state) => state.productReducer);
  const categories = useSelector((state) => state.categoryReducer);
  const [selectedContent, setSelectedContent] = useState("");
  const [sideBar, setSideBar] = useState("");

  const showContent = useCallback(
    (content) => () => {
      if (content === selectedContent) {
        setSelectedContent(null);
      } else {
        setSelectedContent(content);
      }
    },
    [selectedContent]
  );

  return (
    <div>
      <Header />
      <div className="products">
        {sideBar === "new" ? (
          <ul className="side-bar">
            <li onClick={showContent("new-group")}>Groupe</li>
            <li onClick={showContent("new-product")}>Produit</li>
            <li onClick={() => setSideBar()}>
              <i className="fa-solid fa-arrow-left"></i> Retour
            </li>
          </ul>
        ) : sideBar === "products" ? (
          <ul className="side-bar">
            {!isEmpty(categories) &&
              categories.map((category) => (
                <li key={category._id} onClick={showContent(category.name)}>
                  {category.name}
                </li>
              ))}
            <li onClick={() => setSideBar()}>
              <i className="fa-solid fa-arrow-left"></i> Retour
            </li>
          </ul>
        ) : (
          <ul className="side-bar">
            <li onClick={() => setSideBar("products")}>Produits</li>
            <li onClick={() => setSideBar("new")}>Nouveau</li>
          </ul>
        )}

        <div className="content">
          {!isEmpty(categories) &&
            categories.map((category) => {
              if (selectedContent === category.name) {
                return (
                  <ul className="admin-table" key={category._id}>
                    <div className="header-table">
                      <li id="admin-name">Nom</li>
                      <li id="admin-buy-price">Prix d'achat</li>
                      <li id="admin-sell-price">Prix de vente</li>
                      <li id="admin-edit">Modif.</li>
                    </div>

                    {!isEmpty(products) &&
                      products
                        .filter((el) => el.categories === category.name)
                        .map((product, index) => (
                          <ProductAdmin data={product} key={index} />
                        ))}
                  </ul>
                );
              }
              return null;
            })}
          {selectedContent === "new-product" && <NewProduct />}
          {selectedContent === "new-group" && <NewGroup />}
          {!selectedContent && <h1>Veuillez choisir une catégorie</h1>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
