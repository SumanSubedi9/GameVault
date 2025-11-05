/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { wishlistAPI } from "../api/wishlistAPI";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState({}); // gameId -> boolean mapping
  const [loading, setLoading] = useState(false);
  const { authenticated } = useAuth();

  // Fetch complete wishlist
  const fetchWishlist = useCallback(async () => {
    if (!authenticated) {
      setWishlistItems([]);
      setWishlistStatus({});
      return;
    }

    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist();

      // Handle different response formats
      let items = [];
      if (Array.isArray(response)) {
        items = response;
      } else if (response && response.items && Array.isArray(response.items)) {
        items = response.items;
      } else if (response && response.games && Array.isArray(response.games)) {
        items = response.games;
      } else if (response && response.data && Array.isArray(response.data)) {
        items = response.data;
      } else {
        items = [];
      }

      setWishlistItems(items);

      // Update status mapping
      const statusMap = {};
      items.forEach((item) => {
        const gameId = item.game?.id || item.gameId || item.game_id;
        if (gameId) {
          statusMap[gameId] = true;
        }
      });
      setWishlistStatus(statusMap);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
      setWishlistStatus({});
    } finally {
      setLoading(false);
    }
  }, [authenticated]);

  // Toggle wishlist status
  const toggleWishlist = useCallback(
    async (gameId) => {
      if (!authenticated) {
        return { success: false, message: "Please log in to use wishlist" };
      }

      try {
        setLoading(true);

        // Check current status before toggle
        const wasInWishlist = wishlistStatus[gameId] || false;

        await wishlistAPI.toggleWishlist(gameId);

        // Determine new status - if it was in wishlist, now it's removed, and vice versa
        const newStatus = !wasInWishlist;

        setWishlistStatus((prev) => ({
          ...prev,
          [gameId]: newStatus,
        }));

        // Refresh wishlist
        await fetchWishlist();

        return {
          success: true,
          message: newStatus ? "Added to wishlist!" : "Removed from wishlist!",
          added: newStatus,
        };
      } catch (error) {
        console.error("Error toggling wishlist:", error);
        return { success: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    [authenticated, fetchWishlist, wishlistStatus]
  );

  // Check if a game is in wishlist (local check)
  const isInWishlist = useCallback(
    (gameId) => {
      return wishlistStatus[gameId] || false;
    },
    [wishlistStatus]
  );

  // Remove from wishlist
  const removeFromWishlist = useCallback(
    async (gameId) => {
      if (!authenticated) {
        return { success: false, message: "Please log in to use wishlist" };
      }

      try {
        setLoading(true);

        // Check if it's currently in wishlist
        if (!wishlistStatus[gameId]) {
          return { success: false, message: "Game is not in wishlist" };
        }

        // Use toggle endpoint to remove
        await wishlistAPI.toggleWishlist(gameId);

        // Update local state immediately
        setWishlistItems((prev) =>
          prev.filter((item) => {
            const itemGameId = item.game?.id || item.gameId || item.game_id;
            return itemGameId != gameId;
          })
        );

        setWishlistStatus((prev) => ({
          ...prev,
          [gameId]: false,
        }));

        // Refresh wishlist
        await fetchWishlist();

        return {
          success: true,
          message: "Removed from wishlist!",
          removed: true,
        };
      } catch (error) {
        console.error("Error removing from wishlist:", error);
        return { success: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    [authenticated, fetchWishlist, wishlistStatus]
  );

  // Clear wishlist (for logout)
  const clearWishlist = () => {
    setWishlistItems([]);
    setWishlistStatus({});
  };

  // Fetch wishlist when user logs in
  useEffect(() => {
    if (authenticated) {
      fetchWishlist();
    } else {
      clearWishlist();
    }
  }, [authenticated, fetchWishlist]);

  const value = {
    wishlistItems,
    wishlistStatus,
    loading,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
