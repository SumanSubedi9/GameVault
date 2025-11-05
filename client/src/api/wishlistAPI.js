import { authenticatedFetch } from "./authAPI";
import { getApiUrl } from "../config/api";

const API_BASE_URL = getApiUrl("/api/wishlist");

export const wishlistAPI = {
  /**
   * Toggle wishlist status (recommended - handles add/remove automatically)
   * @param {number} gameId
   * @returns {Promise<Object>}
   */
  toggleWishlist: async (gameId) => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/toggle`, {
        method: "POST",
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to toggle wishlist");
      }

      return await response.json();
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      throw error;
    }
  },

  /**
   * Get user's wishlist
   * @returns {Promise<Array>}
   */
  getWishlist: async () => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: Failed to fetch wishlist`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  },
};
