import React, { useContext } from "react";
import { CartContext } from "./CartContext";

function CustomModal({ isOpen, onClose, product }) {
  const { addToCart } = useContext(CartContext);

  if (!isOpen || !product) return null;

  console.log("Product in Modal:", product); // Debug log

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.brand} className="modalImage" />
        <div className="modalDetails">
          <h2>{product.brand}</h2>
          <p>Product ID: {product._id || "ID not available"}</p>
          <p>Size: {product.size}</p>
          <p>Hair Type: {product["Hair type"]}</p>
          <p>Scent: {product.Scent}</p>
          <p>Age Range: {product.ageRange}</p>
          <p>
            Price: {product.currency} {product.wholePrice}
            {product.decimalPrice}
          </p>
          <button onClick={() => addToCart(product)}>Add to cart</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
