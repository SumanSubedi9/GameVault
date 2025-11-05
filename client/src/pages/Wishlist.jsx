import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import GameCard from "../components/GameCard";

const Wishlist = () => {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { authenticated } = useAuth();
  const { addToast } = useToast();

  const handleRemoveFromWishlist = async (gameId, gameTitle) => {
    try {
      const result = await removeFromWishlist(gameId);
      if (result.success) {
        addToast(`${gameTitle} removed from wishlist!`, "success");
      } else {
        addToast(result.message || "Failed to remove from wishlist", "error");
      }
    } catch {
      addToast("Failed to remove from wishlist", "error");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="w-20 h-20 bg-linear-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Please Log In
          </h2>
          <p className="text-gray-400 mb-6">
            You need to be logged in to view your wishlist.
          </p>
          <a
            href="/login"
            className="bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Log In Now
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute top-2 left-2 w-16 h-16 border-4 border-t-red-500 border-r-pink-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-2">
            Loading Your Wishlist
          </h2>
          <p className="text-gray-400">
            Just a moment while we fetch your favorite games...
          </p>
        </div>
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl max-w-md">
          <div className="w-20 h-20 bg-linear-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-400 mb-6">
            Start exploring games and click the heart icon to add them to your
            wishlist!
          </p>
          <a
            href="/"
            className="inline-block bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{
              color: "#ffff",
              textShadow: "1px 1px 2px rgba(255,255,255,0.5)",
            }}
          >
            Browse Games
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            {wishlistItems.length} game{wishlistItems.length !== 1 ? "s" : ""}{" "}
            in your wishlist
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlistItems.map((item, index) => {
            // Handle different possible structures
            const game = item.game || item;
            const gameId = item.game?.id || item.gameId || item.game_id;
            const wishlistItemId = item.id;
            const gameTitle =
              game.title || game.name || game.gameName || "Unknown Game";

            return (
              <div key={wishlistItemId || index} className="relative">
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(gameId, gameTitle)}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95"
                  title="Remove from wishlist"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Game Card */}
                <GameCard
                  game={{
                    id: gameId,
                    title: gameTitle,
                    originalPrice:
                      game.originalPrice || game.price || game.basePrice || 0,
                    discountPrice: game.discountPrice || game.salePrice,
                    discountPercentage:
                      game.discountPercentage || game.discount || 0,
                    rating: game.rating || game.averageRating,
                    image: game.image || game.imageUrl || game.thumbnail,
                    badge: game.badge || game.tag,
                  }}
                  variant="collection"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
