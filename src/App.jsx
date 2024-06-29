import { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Hero from "./Hero";
import ProductsContext from "./ProductsContext";
import SidebarHumburger from "./SidebarHumburger"; // Corrected the import

function App() {
  const { products, isLoading, error } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [reset, setReset] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // New state for sidebar visibility
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // New state for screen width
  const [isHumburgerOpen, setIsHumburgerOpen] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
      const prices = products.map((product) => product.wholePrice);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHumburgerOpen = () => {
    setIsHumburgerOpen(!isHumburgerOpen);
  };

  const handleCleanFilters = () => {
    setFilteredProducts(products);
    setSelectedBrand("");
    const prices = products.map((product) => product.wholePrice);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100;
    setPriceRange([minPrice, maxPrice]);
    setReset((prevReset) => !prevReset);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    filterProducts(brand, priceRange);
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    setPriceRange([minPrice, maxPrice]);
    filterProducts(selectedBrand, [minPrice, maxPrice]);
  };

  const filterProducts = (brand, [minPrice, maxPrice]) => {
    let filtered = products;

    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    filtered = filtered.filter(
      (product) =>
        product.wholePrice >= minPrice && product.wholePrice <= maxPrice
    );

    setFilteredProducts(filtered);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="container">
      <SidebarHumburger
        isHumburgerOpen={isHumburgerOpen} // Pass the state to the child component
        handleHumburgerOpen={handleHumburgerOpen}
        onToggleSidebar={toggleSidebar}
      />
      <Sidebar
        isVisible={isSidebarVisible}
        screenWidth={screenWidth} // Pass screen width as prop
        onBrandChange={handleBrandChange}
        onPriceChange={handlePriceChange}
        handleCleanFilters={handleCleanFilters}
        selectedBrand={selectedBrand}
        priceRange={priceRange}
        reset={reset}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Hero products={filteredProducts} />
    </div>
  );
}

export default App;
