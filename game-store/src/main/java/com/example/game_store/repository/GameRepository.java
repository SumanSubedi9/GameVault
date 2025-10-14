package com.example.game_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.game_store.model.Game;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Game findById(long id);

    @Query("SELECT g FROM Game g WHERE LOWER(g.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Game> findByTitle(@Param("title") String title);

}
