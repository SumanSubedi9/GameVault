package com.example.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.exception.CartException;
import com.example.server.exception.EntityNotFoundException;
import com.example.server.model.CartItem;
import com.example.server.model.Game;
import com.example.server.repository.CartItemRepository;
import com.example.server.repository.GameRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private GameRepository gameRepository;

    /**
     * Add a game to user's cart (supports "Add to Cart" button)
     * 
     * @param userId the logged-in user ID
     * @param gameId the game to add
     * @return success message or cart item details
     */
    public CartItem addToCart(Long userId, Long gameId) {
        // Validate inputs
        if (userId == null || gameId == null) {
            throw new IllegalArgumentException("User ID and Game ID are required");
        }

        // Check if game exists
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + gameId));

        // Check if game is already in cart
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndGameId(userId, gameId);

        if (existingItem.isPresent()) {
            // If already in cart, increase quantity by 1
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + 1);
            return cartItemRepository.save(item);
        } else {
            // Create new cart item with quantity 1
            CartItem newItem = new CartItem();
            newItem.setUserId(userId);
            newItem.setGame(game);
            newItem.setQuantity(1);
            return cartItemRepository.save(newItem);
        }
    }

    /**
     * Get cart item count for navigation display
     * 
     * @param userId the logged-in user ID
     * @return total number of items in cart
     */
    public Integer getCartItemCount(Long userId) {
        Integer count = cartItemRepository.getTotalItemsByUserId(userId);
        return count != null ? count : 0;
    }

    /**
     * Get all cart items for the user
     * 
     * @param userId the logged-in user ID
     * @return list of cart items
     */
    public List<CartItem> getCartItems(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    /**
     * Remove a game from cart
     * 
     * @param userId the logged-in user ID
     * @param gameId the game to remove
     */
    public void removeFromCart(Long userId, Long gameId) {
        cartItemRepository.deleteByUserIdAndGameId(userId, gameId);
    }

    /**
     * Update quantity of a cart item
     * 
     * @param userId   the logged-in user ID
     * @param gameId   the game ID
     * @param quantity new quantity
     * @return updated cart item
     */
    public CartItem updateQuantity(Long userId, Long gameId, Integer quantity) {
        // Validate inputs
        if (userId == null || gameId == null || quantity == null) {
            throw new IllegalArgumentException("User ID, Game ID, and quantity are required");
        }

        if (quantity <= 0) {
            removeFromCart(userId, gameId);
            return null;
        }

        CartItem item = cartItemRepository.findByUserIdAndGameId(userId, gameId)
                .orElseThrow(
                        () -> new CartException("Item not found in cart for user " + userId + " and game " + gameId));

        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    /**
     * Get cart total value
     * 
     * @param userId the logged-in user ID
     * @return total cart value
     */
    public Double getCartTotal(Long userId) {
        Double total = cartItemRepository.getTotalCartValue(userId);
        return total != null ? total : 0.0;
    }
}
