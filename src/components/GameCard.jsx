const GameCard = ({ game, variant = "default" }) => {
  const {
    title,
    originalPrice,
    discountPrice,
    discountPercentage,
    rating,
    image,
    badge,
    isWishlisted = false,
    isInCart = false,
  } = game;

  const hasDiscount = discountPercentage > 0;
  const displayPrice = hasDiscount ? discountPrice : originalPrice;

  return (
    <div
      className={`
      group relative bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${
        variant === "featured"
          ? "w-80 h-96"
          : variant === "collection"
          ? "w-full h-96"
          : "w-64 h-80"
      }
    `}
    >
      {/* Game Image */}
      <div
        className={`relative overflow-hidden ${
          variant === "collection" ? "h-56" : "h-48"
        }`}
      >
        <img
          src={
            image ||
            "https://via.placeholder.com/400x300/1f2937/9ca3af?text=Game+Image"
          }
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Badges */}
        {badge && (
          <div className="absolute top-2 left-2">
            <span
              className={`
              px-2 py-1 text-xs font-semibold rounded
              ${badge === "NEW" ? "bg-green-600 text-white" : ""}
              ${badge === "SALE" ? "bg-red-600 text-white" : ""}
              ${badge === "FREE" ? "bg-blue-600 text-white" : ""}
              ${badge === "EARLY ACCESS" ? "bg-yellow-600 text-black" : ""}
              ${badge === "GOOD OLD GAME" ? "bg-purple-600 text-white" : ""}
            `}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2">
            <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold rounded">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className={`
            absolute bottom-2 right-2 p-2 rounded-full transition-all duration-200
            ${
              isWishlisted
                ? "bg-red-600 text-white"
                : "bg-black/50 text-gray-300 hover:bg-red-600 hover:text-white"
            }
          `}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      {/* Game Info */}
      <div className="p-4 flex flex-col h-40">
        {/* Title */}
        <h3 className="text-white font-semibold text-sm leading-tight h-10 overflow-hidden group-hover:text-purple-400 transition-colors mb-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="mb-2 h-5">
          {rating ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(rating)
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
              <span className="text-gray-400 text-xs">{rating.toFixed(1)}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {hasDiscount && (
              <span className="text-gray-500 text-sm line-through">
                ${originalPrice}
              </span>
            )}
            <span
              className={`font-bold ${
                hasDiscount ? "text-green-400" : "text-white"
              }`}
            >
              ${displayPrice}
            </span>
          </div>
        </div>

        {/* Add to Cart Button - Always at bottom */}
        <div className="mt-auto">
          <button
            className={`
              w-full py-2 px-4 rounded text-sm font-medium transition-all duration-200
              ${
                isInCart
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }
            `}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default GameCard;
