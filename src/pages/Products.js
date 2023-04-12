import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import ProductContent from "../components/ProductContent";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";

const Products = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const data = useSelector((state) => state.productReducer);
  const categories = useSelector((state) => state.categoryReducer);

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
          {!isEmpty(categories) &&
            categories.map((category, index) => (
              <li key={index} onClick={showContent(category.name)}>
                {category.name}
              </li>
            ))}
        </ul>
        <div className="content">
          {categories.map((category, index) => (
            <div key={index}>
              {data
                .filter((el) => el.categories === category.name)
                .map((product) => {
                  if (selectedContent === category.name) {
                    return (
                      <ul className="weaponsContent">
                        <ProductContent key={product._id} product={product} />
                      </ul>
                    );
                  }
                })}
            </div>
          ))}
          {!selectedContent && <h4>Veuillez choisir une catégorie</h4>}
        </div>
      </div>
    </div>
  );
};

export default Products;
