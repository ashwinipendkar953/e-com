import { createContext, useContext, useEffect, useState } from "react";
import productsData from "../assets/products.json";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setProducts(productsData);

    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }

    const storedCartPrice = JSON.parse(localStorage.getItem("cartPrice"));
    if (storedCartPrice) {
      setPrice(storedCartPrice);
    }
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

      for (let i = 0; i < filteredProducts.length; i++) {
        const product = filteredProducts[i];
        if (product && product.price > maxPrice) {
          maxPrice = product.price;
          expensiveProduct = [product];
        }
      }
      filteredProducts = expensiveProduct;
    }

    if (selectedFilters.includes("bestSelling")) {
      let bestSellingProduct = null;
      let highestUnitSold = 0;
      filteredProducts.forEach((product) => {
        if (product && product.unitsSold > highestUnitSold) {
          bestSellingProduct = product;
          highestUnitSold = product.unitsSold;
        }
      });
      filteredProducts = [bestSellingProduct];
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

  const addToCartHandler = (cartProduct) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === cartProduct.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === cartProduct.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...cartProduct, quantity: 1 }]);
    }

    setPrice((prevPrice) => {
      return prevPrice + cartProduct.price;
    });

    // localStorage.setItem(
    //   "cartItems",
    //   JSON.stringify([...cartItems, cartProduct])
    // );
    // localStorage.setItem(
    //   "cartPrice",
    //   JSON.stringify(price + cartProduct.price)
    // );
  };

  const removeCartItem = (id) => {
    const removeItem = cartItems.find((item) => item.id === id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    setPrice((prevPrice) => {
      return prevPrice - removeItem.price * removeItem.quantity;
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item.id !== id))
    );

    localStorage.setItem(
      "cartPrice",
      JSON.stringify(price - removeItem.price * removeItem.quantity)
    );
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
        cartItems,
        setCartItems,
        addToCartHandler,
        price,
        removeCartItem,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
