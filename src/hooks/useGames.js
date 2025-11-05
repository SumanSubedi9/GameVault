import { useState, useEffect } from "react";
import { gamesAPI } from "../api/gamesAPI";

/**
 * Custom hook for fetching and managing games data
 * @returns {Object} { games, loading, error, refetch }
 */
export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await gamesAPI.getAllGames();
      setGames(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    loading,
    error,
    refetch: fetchGames,
  };
};

/**
 * Custom hook for categorizing games
 * @param {Array} games - Array of game objects
 * @returns {Object} Categorized games object
 */
export const useGameCategories = (games) => {
  const featuredGames = games.filter((game) => game.featured).slice(0, 3);

  // SALE games - games with discounts
  const saleGames = games
    .filter((game) => game.discountPercentage > 0 || game.badge === "SALE")
    .slice(0, 8);

  // FREE games - completely free games
  const freeGames = games
    .filter((game) => game.originalPrice === 0 || game.badge === "FREE")
    .slice(0, 6);

  // POPULAR games - high-rated games (4.5+ rating)
  const popularGames = games
    .filter((game) => game.rating >= 4.5)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);

  return {
    featuredGames,
    saleGames,
    freeGames,
    popularGames,
  };
};
