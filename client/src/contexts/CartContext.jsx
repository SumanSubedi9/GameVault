/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { cartAPI } from "../api/cartAPI";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { authenticated, user } = useAuth();

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();

      // Handle different response formats
      let items = [];
      if (Array.isArray(response)) {
        items = response;
      } else if (response && Array.isArray(response.items)) {
        items = response.items;
      } else if (response && Array.isArray(response.cartItems)) {
        items = response.cartItems;
      } else if (response && Array.isArray(response.data)) {
        items = response.data;
      } else {
        items = [];
      }

      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCartCount = async () => {
    try {
      const count = await cartAPI.getCartCount();
      setCartCount(count);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    }
  };

  // Fetch cart data when user is authenticated
  useEffect(() => {
    if (authenticated && user) {
      fetchCart();
      fetchCartCount();
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  }, [authenticated, user, fetchCart]);

  const addToCart = useCallback(
    async (gameId, quantity = 1) => {
      try {
        if (!authenticated) {
          throw new Error("Please log in to add items to cart");
        }

        setLoading(true);
        await cartAPI.addToCart({ gameId, quantity });

        // Refresh cart data
        await fetchCart();
        await fetchCartCount();

        return { success: true, message: "Item added to cart successfully!" };
      } catch (error) {
        console.error("Error adding to cart:", error);
        return { success: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    [authenticated, fetchCart]
  );

  const updateCartItem = useCallback(
    async (cartItemId, quantity) => {
      try {
        setLoading(true);

        // Find the cart item to get the gameId
        const cartItem = cartItems.find((item) => item.id === cartItemId);

        if (!cartItem) {
          throw new Error("Cart item not found");
        }

        // Use gameId instead of cartItemId
        const gameId = cartItem.game?.id || cartItem.gameId;
        if (!gameId) {
          throw new Error("Game ID not found in cart item");
        }

        await cartAPI.updateCartItem({ gameId, quantity });

        // Refresh cart data
        await fetchCart();
        await fetchCartCount();

        return { success: true, message: "Cart updated successfully!" };
      } catch (error) {
        console.error("Error updating cart:", error);
        return { success: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    [cartItems, fetchCart]
  );

  const removeFromCart = useCallback(
    async (cartItemId) => {
      try {
        setLoading(true);

        // Find the cart item to get the gameId
        const cartItem = cartItems.find((item) => item.id === cartItemId);

        if (!cartItem) {
          throw new Error("Cart item not found");
        }

        // Use gameId instead of cartItemId
        const gameId = cartItem.game?.id || cartItem.gameId;
        if (!gameId) {
          throw new Error("Game ID not found in cart item");
        }

        await cartAPI.removeFromCart(gameId);

        // Refresh cart data
        await fetchCart();
        await fetchCartCount();

        return { success: true, message: "Item removed successfully!" };
      } catch (error) {
        console.error("Error removing from cart:", error);
        return { success: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    [cartItems, fetchCart]
  );

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  const value = {
    cartItems,
    cartCount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    fetchCart,
    fetchCartCount,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
