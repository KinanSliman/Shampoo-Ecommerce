// BrandFilter.js
import React from "react";

function BrandFilter({ brands, onBrandChange, selectedBrand }) {
  return (
    <div className="sidebar_item">
      <div className="sidebarFilter">
        <p>Filter by Brand</p>
      </div>
      <select
        value={selectedBrand}
        onChange={(e) => onBrandChange(e.target.value)}
      >
        <option value="">Select a brand</option>
        {brands.map((brand, index) => (
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BrandFilter;
