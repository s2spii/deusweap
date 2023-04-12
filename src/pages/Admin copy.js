// App.js ou un autre composant React
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../components/Header";
import AssaultAdmin from "../components/adminContent/AssaultAdmin";
import NewProduct from "../components/adminContent/NewProduct";

function Admin() {
  const [data, setData] = useState([]);
  const [selectedContent, setSelectedContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product/get");
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

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
        <ul className="side-bar">
          <li onClick={showContent("assault")}>Fusils d'assaut</li>
          <li onClick={showContent("guns")}>Pistolets</li>
          <li onClick={showContent("pumps")}>Fusils à pompes</li>
          <li onClick={showContent("new")}>Nouveau</li>
        </ul>
        <div className="content">
          {selectedContent === "assault" && (
            <ul className="admin-table">
              <div className="header-table">
                <li id="admin-name">Nom</li>
                <li id="admin-buy-price">Prix d'achat</li>
                <li id="admin-sell-price">Prix de vente</li>
                <li id="admin-edit">Modif.</li>
              </div>

              {data
                .filter((category) => category.categories === "assault")
                .map((product, index) => (
                  <AssaultAdmin data={product} key={index} />
                ))}
            </ul>
          )}
          {selectedContent === "guns" && (
            <ul className="admin-table">
              <div className="header-table">
                <li id="admin-name">Nom</li>
                <li id="admin-buy-price">Prix d'achat</li>
                <li id="admin-sell-price">Prix de vente</li>
                <li id="admin-edit">Modif.</li>
              </div>

              {data
                .filter((category) => category.categories === "pistol")
                .map((product, index) => (
                  <AssaultAdmin data={product} key={index} />
                ))}
            </ul>
          )}
          {selectedContent === "pumps" && (
            <ul className="admin-table">
              <div className="header-table">
                <li id="admin-name">Nom</li>
                <li id="admin-buy-price">Prix d'achat</li>
                <li id="admin-sell-price">Prix de vente</li>
                <li id="admin-edit">Modif.</li>
              </div>

              {data
                .filter((category) => category.categories === "pump")
                .map((product, index) => (
                  <AssaultAdmin data={product} key={index} />
                ))}
            </ul>
          )}
          {selectedContent === "new" && <NewProduct />}
          {!selectedContent && <h1>Veuillez choisir une catégorie</h1>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
