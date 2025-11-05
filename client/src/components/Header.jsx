import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { logout } from "../api/authAPI";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, authenticated, updateAuth } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    updateAuth();
    navigate("/");
    setIsMenuOpen(false);
  };

  const UserActions = ({ isMobile = false }) => {
    const baseClasses = isMobile
      ? "w-full px-4 py-2 rounded-md text-sm font-medium transition-colors block text-center"
      : "px-4 py-2 rounded-md text-sm font-medium transition-colors";

    if (authenticated && user) {
      return (
        <div
          className={
            isMobile
              ? "px-2 pt-4 pb-3 border-t border-gray-700 space-y-2"
              : "flex items-center space-x-4"
          }
        >
          <span
            className={
              isMobile
                ? "text-gray-300 px-4 py-2 block"
                : "text-gray-300 text-sm"
            }
          >
            Welcome, {user.username || user.email}
          </span>
          <button
            onClick={handleLogout}
            className={`bg-red-600 hover:bg-red-700 text-white border border-red-500 ${baseClasses}`}
          >
            Sign Out
          </button>
        </div>
      );
    }

    return (
      <div
        className={
          isMobile
            ? "px-2 pt-4 pb-3 border-t border-gray-700"
            : "flex items-center space-x-4"
        }
      >
        <Link
          to="/login"
          onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
          className={`bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 ${baseClasses}`}
        >
          Sign In
        </Link>
      </div>
    );
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* Vault Icon */}
            <div className="w-8 h-8 bg-linear-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 6h-2V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM7 4h10v2H7V4zm11 6v8H6v-8h12zm-6 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              GameVault
            </div>
          </div>

          {/* Desktop Navigation */}
          <Navbar />

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="text-gray-300 hover:text-white relative"
              title="Cart"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L21 13M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <UserActions />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <Navbar isMobile={true} onLinkClick={() => setIsMenuOpen(false)} />
            <UserActions isMobile={true} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
