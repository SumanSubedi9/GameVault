// API configuration utility
const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  baseURL: isDevelopment
    ? import.meta.env.VITE_API_DEV_BASE_URL || "http://localhost:8080"
    : import.meta.env.VITE_API_PROD_BASE_URL || "",
  endpoints: {
    users: import.meta.env.VITE_API_USERS_ENDPOINT || "/api/users",
    games: import.meta.env.VITE_API_GAMES_ENDPOINT || "/api/games",
    cart: import.meta.env.VITE_API_CART_ENDPOINT || "/api/cart",
    wishlist: import.meta.env.VITE_API_WISHLIST_ENDPOINT || "/api/wishlist",
  },
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
