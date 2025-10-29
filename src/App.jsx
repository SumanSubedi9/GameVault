import React from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import GameSection from "./components/GameSection";
import Collection from "./components/Collection";
import { useGames, useGameCategories } from "./hooks/useGames";

// Simple routing based on hash
const useHashRouter = () => {
  const [currentHash, setCurrentHash] = React.useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return currentHash;
};

// Home page component
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
            seeMoreLink="#collection"
          />
          <GameSection
            title="🆓 Free to Play"
            games={freeGames}
            seeMoreLink="#collection"
          />
          <GameSection
            title="⭐ Popular Games"
            games={popularGames}
            seeMoreLink="#collection"
          />
        </div>
      )}
    </>
  );
};

// App fetches from your Spring Boot backend using Axios
// API: GET /api/games - returns all games from your catalog
// Frontend filters/categorizes on the client side

function App() {
  const currentHash = useHashRouter();

  const renderPage = () => {
    switch (currentHash) {
      case "#collection":
        return <Collection />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      <div className="w-full py-8">{renderPage()}</div>
    </Layout>
  );
}

export default App;
