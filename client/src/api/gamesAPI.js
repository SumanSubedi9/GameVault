import { authenticatedFetch } from "./authAPI";
import { getApiUrl, API_CONFIG } from "../config/api";

// API functions
export const gamesAPI = {
  /**
   * Fetch all games from the backend
   * @returns {Promise<Array>} Array of game objects
   */
  getAllGames: async () => {
    const response = await fetch(getApiUrl(API_CONFIG.endpoints.games), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  },

  /**
   * Add a game to wishlist (requires authentication)
   * @param {number} gameId
   * @returns {Promise<Object>}
   */
  addToWishlist: async (gameId) => {
    const response = await authenticatedFetch(
      getApiUrl(`${API_CONFIG.endpoints.games}/${gameId}/wishlist`),
      {
        method: "POST",
      }
    );
    return await response.json();
  },

  /**
   * Add a game to cart (requires authentication)
   * @param {number} gameId
   * @returns {Promise<Object>}
   */
  addToCart: async (gameId) => {
    const response = await authenticatedFetch(
      getApiUrl(`${API_CONFIG.endpoints.games}/${gameId}/cart`),
      {
        method: "POST",
      }
    );
    return await response.json();
  },

  /**
   * Get user's cart (requires authentication)
   * @returns {Promise<Object>}
   */
  getCart: async () => {
    const response = await authenticatedFetch(
      getApiUrl(API_CONFIG.endpoints.cart)
    );
    return await response.json();
  },

  /**
   * Get user's wishlist (requires authentication)
   * @returns {Promise<Array>}
   */
  getWishlist: async () => {
    const response = await authenticatedFetch(
      getApiUrl(API_CONFIG.endpoints.wishlist)
    );
    return await response.json();
  },
};
