import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link
        to="/"
        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
      >
        Store
      </Link>
      <Link
        to="/wishlist"
        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
      >
        Wishlist
      </Link>
      <Link
        to="/collection"
        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
      >
        Collection
      </Link>
      <Link
        to="/support"
        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
      >
        Support
      </Link>
    </nav>
  );
};

export default Navbar;
