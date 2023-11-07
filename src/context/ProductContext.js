import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";

import productsData from "../assets/products.json";

const productContext = createContext();

const initialState = {
  products: [],
  featuredProducts: [],
  filteredProducts: [],
  selectedFilters: [],
  cartItems: [],
  price: 0,
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProductsByCategory = (catId) => {
    dispatch({ type: "SET_PRODUCTS_BY_CATEGORY", payload: catId });
  };

  const addToCartHandler = (cartProduct) => {
    dispatch({ type: "ADD_TO_CART", payload: cartProduct });
  };

  const applyFilters = (filters) => {
    dispatch({ type: "SET_SELECTED_FILTERS", payload: filters });
    dispatch({ type: "APPLY_FILTERS", payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
    dispatch({ type: "RESET_PRODUCTS" });
  };

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: productsData });

    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      dispatch({ type: "SET_CART_ITEMS", payload: storedCartItems });
    }

    const storedCartPrice = JSON.parse(localStorage.getItem("cartPrice"));
    if (storedCartPrice) {
      dispatch({ type: "SET_CART_PRICE", payload: storedCartPrice });
    }
  }, []);

  const incrementHandler = (item) => {
    dispatch({ type: "INCREMENT_QTY", payload: item });
  };

  const decrementHandler = (item) => {
    dispatch({ type: "DECREMENT_QTY", payload: item });
  };

  const removeCartItem = (productId) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: productId });
  };

  return (
    <productContext.Provider
      value={{
        ...state,
        getProductsByCategory,
        addToCartHandler,
        applyFilters,
        clearFilters,
        removeCartItem,
        incrementHandler,
        decrementHandler,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(productContext);
};

export { ProductProvider, productContext, useProductContext };
