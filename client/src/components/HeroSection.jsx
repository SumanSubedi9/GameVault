import { useState, useEffect } from "react";

const HeroSection = ({ featuredGames }) => {
  const [currentGame, setCurrentGame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGame((prev) => (prev + 1) % featuredGames.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const game = featuredGames[currentGame];

  if (!game) return null;

  return (
    <section className="relative h-96 mb-12 overflow-hidden rounded-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${game.image})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg">
            {/* Badge */}
            {game.badge && (
              <div className="mb-4">
                <span
                  className={`
                  px-3 py-1 text-sm font-semibold rounded-full
                  ${game.badge === "NEW" ? "bg-green-600 text-white" : ""}
                  ${game.badge === "SALE" ? "bg-red-600 text-white" : ""}
                  ${game.badge === "FREE" ? "bg-blue-600 text-white" : ""}
                  ${
                    game.badge === "EARLY ACCESS"
                      ? "bg-yellow-600 text-black"
                      : ""
                  }
                  ${
                    game.badge === "GOOD OLD GAME"
                      ? "bg-purple-600 text-white"
                      : ""
                  }
                `}
                >
                  {game.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {game.title}
            </h1>

            {/* Rating */}
            {game.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(game.rating)
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white text-lg font-medium">
                  {game.rating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              {game.discountPercentage > 0 && (
                <span className="bg-green-600 text-white px-3 py-1 text-lg font-bold rounded">
                  -{game.discountPercentage}%
                </span>
              )}
              <div className="flex items-center space-x-2">
                {game.discountPercentage > 0 && (
                  <span className="text-gray-400 text-lg line-through">
                    ${game.originalPrice}
                  </span>
                )}
                <span className="text-white text-2xl font-bold">
                  $
                  {game.discountPercentage > 0
                    ? game.discountPrice
                    : game.originalPrice}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Add to Cart
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Game Navigation Dots */}
        <div className="absolute bottom-6 right-6 flex space-x-2">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGame(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentGame
                  ? "bg-purple-500"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
