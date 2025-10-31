import { Link } from "react-router-dom";

const Navbar = ({ isMobile = false, onLinkClick = () => {} }) => {
  const navItems = [
    { to: "/", label: "Store" },
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
            className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
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
            className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors hover:bg-gray-800 rounded-md"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
