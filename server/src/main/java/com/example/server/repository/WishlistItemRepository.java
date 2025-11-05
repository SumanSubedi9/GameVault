package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.server.model.WishlistItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    /**
     * Find all wishlist items for a specific user
     */
    List<WishlistItem> findByUserId(Long userId);

    /**
     * Find a specific wishlist item by user and game
     */
    Optional<WishlistItem> findByUserIdAndGameId(Long userId, Long gameId);

    /**
     * Delete a wishlist item by user and game
     */
    @Modifying
    @Transactional
    void deleteByUserIdAndGameId(Long userId, Long gameId);

    /**
     * Check if a game is in user's wishlist
     */
    boolean existsByUserIdAndGameId(Long userId, Long gameId);

    /**
     * Get wishlist count for a user
     */
    @Query("SELECT COUNT(w) FROM WishlistItem w WHERE w.userId = :userId")
    Integer getWishlistCountByUserId(@Param("userId") Long userId);
}