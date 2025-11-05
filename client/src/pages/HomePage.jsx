import React from "react";
import HeroSection from "../components/HeroSection";
import GameSection from "../components/GameSection";
import { useGames, useGameCategories } from "../hooks/useGames";

const HomePage = () => {
  const { games, loading, error } = useGames();
  const { featuredGames, saleGames, freeGames, popularGames } =
    useGameCategories(games);

  return (
    <>
      {error && (
        <div className="bg-red-700 text-white p-4 rounded mb-6 mx-4">
          Error loading games: {error}
        </div>
      )}

      {/* Hero Section */}
      <HeroSection featuredGames={featuredGames} />

      {/* If loading show simple placeholders */}
      {loading ? (
        <div className="text-gray-300 text-center py-8">
          <div className="animate-pulse">Loading games...</div>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <GameSection
            title="🔥 On Sale"
            games={saleGames}
            seeMoreLink="/collection"
          />
          <GameSection
            title="🆓 Free to Play"
            games={freeGames}
            seeMoreLink="/collection"
          />
          <GameSection
            title="⭐ Popular Games"
            games={popularGames}
            seeMoreLink="/collection"
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
