package com.example.server.controller;

import java.util.List;
// import java.util.Map;
// import java.util.HashMap;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.model.Game;
import com.example.server.service.GameService;

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

    // @PostMapping
    // public ResponseEntity<Game> addGame(@RequestBody Game game) {
    // return ResponseEntity.ok(gameService.addGame(game));
    // }

    // @PostMapping("/bulk")
    // public ResponseEntity<List<Game>> addMultipleGames(@RequestBody List<Game>
    // games) {
    // return ResponseEntity.ok(gameService.addMultipleGames(games));
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody
    // Game updatedGame) {
    // Game game = gameService.updateGame(id, updatedGame);
    // if (game != null) {
    // return ResponseEntity.ok(game);
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Map<String, Object>> deleteGame(@PathVariable Long id)
    // {
    // gameService.deleteGame(id);

    // Map<String, Object> response = new HashMap<>();
    // response.put("success", true);
    // response.put("message", "Game deleted successfully");

    // return ResponseEntity.ok(response);
    // }

    /**
     * Delete all games (bulk delete for testing/admin purposes)
     * DELETE /api/games/bulk/all
     */
    // @DeleteMapping("/bulk/all")
    // public ResponseEntity<Map<String, Object>> deleteAllGames() {
    // long deletedCount = gameService.deleteAllGames();

    // Map<String, Object> response = new HashMap<>();
    // response.put("success", true);
    // response.put("message", "All games deleted successfully");
    // response.put("deletedCount", deletedCount);

    // return ResponseEntity.ok(response);
    // }

    /**
     * Delete multiple games by IDs
     * DELETE /api/games/bulk
     * Body: {"gameIds": [1, 2, 3, 4]}
     */
    // @DeleteMapping("/bulk")
    // public ResponseEntity<Map<String, Object>> deleteGamesByIds(@RequestBody
    // Map<String, Object> request) {
    // @SuppressWarnings("unchecked")
    // List<Integer> gameIds = (List<Integer>) request.get("gameIds");

    // if (gameIds == null || gameIds.isEmpty()) {
    // Map<String, Object> response = new HashMap<>();
    // response.put("success", false);
    // response.put("message", "No game IDs provided");
    // return ResponseEntity.badRequest().body(response);
    // }

    // // Convert Integer list to Long list
    // List<Long> longGameIds = gameIds.stream().map(Integer::longValue).toList();
    // long deletedCount = gameService.deleteGamesByIds(longGameIds);

    // Map<String, Object> response = new HashMap<>();
    // response.put("success", true);
    // response.put("message", "Games deleted successfully");
    // response.put("deletedCount", deletedCount);
    // response.put("requestedIds", gameIds);

    // return ResponseEntity.ok(response);
    // }

    // ==================== ENHANCED ENDPOINTS ====================

    /**
     * Get games on sale
     * GET /api/games/sale
     */
    @GetMapping("/sale")
    public List<Game> getGamesOnSale() {
        return gameService.getGamesOnSale();
    }

    /**
     * Get games by genre
     * GET /api/games/genre/{genre}
     */
    @GetMapping("/genre/{genre}")
    public List<Game> getGamesByGenre(@PathVariable String genre) {
        return gameService.getGamesByGenre(genre);
    }

    /**
     * Get games by platform
     * GET /api/games/platform/{platform}
     */
    @GetMapping("/platform/{platform}")
    public List<Game> getGamesByPlatform(@PathVariable String platform) {
        return gameService.getGamesByPlatform(platform);
    }

    /**
     * Get featured games
     * GET /api/games/featured
     */
    @GetMapping("/featured")
    public List<Game> getFeaturedGames() {
        return gameService.getFeaturedGames();
    }

    /**
     * Get games by minimum rating
     * GET /api/games/rating/{minRating}
     */
    @GetMapping("/rating/{minRating}")
    public List<Game> getGamesByRating(@PathVariable Double minRating) {
        return gameService.getGamesByRating(minRating);
    }

}
