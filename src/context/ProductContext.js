import { createContext, useContext, useEffect, useState } from "react";
import productsData from "../assets/products.json";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const getDisplayProducts = (catId) => {
    let filteredProducts = products.filter(
      (product) => product.categoryId === catId
    );

    if (selectedFilters.includes("delivery")) {
      filteredProducts = filteredProducts.filter(
        (product) => product.delivery === true
      );
    }

    if (selectedFilters.includes("expensive")) {
      let expensiveProduct = [];
      let maxPrice = 0;

      for (let i = 0; i < products.length; i++) {
        if (products[i].price > maxPrice) {
          maxPrice = products[i].price;
          expensiveProduct = [products[i]];
        }
      }
      filteredProducts = expensiveProduct;
    }

    return filteredProducts;
  };

  const checkboxChangeHandler = (filter) => {
    const isFilterSelected = selectedFilters.includes(filter);

    if (isFilterSelected) {
      setSelectedFilters(
        selectedFilters.filter((selectedFilter) => selectedFilter !== filter)
      );
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getDisplayProducts,
        checkboxChangeHandler,
        clearFilters,
        selectedFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
