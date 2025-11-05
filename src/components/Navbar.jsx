import { Link } from "react-router-dom";

const Navbar = ({ isMobile = false, onLinkClick = () => {} }) => {
  const navItems = [
    { to: "/", label: "Store" },
    { to: "/cart", label: "Cart" },
    { to: "/wishlist", label: "Wishlist" },
    { to: "/collection", label: "Collection" },
    { to: "/support", label: "Support" },
  ];

  // Desktop navigation
  if (!isMobile) {
    return (
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 px-3 py-2 text-sm font-medium transition-all duration-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  // Mobile navigation
  return (
    <nav className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onLinkClick}
            className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 block px-3 py-2 text-base font-medium transition-all duration-300 hover:bg-gray-800 rounded-md"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
