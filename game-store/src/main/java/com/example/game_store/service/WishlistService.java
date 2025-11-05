package com.example.game_store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.game_store.model.Game;
import com.example.game_store.model.WishlistItem;
import com.example.game_store.repository.GameRepository;
import com.example.game_store.repository.WishlistItemRepository;
import com.example.game_store.exception.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    @Autowired
    private WishlistItemRepository wishlistRepository;

    @Autowired
    private GameRepository gameRepository;

    /**
     * Add a game to user's wishlist
     */
    public WishlistItem addToWishlist(Long userId, Long gameId) {
        // Validate inputs
        if (userId == null || gameId == null) {
            throw new IllegalArgumentException("User ID and Game ID are required");
        }

        // Check if game exists
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + gameId));

        // Check if game is already in wishlist
        Optional<WishlistItem> existingItem = wishlistRepository.findByUserIdAndGameId(userId, gameId);
        if (existingItem.isPresent()) {
            throw new IllegalArgumentException("Game is already in your wishlist");
        }

        // Create new wishlist item
        WishlistItem wishlistItem = new WishlistItem();
        wishlistItem.setUserId(userId);
        wishlistItem.setGame(game);

        return wishlistRepository.save(wishlistItem);
    }

    /**
     * Remove a game from user's wishlist
     */
    @Transactional
    public void removeFromWishlist(Long userId, Long gameId) {
        if (!wishlistRepository.existsByUserIdAndGameId(userId, gameId)) {
            throw new EntityNotFoundException("Game not found in your wishlist");
        }
        wishlistRepository.deleteByUserIdAndGameId(userId, gameId);
    }

    /**
     * Get all wishlist items for a user
     */
    public List<WishlistItem> getWishlistItems(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    /**
     * Check if a game is in user's wishlist
     */
    public boolean isInWishlist(Long userId, Long gameId) {
        return wishlistRepository.existsByUserIdAndGameId(userId, gameId);
    }

    /**
     * Get wishlist count for a user
     */
    public Integer getWishlistCount(Long userId) {
        Integer count = wishlistRepository.getWishlistCountByUserId(userId);
        return count != null ? count : 0;
    }

    /**
     * Toggle wishlist status (add if not present, remove if present)
     */
    @Transactional
    public boolean toggleWishlist(Long userId, Long gameId) {
        if (isInWishlist(userId, gameId)) {
            removeFromWishlist(userId, gameId);
            return false; // Removed from wishlist
        } else {
            addToWishlist(userId, gameId);
            return true; // Added to wishlist
        }
    }
}