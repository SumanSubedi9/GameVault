import axios from "axios";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: "/api", // This will be proxied to localhost:8080 by Vite
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);

    // Handle common error scenarios
    if (error.response?.status === 404) {
      throw new Error("Games not found - check if backend is running");
    } else if (error.response?.status >= 500) {
      throw new Error("Server error - please try again later");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - check your connection");
    } else if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Network error - is your backend running on localhost:8080?"
      );
    }

    throw new Error(
      error.response?.data?.message || error.message || "Unknown error occurred"
    );
  }
);

// API functions
export const gamesAPI = {
  /**
   * Fetch all games from the backend
   * @returns {Promise<Array>} Array of game objects
   */
  getAllGames: async () => {
    try {
      const response = await apiClient.get("/games");
      return response.data;
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  },

  /**
   * Add a game to wishlist (placeholder for future implementation)
   * @param {number} gameId
   * @returns {Promise<Object>}
   */
  addToWishlist: async (gameId) => {
    try {
      const response = await apiClient.post(`/games/${gameId}/wishlist`);
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  },

  /**
   * Add a game to cart (placeholder for future implementation)
   * @param {number} gameId
   * @returns {Promise<Object>}
   */
  addToCart: async (gameId) => {
    try {
      const response = await apiClient.post(`/games/${gameId}/cart`);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },
};

export default apiClient;
