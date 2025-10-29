package com.example.game_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.game_store.model.Game;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    // ==================== BASIC SEARCH ====================

    /**
     * Find games by title (case-insensitive partial match)
     */
    @Query("SELECT g FROM Game g WHERE LOWER(g.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Game> findByTitleContainingIgnoreCase(@Param("title") String title);

    // ==================== ENHANCED SEARCH METHODS ====================

    /**
     * Find games on sale (discount price is not null and less than original price)
     */
    @Query("SELECT g FROM Game g WHERE g.discountPrice IS NOT NULL AND g.discountPrice < g.originalPrice")
    List<Game> findGamesOnSale();

    /**
     * Find games by minimum rating
     */
    List<Game> findByRatingGreaterThanEqual(Double minRating);

    /**
     * Find games by genre (case-insensitive)
     */
    List<Game> findByGenreIgnoreCase(String genre);

    /**
     * Find games by platform (case-insensitive)
     */
    List<Game> findByPlatformIgnoreCase(String platform);

    /**
     * Find games by badge (case-insensitive)
     */
    List<Game> findByBadgeIgnoreCase(String badge);

    /**
     * Find games by price range (using current price logic)
     */
    @Query("SELECT g FROM Game g WHERE (CASE WHEN g.discountPrice IS NOT NULL THEN g.discountPrice ELSE g.originalPrice END) BETWEEN :minPrice AND :maxPrice")
    List<Game> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);

    // ==================== UTILITY METHODS ====================

    /**
     * Check if a game with the given title exists (case-insensitive)
     */
    boolean existsByTitleIgnoreCase(String title);
}
