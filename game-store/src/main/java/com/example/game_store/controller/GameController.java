package com.example.game_store.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.game_store.model.Game;
import com.example.game_store.service.GameService;

@RestController
@RequestMapping("/api/games")
public class GameController {

    // Dependency injections and endpoint mappings

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // Endpoint methods
    // e.g., addGame, getAllGames, getGameById, updateGame, deleteGame, searchGames

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping
    public ResponseEntity<Game> addGame(@RequestBody Game game) {
        return ResponseEntity.ok(gameService.addGame(game));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Game>> addMultipleGames(@RequestBody List<Game> games) {
        return ResponseEntity.ok(gameService.addMultipleGames(games));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody Game updatedGame) {
        Game game = gameService.updateGame(id, updatedGame);
        if (game != null) {
            return ResponseEntity.ok(game);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return ResponseEntity.noContent().build();
    }

}
