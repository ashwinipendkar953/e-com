import { createContext, useContext, useEffect, useState } from "react";
import productsData from "../assets/products.json";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const getDisplayProducts = (catId) => {
    return products.filter((product) => product.categoryId === catId);
  };

  const checkboxChangeHandler = (isChecked) => {
    if (isChecked) {
      const filteredProducts = products.filter(
        (product) => product.delivery === true
      );
      setProducts(filteredProducts);
    }
    return products;
  };

  const clearFilters = () => {
    setProducts(productsData);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getDisplayProducts,
        checkboxChangeHandler,
        clearFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
