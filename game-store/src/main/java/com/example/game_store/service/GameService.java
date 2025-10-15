package com.example.game_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.game_store.model.Game;
import com.example.game_store.repository.GameRepository;

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
        // Business logic can be added here (e.g., checking for duplicates)
        return gameRepository.save(game);
    }

    public List<Game> addMultipleGames(List<Game> games) {
        return gameRepository.saveAll(games);
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).orElse(null);
    }

    public Game updateGame(Long id, Game updatedGame) {
        return gameRepository.findById(id).map(game -> {
            game.setTitle(updatedGame.getTitle());
            game.setGenre(updatedGame.getGenre());
            game.setPlatform(updatedGame.getPlatform());
            game.setPrice(updatedGame.getPrice());
            return gameRepository.save(game);
        }).orElse(null);
    }

    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }

    public List<Game> searchGames(String title) {
        return gameRepository.findByTitleContainingIgnoreCase(title);
    }

}
