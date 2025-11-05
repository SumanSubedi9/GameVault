package com.example.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.server.model.Game;
import com.example.server.repository.GameRepository;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    // Service methods will be implemented here
    // e.g., addGame, getAllGames, getGameById, updateGame, deleteGame, searchGames,
    // etc.

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game addGame(Game game) {
        calculateDiscountPercentage(game);
        return gameRepository.save(game);
    }

    public List<Game> addMultipleGames(List<Game> games) {
        games.forEach(this::calculateDiscountPercentage);
        return gameRepository.saveAll(games);
    }

    // Private helper method to eliminate code duplication
    private void calculateDiscountPercentage(Game game) {
        if (game.getOriginalPrice() != null && game.getDiscountPrice() != null) {
            // Validate business rules
            if (game.getDiscountPrice() > game.getOriginalPrice()) {
                throw new IllegalArgumentException("Discount price cannot be higher than original price");
            }

            double percentage = ((game.getOriginalPrice() - game.getDiscountPrice()) / game.getOriginalPrice()) * 100;
            game.setDiscountPercentage((int) Math.round(percentage));
        }
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).orElse(null);
    }

    public Game updateGame(Long id, Game updatedGame) {
        return gameRepository.findById(id).map(game -> {
            game.setTitle(updatedGame.getTitle());
            game.setGenre(updatedGame.getGenre());
            game.setPlatform(updatedGame.getPlatform());

            // Update pricing fields
            game.setOriginalPrice(updatedGame.getOriginalPrice());
            game.setDiscountPrice(updatedGame.getDiscountPrice());
            game.setRating(updatedGame.getRating());
            game.setImage(updatedGame.getImage());
            game.setBadge(updatedGame.getBadge());

            // Recalculate discount percentage if both prices are provided
            if (game.getOriginalPrice() != null && game.getDiscountPrice() != null) {
                double percentage = ((game.getOriginalPrice() - game.getDiscountPrice()) / game.getOriginalPrice())
                        * 100;
                game.setDiscountPercentage((int) Math.round(percentage));
            } else {
                game.setDiscountPercentage(updatedGame.getDiscountPercentage());
            }

            return gameRepository.save(game);
        }).orElse(null);
    }

    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }

    public List<Game> searchGames(String title) {
        return gameRepository.findByTitleContainingIgnoreCase(title);
    }

    // New methods for enhanced frontend support

    /**
     * Get games on sale (with discount prices)
     */
    public List<Game> getGamesOnSale() {
        return gameRepository.findGamesOnSale();
    }

    /**
     * Get games by rating range
     */
    public List<Game> getGamesByRating(Double minRating) {
        return gameRepository.findByRatingGreaterThanEqual(minRating);
    }

    /**
     * Get games by genre
     */
    public List<Game> getGamesByGenre(String genre) {
        return gameRepository.findByGenreIgnoreCase(genre);
    }

    /**
     * Get games by platform
     */
    public List<Game> getGamesByPlatform(String platform) {
        return gameRepository.findByPlatformIgnoreCase(platform);
    }

    /**
     * Get featured games (games with specific badges)
     */
    public List<Game> getFeaturedGames() {
        return gameRepository.findByBadgeIgnoreCase("FEATURED");
    }

    /**
     * Delete all games (bulk operation for testing/admin purposes)
     * This also handles cart item cleanup automatically via database cascading
     */
    public long deleteAllGames() {
        long count = gameRepository.count();
        gameRepository.deleteAll();
        return count;
    }

    /**
     * Delete multiple games by IDs
     * Returns the number of games actually deleted
     */
    public long deleteGamesByIds(List<Long> gameIds) {
        List<Game> existingGames = gameRepository.findAllById(gameIds);
        gameRepository.deleteAllById(gameIds);
        return existingGames.size();
    }

}
