import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const Cart = () => {
  const { cartItems = [], loading, removeFromCart, updateCartItem } = useCart();
  const { authenticated } = useAuth();
  const { addToast } = useToast();

  // Ensure cartItems is always an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  // Check if cart is empty
  const isEmptyCart = safeCartItems.length === 0;

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const result = await removeFromCart(cartItemId);
      if (result.success) {
        addToast("Item removed from cart", "success");
      } else {
        addToast(result.message || "Failed to remove item", "error");
      }
    } catch {
      addToast("Failed to remove item", "error");
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const result = await updateCartItem(cartItemId, newQuantity);
      if (result.success) {
        addToast("Cart updated successfully", "success");
      } else {
        addToast(result.message || "Failed to update cart", "error");
      }
    } catch {
      addToast("Failed to update cart", "error");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Please Log In
          </h2>
          <p className="text-gray-400 mb-6">
            You need to be logged in to view your cart.
          </p>
          <a
            href="/login"
            className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
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
            <div className="absolute top-2 left-2 w-16 h-16 border-4 border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Loading Your Cart
          </h2>
          <p className="text-gray-400">
            Just a moment while we fetch your games...
          </p>
        </div>
      </div>
    );
  }

  if (isEmptyCart) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 rounded-2xl p-12 border border-gray-700 shadow-2xl max-w-md">
          <div className="w-24 h-24 bg-linear-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Discover amazing games and start building your collection today!
          </p>
          <a
            href="/"
            className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Browse Games
          </a>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return safeCartItems.reduce((total, item) => {
      const price = item.game?.discountPrice || item.game?.originalPrice || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-4 sm:py-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4 leading-tight py-2">
            Shopping Cart
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            {safeCartItems.length}{" "}
            {safeCartItems.length === 1 ? "game" : "games"} ready for checkout
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Games List Section */}
          <div className="flex-1 lg:w-0">
            <div className="space-y-4 sm:space-y-6">
              {safeCartItems.map((cartItem) => (
                <div key={cartItem.id} className="group">
                  {/* Horizontal Game Card */}
                  <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 p-6">
                    <div className="flex items-center gap-6">
                      {/* Game Image */}
                      <div className="relative shrink-0">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-lg">
                          <img
                            src={
                              cartItem.game?.image ||
                              "https://via.placeholder.com/160x160/1f2937/9ca3af?text=Game"
                            }
                            alt={cartItem.game?.title || "Game"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {/* Quantity Badge */}
                        <div className="absolute -top-2 -right-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          {cartItem.quantity}
                        </div>
                      </div>

                      {/* Game Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 truncate">
                          {cartItem.game?.title || "Unknown Game"}
                        </h3>

                        {/* Price Section */}
                        <div className="flex items-center gap-3 mb-4">
                          {cartItem.game?.discountPrice &&
                          cartItem.game.discountPrice <
                            cartItem.game.originalPrice ? (
                            <>
                              <span className="text-2xl font-bold text-green-400">
                                ${cartItem.game.discountPrice.toFixed(2)}
                              </span>
                              <span className="text-lg text-gray-400 line-through">
                                ${cartItem.game.originalPrice.toFixed(2)}
                              </span>
                              <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                                -
                                {Math.round(
                                  ((cartItem.game.originalPrice -
                                    cartItem.game.discountPrice) /
                                    cartItem.game.originalPrice) *
                                    100
                                )}
                                % OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-white">
                              ${(cartItem.game?.originalPrice || 0).toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Game Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                          {cartItem.game?.genre && (
                            <span className="bg-gray-700 px-3 py-1 rounded-full">
                              {cartItem.game.genre}
                            </span>
                          )}
                          {cartItem.game?.platform && (
                            <span className="bg-gray-700 px-3 py-1 rounded-full">
                              {cartItem.game.platform}
                            </span>
                          )}
                          {cartItem.game?.rating && (
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>{cartItem.game.rating}/5</span>
                            </div>
                          )}
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-sm text-gray-400 mb-1">Subtotal</p>
                          <p className="text-xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                            $
                            {(
                              (cartItem.game?.discountPrice ||
                                cartItem.game?.originalPrice ||
                                0) * cartItem.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-center gap-4 shrink-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.id,
                                cartItem.quantity - 1
                              )
                            }
                            disabled={cartItem.quantity <= 1}
                            className="p-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 group"
                          >
                            <svg
                              className="w-5 h-5 transition-transform duration-200 group-hover:rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M20 12H4"
                              />
                            </svg>
                          </button>

                          <span className="text-white font-bold text-xl min-w-12 text-center">
                            {cartItem.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.id,
                                cartItem.quantity + 1
                              )
                            }
                            className="p-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 group"
                          >
                            <svg
                              className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveFromCart(cartItem.id)}
                          className="p-4 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-110 hover:shadow-red-500/50 active:scale-95 group"
                          title="Remove from cart"
                        >
                          <svg
                            className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 text-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Continue Shopping
              </a>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-80 lg:shrink-0">
            <div className="sticky top-8">
              <div className="bg-linear-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 sm:p-8 shadow-2xl">
                {/* Summary Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Order Summary
                  </h3>
                  <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-green-400 to-blue-500 mx-auto mt-2 sm:mt-3 rounded-full"></div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between text-gray-300 text-lg">
                      <span>Items ({safeCartItems.length}):</span>
                      <span className="font-semibold">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300 text-lg">
                      <span>Shipping:</span>
                      <span className="font-semibold text-green-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-300 text-lg">
                      <span>Tax (8%):</span>
                      <span className="font-semibold">
                        ${(calculateTotal() * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between text-2xl font-bold">
                        <span className="text-white">Total:</span>
                        <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                          ${(calculateTotal() * 1.08).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-linear-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                      />
                    </svg>
                    Proceed to Checkout
                  </div>
                </button>

                {/* Payment Methods */}
                <div className="text-center mb-6">
                  <p className="text-gray-400 text-sm mb-3">We Accept</p>
                  <div className="flex justify-center items-center gap-3">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <span className="text-blue-400 font-bold text-sm">
                        VISA
                      </span>
                    </div>
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <span className="text-red-400 font-bold text-sm">MC</span>
                    </div>
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <span className="text-blue-300 font-bold text-sm">
                        AMEX
                      </span>
                    </div>
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <span className="text-yellow-400 font-bold text-sm">
                        PayPal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    256-bit SSL Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
