// App.js ou un autre composant React
import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import ProductAdmin from "../components/adminContent/ProductAdmin";
import NewProduct from "../components/adminContent/NewProduct";
import NewGroup from "../components/adminContent/NewGroup";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import { useSpring, animated } from "react-spring";
import { Modal } from "@nextui-org/react";
import NewCategory from "../components/adminContent/NewCategory";
import EditGroup from "../components/adminContent/EditGroup";
import EditCategory from "../components/adminContent/EditCategory";

function Admin() {
  const products = useSelector((state) => state.productReducer);
  const categories = useSelector((state) => state.categoryReducer);
  const groups = useSelector((state) => state.groupReducer);

  const [selectedContent, setSelectedContent] = useState("");
  const [sideBar, setSideBar] = useState("");

  const [visibleProduct, setVisibleProduct] = useState(false);
  const [visibleGroup, setVisibleGroup] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [visibleEditGroup, setVisibleEditGroup] = useState({
    id: "",
    name: "",
    password: "",
    grade: "",
    state: false,
  });
  const [visibleEditCategory, setVisibleEditCategory] = useState({
    id: "",
    name: "",
    state: false,
  });

  const closeHandler = () => {
    setVisibleProduct(false);
    setVisibleGroup(false);
    setVisibleCategory(false);
    setVisibleEditGroup({
      id: "",
      name: "",
      password: "",
      grade: "",
      state: false,
    });
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

  const leftToRight = useSpring({
    from: {
      x: -100,
    },
    to: {
      x: 0,
    },
  });

  const rightToLeft = useSpring({
    from: {
      x: 100,
      overflow: "hidden",
    },
    to: {
      x: 0,
    },
  });

  return (
    <div>
      <Header />
      <div className="products">
        {sideBar === "new" ? (
          <animated.ul style={{ ...leftToRight }} className="side-bar">
            <li
              className={selectedContent === "new-group" ? "active-side" : ""}
              onClick={() => setVisibleGroup(true)}
            >
              <i className="fa-solid fa-users"></i> Groupe
            </li>
            <li
              className={selectedContent === "new-product" ? "active-side" : ""}
              onClick={() => setVisibleProduct(true)}
            >
              <i className="fa-solid fa-box"></i> Produit
            </li>
            <li
              className={
                selectedContent === "new-category" ? "active-side" : ""
              }
              onClick={() => setVisibleCategory(true)}
            >
              <i className="fa-solid fa-boxes-stacked"></i> Catégorie
            </li>
            <li
              onClick={() => {
                setSideBar();
                setSelectedContent(null);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Retour
            </li>
          </animated.ul>
        ) : sideBar === "products" ? (
          <animated.ul style={{ ...leftToRight }} className="side-bar">
            {!isEmpty(categories) &&
              categories.map((category) => (
                <li
                  key={category._id}
                  className={
                    selectedContent === category.name ? "active-side" : ""
                  }
                  onClick={showContent(category.name)}
                >
                  {category.name}
                </li>
              ))}
            <li
              onClick={() => {
                setSideBar();
                setSelectedContent(null);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Retour
            </li>
          </animated.ul>
        ) : sideBar === "groups" ? (
          <animated.ul style={{ ...leftToRight }} className="side-bar">
            {!isEmpty(groups) &&
              groups.map((group) => (
                <li
                  key={group._id}
                  className={
                    selectedContent === group.name ? "active-side" : ""
                  }
                  onClick={() => {
                    setVisibleEditGroup({
                      id: group._id,
                      name: group.name,
                      password: group.pass,
                      grade: group.grade,
                      state: true,
                    });
                  }}
                >
                  {group.name}
                </li>
              ))}
            <li
              onClick={() => {
                setSideBar();
                setSelectedContent(null);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Retour
            </li>
          </animated.ul>
        ) : sideBar === "categories" ? (
          <animated.ul style={{ ...leftToRight }} className="side-bar">
            {!isEmpty(categories) &&
              categories.map((category) => (
                <li
                  key={category._id}
                  className={
                    selectedContent === category.name ? "active-side" : ""
                  }
                  onClick={() => {
                    setVisibleEditCategory({
                      id: category._id,
                      name: category.name,
                      state: true,
                    });
                  }}
                >
                  {category.name}
                </li>
              ))}
            <li
              onClick={() => {
                setSideBar();
                setSelectedContent(null);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Retour
            </li>
          </animated.ul>
        ) : (
          <animated.ul style={{ ...leftToRight }} className="side-bar">
            <li onClick={() => setSideBar("products")}>
              <i className="fa-solid fa-boxes-stacked"></i> Produits
            </li>
            <li onClick={() => setSideBar("categories")}>
              <i className="fa-solid fa-boxes-stacked"></i> Catégories
            </li>
            <li onClick={() => setSideBar("groups")}>
              <i className="fa-solid fa-users"></i> Groupes
            </li>
            <li onClick={() => setSideBar("new")}>
              <i className="fa-solid fa-plus"></i> Nouveau
            </li>
          </animated.ul>
        )}

        <animated.div className="content" style={{ ...rightToLeft }}>
          {!isEmpty(categories) &&
            categories.map((category) => {
              if (selectedContent === category.name) {
                return (
                  <ul className="admin-table" key={category._id}>
                    <div className="header-table">
                      <li id="admin-name">Nom</li>
                      <li id="admin-buy-price">Prix d'achat</li>
                      <li id="admin-sell-price">Prix de vente</li>
                      <li id="admin-img-path">URL image</li>
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
          {!selectedContent && (
            <div className="choose-categorie">
              <img src="/assets/Ak-47.webp" alt="AK 47" width={500} />
              <h1>Veuillez choisir une catégorie</h1>
            </div>
          )}
        </animated.div>
      </div>
      <Modal
        width="600px"
        aria-label="group"
        blur
        open={visibleGroup}
        onClose={closeHandler}
      >
        <NewGroup visible={setVisibleGroup} />
      </Modal>
      <Modal
        width="600px"
        aria-label="product"
        blur
        open={visibleProduct}
        onClose={closeHandler}
      >
        <NewProduct visible={setVisibleProduct} />
      </Modal>
      <Modal
        width="600px"
        aria-label="category"
        blur
        open={visibleCategory}
        onClose={closeHandler}
      >
        <NewCategory visible={setVisibleCategory} />
      </Modal>

      <Modal
        width="600px"
        blur
        open={visibleEditGroup.state}
        onClose={closeHandler}
      >
        <EditGroup
          name={visibleEditGroup.name}
          pass={visibleEditGroup.password}
          grade={visibleEditGroup.grade}
          id={visibleEditGroup.id}
          visible={setVisibleEditGroup}
        />
      </Modal>
      <Modal
        width="600px"
        blur
        open={visibleEditCategory.state}
        onClose={closeHandler}
      >
        <EditCategory
          name={visibleEditCategory.name}
          id={visibleEditCategory.id}
          visible={setVisibleEditCategory}
        />
      </Modal>
    </div>
  );
}

export default Admin;
