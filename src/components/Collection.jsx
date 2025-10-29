import React, { useState } from "react";
import GameCard from "./GameCard";
import { useGames } from "../hooks/useGames";

const Collection = () => {
  const { games, loading, error } = useGames();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterBy, setFilterBy] = useState("all");

  // Filter games based on search and category
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "sale" && game.discountPercentage > 0) ||
      (filterBy === "free" &&
        (game.originalPrice === 0 || game.badge === "FREE")) ||
      (filterBy === "new" && game.badge === "NEW") ||
      (filterBy === "bestseller" && game.rating >= 4.5);

    return matchesSearch && matchesFilter;
  });

  // Sort games
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title?.localeCompare(b.title) || 0;
      case "price-low":
        return (
          (a.discountPrice || a.originalPrice) -
          (b.discountPrice || b.originalPrice)
        );
      case "price-high":
        return (
          (b.discountPrice || b.originalPrice) -
          (a.discountPrice || a.originalPrice)
        );
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "discount":
        return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your game collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-700 text-white p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Collection</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Game Collection</h1>
        <p className="text-gray-400">
          Browse all {games.length} games in our catalog
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          {/* Category Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Games</option>
            <option value="sale">On Sale</option>
            <option value="free">Free Games</option>
            <option value="new">New Releases</option>
            <option value="bestseller">Bestsellers</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="title">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {sortedGames.length} of {games.length} games
          {searchTerm && ` for "${searchTerm}"`}
          {filterBy !== "all" && ` in ${filterBy}`}
        </p>
      </div>

      {/* Games Grid */}
      {sortedGames.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-16 w-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            No games found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedGames.map((game) => (
            <GameCard key={game.id} game={game} variant="collection" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
