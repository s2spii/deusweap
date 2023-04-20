import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import ProductContent from "../components/ProductContent";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import { useSpring, animated } from "@react-spring/web";

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
    },
    to: {
      x: 0,
    },
  });

  return (
    <div>
      <Header />
      <div className="products">
        <animated.ul style={{ ...leftToRight }} className="side-bar">
          {!isEmpty(categories) &&
            categories.map((category, index) => (
              <li
                key={index}
                className={
                  selectedContent === category.name ? "active-side" : ""
                }
                onClick={showContent(category.name)}
              >
                {category.name}
              </li>
            ))}
        </animated.ul>
        <animated.div
          style={{
            ...rightToLeft,
          }}
          className="content"
        >
          {!isEmpty(categories) &&
            categories.map((category, index) => (
              <div key={index}>
                <ul className="weaponsContent" key={index}>
                  {!isEmpty(data) &&
                    data
                      .filter((el) => el.categories === category.name)
                      .map((product) => {
                        if (product && selectedContent) {
                          if (selectedContent === category.name) {
                            return (
                              <ProductContent
                                key={product._id}
                                product={product}
                              />
                            );
                          }
                        }
                      })}
                </ul>
              </div>
            ))}
          {!selectedContent && (
            <div className="choose-categorie">
              <img src="/assets/Ak-47.webp" alt="AK 47" width={500} />
              <h1>Veuillez choisir une catégorie</h1>
            </div>
          )}
        </animated.div>
      </div>
    </div>
  );
};

export default Products;
