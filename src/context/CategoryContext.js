import { createContext, useContext, useEffect, useState } from "react";
import categoriesData from "../assets/categories.json";

const CategoryContext = createContext();

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
