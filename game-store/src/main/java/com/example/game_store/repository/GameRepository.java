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
     * 
     * @param title the title to search for
     * @return list of games containing the title
     */
    @Query("SELECT g FROM Game g WHERE LOWER(g.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Game> findByTitleContainingIgnoreCase(@Param("title") String title);

    // ==================== UTILITY METHODS ====================

    /**
     * Check if a game with the given title exists (case-insensitive)
     * 
     * @param title the title to check
     * @return true if game exists, false otherwise
     */
    boolean existsByTitleIgnoreCase(String title);

}
