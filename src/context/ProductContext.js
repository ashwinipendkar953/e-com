import { createContext, useContext, useEffect, useState } from "react";
import productsData from "../assets/products.json";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const getDisplayProducts = (catId) => {
    return products.filter((product) => product.categoryId === catId);
  };

  return (
    <ProductContext.Provider value={{ products, getDisplayProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
