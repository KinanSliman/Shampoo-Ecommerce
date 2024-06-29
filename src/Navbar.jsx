import ShoppingCart from "./ShoppingCart";
import logo from "./assets/logo.png";

function Navbar() {
  const mylogo = logo;
  return (
    <>
      <nav className="navbar">
        <img className="logo" src={mylogo} alt="logo" />
        <ShoppingCart />
      </nav>
    </>
  );
}
export default Navbar;
