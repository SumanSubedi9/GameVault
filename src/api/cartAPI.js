import { authenticatedFetch } from "./authAPI";
import { getCurrentUser } from "./authAPI";
import { getApiUrl } from "../config/api";

const API_BASE_URL = getApiUrl("/api/cart");

export const cartAPI = {
  /**
   * Add a game to cart
   * @param {Object} cartItem - { gameId, quantity }
   * @returns {Promise<Object>}
   */
  addToCart: async (cartItem) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Try different possible user ID fields
      const userId = user.id || user.userId || user.user_id || user.ID;
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Try approach 1: Send userId in the request body
      let requestBody = {
        gameId: cartItem.gameId,
        quantity: cartItem.quantity,
        userId: userId,
      };

      let response = await authenticatedFetch(`${API_BASE_URL}/add`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      // If forbidden, try approach 2: Don't send userId (let backend extract from token)
      if (response.status === 403) {
        requestBody = {
          gameId: cartItem.gameId,
          quantity: cartItem.quantity,
        };

        console.log("Request body (approach 2):", requestBody); // Debug log

        response = await authenticatedFetch(`${API_BASE_URL}/add`, {
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        console.log("Response status (approach 2):", response.status); // Debug log
      }

      // If still forbidden, try approach 3: Use /api/cart instead of /api/cart/add
      if (response.status === 403) {
        console.log(
          "Approach 2 failed, trying approach 3 with different endpoint..."
        );
        response = await authenticatedFetch(`http://localhost:8080/api/cart`, {
          method: "POST",
          body: JSON.stringify({
            gameId: cartItem.gameId,
            quantity: cartItem.quantity,
          }),
        });

        console.log("Response status (approach 3):", response.status); // Debug log
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData); // Debug log
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: Failed to add item to cart`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  /**
   * Get user's cart items
   * @returns {Promise<Array>}
   */
  getCart: async () => {
    try {
      console.log("Fetching cart...");

      const response = await authenticatedFetch(`${API_BASE_URL}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(
          errorData.message || `HTTP ${response.status}: Failed to fetch cart`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  /**
   * Get cart item count
   * @returns {Promise<number>}
   */
  getCartCount: async () => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/count`);

      if (!response.ok) {
        return 0;
      }

      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error("Error fetching cart count:", error);
      return 0;
    }
  },

  /**
   * Update cart item quantity
   * @param {Object} updateData - { gameId, quantity }
   * @returns {Promise<Object>}
   */
  updateCartItem: async (updateData) => {
    try {
      console.log("Sending update request with data:", updateData);

      const response = await authenticatedFetch(`${API_BASE_URL}/update`, {
        method: "PUT",
        body: JSON.stringify({
          gameId: updateData.gameId,
          quantity: updateData.quantity,
        }),
      });

      console.log("Update response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update error response:", errorData);
        throw new Error(errorData.message || "Failed to update cart item");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  /**
   * Remove item from cart
   * @param {number} gameId
   * @returns {Promise<Object>}
   */
  removeFromCart: async (gameId) => {
    try {
      console.log("Removing cart item with gameId:", gameId);

      const response = await authenticatedFetch(`${API_BASE_URL}/remove`, {
        method: "DELETE",
        body: JSON.stringify({ gameId: gameId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove item from cart");
      }

      return await response.json();
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },
};
