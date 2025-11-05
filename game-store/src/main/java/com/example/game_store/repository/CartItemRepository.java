package com.example.game_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.game_store.model.CartItem;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    /**
     * Find all cart items for a specific user
     * 
     * @param userId the user ID
     * @return list of cart items for the user
     */
    List<CartItem> findByUserId(Long userId);

    /**
     * Find a specific cart item by user ID and game ID
     * 
     * @param userId the user ID
     * @param gameId the game ID
     * @return optional cart item
     */
    Optional<CartItem> findByUserIdAndGameId(Long userId, Long gameId);

    /**
     * Check if a game is already in user's cart
     * 
     * @param userId the user ID
     * @param gameId the game ID
     * @return true if game is in cart, false otherwise
     */
    boolean existsByUserIdAndGameId(Long userId, Long gameId);

    /**
     * Delete all cart items for a specific user
     * 
     * @param userId the user ID
     */
    @Modifying
    @Transactional
    void deleteByUserId(Long userId);

    /**
     * Delete a specific cart item by user ID and game ID
     * 
     * @param userId the user ID
     * @param gameId the game ID
     */
    @Modifying
    @Transactional
    void deleteByUserIdAndGameId(Long userId, Long gameId);

    /**
     * Count total items in user's cart
     * 
     * @param userId the user ID
     * @return total number of items
     */
    @Query("SELECT COALESCE(SUM(c.quantity), 0) FROM CartItem c WHERE c.userId = :userId")
    Integer getTotalItemsByUserId(@Param("userId") Long userId);

    /**
     * Calculate total price of all items in user's cart
     * Uses discount price if available, otherwise original price
     */
    @Query("SELECT COALESCE(SUM(c.quantity * (CASE WHEN c.game.discountPrice IS NOT NULL THEN c.game.discountPrice ELSE c.game.originalPrice END)), 0.0) FROM CartItem c WHERE c.userId = :userId")
    Double getTotalCartValue(@Param("userId") Long userId);
}
