import MyCard from "./MYCard.jsx"; // Import the ProductCard component
import React, { useState, useEffect } from "react";

function Hero({ products }) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    let sortedArray = [...products];
    if (sortOption === "priceAscending") {
      sortedArray.sort((a, b) => a.wholePrice - b.wholePrice);
    } else if (sortOption === "priceDescending") {
      sortedArray.sort((a, b) => b.wholePrice - a.wholePrice);
    } else if (sortOption === "alphabeticalOrder") {
      sortedArray.sort((a, b) => a.brand.localeCompare(b.brand));
    }
    setSortedProducts(sortedArray);
  }, [sortOption, products]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  return (
    <>
      <div className="hero">
        <select name="sort" id="sort" onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="priceAscending">Price Ascending</option>
          <option value="priceDescending">Price Descending</option>
          <option value="alphabeticalOrder">Alphabetical Order</option>
        </select>
        <div className="hero__productsContainer">
          {sortedProducts.map((product) => (
            <MyCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
