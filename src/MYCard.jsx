// MyCard.js
import React, { useState } from "react";
import CustomModal from "./CustomModal";
//import "./MyCard.css"; // Import CSS for card styling

function MyCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="card" onClick={openModal}>
        <img src={product.image} alt={product.brand} />
        <div className="cardContent">
          <h3>{product.brand}</h3>
          <p>Size: {product.size}</p>
          <p>Hair Type: {product["Hair type"]}</p>
          <p>Scent: {product.Scent}</p>
          <p>Age Range: {product.ageRange}</p>
          <p>
            Price: {product.currency} {product.wholePrice}
            {product.decimalPrice}
          </p>
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={product}
      />
    </>
  );
}

export default MyCard;
