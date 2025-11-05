/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, getCurrentUser } from "../api/authAPI";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    setAuthenticated(isAuthenticated());
    setUser(getCurrentUser());
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const updateAuth = () => {
    checkAuth();
  };

  const value = {
    user,
    authenticated,
    loading,
    updateAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
