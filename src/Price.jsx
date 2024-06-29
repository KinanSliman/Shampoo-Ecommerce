// Price.js
import React, { useState, useEffect, useContext } from "react";
import { Range } from "react-range";

import ProductsContext from "./ProductsContext";

function Price({ onPriceChange, priceRange, reset }) {
  const { products, isLoading, error } = useContext(ProductsContext);
  const [values, setValues] = useState([0, 100]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.wholePrice);
      const min = prices.length > 0 ? Math.min(...prices) : 0;
      const max = prices.length > 0 ? Math.max(...prices) : 100;
      setMinPrice(min);
      setMaxPrice(max);
      setValues([min, max]);
    }
  }, [products]);

  useEffect(() => {
    setValues(priceRange); // Reset to full price range
  }, [reset, priceRange]);

  const handlePriceChange = (newValues) => {
    setValues(newValues);
    onPriceChange(newValues[0], newValues[1]);
  };

  return (
    <div className="sidebar_item">
      <div className="sidebarFilter">
        <p>Filter by Price</p>
      </div>
      <div className="price">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <p className="selected-range">
          {values[0]} to {values[1]} AED
        </p>
        <Range
          step={1}
          min={minPrice}
          max={maxPrice}
          values={values}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <div {...props} className="range-track" ref={props.ref}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className="range-thumb" ref={props.ref} />
          )}
        />
      </div>
    </div>
  );
}

export default Price;
