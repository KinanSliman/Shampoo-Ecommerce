import React, { useContext } from "react";
import SidebarItemFilter from "./SidebarItemFilter";
import BrandFilter from "./BrandFilter";
import Price from "./Price";
import ProductsContext from "./ProductsContext";

function Sidebar({
  onBrandChange,
  onPriceChange,
  handleCleanFilters,
  selectedBrand,
  priceRange,
  reset,
  isVisible,
  screenWidth, // New prop for screen width
}) {
  const { products, isLoading, error } = useContext(ProductsContext);
  const brands = [...new Set(products.map((product) => product.brand))];

  return (
    <div
      className={`sidebar ${isVisible && screenWidth <= 460 ? "visible" : ""}`}
    >
      <SidebarItemFilter handleCleanFilters={handleCleanFilters} />
      <BrandFilter
        brands={brands}
        onBrandChange={onBrandChange}
        selectedBrand={selectedBrand}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Price
        onPriceChange={onPriceChange}
        priceRange={priceRange}
        reset={reset}
      />
    </div>
  );
}

export default Sidebar;
