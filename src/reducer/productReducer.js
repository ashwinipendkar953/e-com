const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_PRODUCTS_BY_CATEGORY":
      const catId = action.payload;
      const filteredProducts = state.products.filter(
        (product) => product.categoryId === catId
      );

      const filteredProductsCopy = [...filteredProducts];

      return {
        ...state,
        filteredProducts: filteredProducts,
        featuredProducts: filteredProductsCopy,
      };

    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };

    case "SET_CART_PRICE":
      return {
        ...state,
        price: action.payload,
      };

    case "SET_SELECTED_FILTERS":
      const isFilterSelected = state.selectedFilters.includes(action.payload);
      const productsAfterFiltered = state.featuredProducts;
      console.log("productsAfterFiltered:", productsAfterFiltered);

      console.log("isFilterSelected:", isFilterSelected);

      if (isFilterSelected) {
        const selectedFilter = state.selectedFilters.filter(
          (filter) => filter !== action.payload
        );
        console.log("selectedFilter:", selectedFilter);
        return {
          ...state,
          filteredProducts: productsAfterFiltered,
          selectedFilters: selectedFilter,
        };
      } else {
        return {
          ...state,
          selectedFilters: [...state.selectedFilters, action.payload],
        };
      }

    case "ADD_TO_CART":
      const cartProduct = action.payload;
      const updatedCartItems = [...state.cartItems];

      const existingItemIndex = updatedCartItems.findIndex(
        (item) => item.name === cartProduct.name //
      );

      console.log("existingItemIndex:", existingItemIndex);

      if (existingItemIndex < 0) {
        updatedCartItems.push({ ...cartProduct, quantity: 1 });
      } else {
        const updatedItem = {
          ...updatedCartItems[existingItemIndex],
        };
        updatedItem.quantity++;
        updatedCartItems[existingItemIndex] = updatedItem;
      }

      const updatedPrice = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      localStorage.setItem("cartPrice", JSON.stringify(updatedPrice));

      return {
        ...state,
        cartItems: updatedCartItems,
        price: updatedPrice,
      };

    case "INCREMENT_QTY":
      const incrementdItem = action.payload;
      const cartItemsAfterIncrement = state.cartItems.map((cartItem) => {
        if (cartItem.id === incrementdItem.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });

      const priceAfterIncrement = state.price + incrementdItem.price;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItemsAfterIncrement)
      );

      localStorage.setItem("cartPrice", JSON.stringify(priceAfterIncrement));

      return {
        ...state,
        cartItems: cartItemsAfterIncrement,
        price: priceAfterIncrement,
        quantity: state.cartItems.quantity + 1,
      };

    case "DECREMENT_QTY":
      const decrementedItem = action.payload;
      const cartItemsAfterDecrement = state.cartItems
        .map((cartItem) => {
          if (cartItem.id === decrementedItem.id) {
            if (cartItem.quantity < 2) {
              return null;
            } else {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
          }
          return cartItem;
        })
        .filter(Boolean);

      const priceAfterDecrement = state.price - decrementedItem.price;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItemsAfterDecrement)
      );
      localStorage.setItem("cartPrice", JSON.stringify(priceAfterDecrement));

      return {
        ...state,
        cartItems: cartItemsAfterDecrement,
        price: priceAfterDecrement,
        quantity: state.quantity - 1,
      };

    case "APPLY_FILTERS":
      let categoryProducts = state.filteredProducts;
      let filtersSelected = state.selectedFilters;

      if (filtersSelected.includes("delivery")) {
        categoryProducts = categoryProducts.filter(
          (product) => product.delivery === true
        );
      }

      if (filtersSelected.includes("expensive")) {
        let expensiveProduct = [];
        let maxPrice = 0;

        for (let i = 0; i < categoryProducts.length; i++) {
          const product = categoryProducts[i];
          if (product && product.price > maxPrice) {
            maxPrice = product.price;
            expensiveProduct = [product];
          }
        }
        categoryProducts = expensiveProduct;
      }

      if (filtersSelected.includes("bestSelling")) {
        let bestSellingProduct = null;
        let highestUnitSold = 0;
        categoryProducts.forEach((product) => {
          if (product && product.unitsSold > highestUnitSold) {
            bestSellingProduct = product;
            highestUnitSold = product.unitsSold;
          }
        });
        categoryProducts = [bestSellingProduct];
      }

      return {
        ...state,
        filteredProducts: categoryProducts,
      };

    // eslint-disable-next-line no-fallthrough
    case "CLEAR_FILTERS":
      return {
        ...state,
        selectedFilters: [],
      };

    case "RESET_PRODUCTS":
      return {
        ...state,
        filteredProducts: state.featuredProducts,
      };

    case "REMOVE_CART_ITEM":
      const productId = action.payload;
      const removeItem = state.cartItems.find((item) => item.id === productId);
      const cartItemsAfterRemoval = state.cartItems.filter(
        (item) => item.id !== productId
      );

      const totalPriceAfterRemoval =
        state.price - removeItem.price * removeItem.quantity;

      localStorage.setItem("cartItems", JSON.stringify(cartItemsAfterRemoval));

      localStorage.setItem("cartPrice", JSON.stringify(totalPriceAfterRemoval));

      return {
        ...state,
        cartItems: cartItemsAfterRemoval,
        price: totalPriceAfterRemoval,
      };

    default:
      return state;
  }
};

export default productReducer;
