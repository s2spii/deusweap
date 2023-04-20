export const ADD_TO_CART = "ADD_TO_CART";
export const GET_CART = "GET_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const DELETE_CART = "DELETE_CART";

export const getCart = () => {
  return (dispatch) => {
    dispatch({
      type: GET_CART,
      payload: JSON.parse(window.localStorage.deusweap_cart),
    });
  };
};

export const addToCart = (product) => {
  return (dispatch) => {
    let storage;

    if (window.localStorage.deusweap_cart) {
      storage = JSON.parse(window.localStorage.deusweap_cart);
    } else {
      storage = [];
    }

    let productFound = false;

    for (let i = 0; i < storage.length; i++) {
      const el = storage[i];
      if (el.id === product.id) {
        productFound = true;
        el.quantity = el.quantity + 1;
        break;
      }
    }

    if (!productFound) {
      product.quantity = 1;
      storage.push(product);
    }

    window.localStorage.deusweap_cart = JSON.stringify(storage);

    dispatch({
      type: ADD_TO_CART,
      payload: JSON.parse(window.localStorage.deusweap_cart),
    });
  };
};

export const removeOfCart = (productId) => {
  return (dispatch) => {
    let storage = JSON.parse(window.localStorage.deusweap_cart);

    const updatedStorage = storage.reduce((acc, product) => {
      if (product.id === productId) {
        if (product.quantity > 1) {
          acc.push({ ...product, quantity: product.quantity - 1 });
        }
      } else {
        acc.push(product);
      }
      return acc;
    }, []);

    window.localStorage.deusweap_cart = JSON.stringify(updatedStorage);

    dispatch({
      type: DELETE_FROM_CART,
      payload: updatedStorage,
    });
  };
};

export const addQuantity = (productId) => {
  return (dispatch) => {
    let storage = JSON.parse(window.localStorage.deusweap_cart);

    storage.forEach((product) => {
      if (productId === product.id) {
        product.quantity = product.quantity + 1;
      }
    });

    window.localStorage.deusweap_cart = JSON.stringify(storage);
    dispatch({
      type: ADD_QUANTITY,
      payload: storage,
    });
  };
};

export const deleteOfCart = (productId) => {
  return (dispatch) => {
    let storage = JSON.parse(window.localStorage.deusweap_cart);

    for (let i = 0; i < storage.length; i++) {
      const index = storage[i].id.indexOf(productId);
      if (index > -1) {
        storage.splice(i, 1);
      }
    }

    window.localStorage.deusweap_cart = JSON.stringify(storage);
    dispatch({
      type: DELETE_FROM_CART,
      payload: storage,
    });
  };
};

export const deleteCart = () => {
  return (dispatch) => {
    window.localStorage.deusweap_cart = JSON.stringify([]);
    const storage = JSON.parse(window.localStorage.deusweap_cart);
    dispatch({ type: DELETE_CART, payload: storage });
  };
};
