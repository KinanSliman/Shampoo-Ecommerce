import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const productId = product._id;
    console.log("Adding product to cart:", product);
    console.log("Product ID:", productId);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => {
        console.log("Comparing:", item._id, "with", productId);
        return item._id === productId;
      });

      console.log("Existing item:", existingItem);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1 if not found
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    console.log("Removing product from cart:", productId);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
