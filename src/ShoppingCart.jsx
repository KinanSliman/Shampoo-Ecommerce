import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import shoppingCart from "./assets/shopping-cart.png";

function ShoppingCart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  console.log("Number of products in cart:", cartItems.length); // Log number of products

  return (
    <div className="shopping_cart">
      <img src={shoppingCart} alt="shopping cart" onClick={toggleCart} />
      {isCartOpen && (
        <div className="cart_items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <p>Your shopping cart items:</p>

              {cartItems.map((item) => (
                <div className="shoppingCartItem">
                  <img src={item.image} alt="product image" />
                  <p key={item._id}>
                    {item.brand} - {item.currency} {item.wholePrice} x{" "}
                    {item.quantity}
                  </p>
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}
          <div className="checkoutButton">
            <button>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
