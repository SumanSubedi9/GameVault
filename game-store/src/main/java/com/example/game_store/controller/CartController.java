package com.example.game_store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.game_store.model.CartItem;
import com.example.game_store.service.CartService;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * Add game to cart - supports "Add to Cart" button
     * POST /api/cart/add
     */
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long gameId = request.get("gameId");

        CartItem item = cartService.addToCart(userId, gameId);
        Integer newCount = cartService.getCartItemCount(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Game added to cart");
        response.put("cartItemCount", newCount);
        response.put("cartItem", item);

        return ResponseEntity.ok(response);
    }

    /**
     * Get cart item count - for cart icon in navigation
     * GET /api/cart/count/{userId}
     */
    @GetMapping("/count/{userId}")
    public ResponseEntity<Map<String, Integer>> getCartCount(@PathVariable Long userId) {
        Integer count = cartService.getCartItemCount(userId);
        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all cart items for user
     * GET /api/cart/{userId}
     */
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getCart(@PathVariable Long userId) {
        List<CartItem> items = cartService.getCartItems(userId);
        Integer count = cartService.getCartItemCount(userId);
        Double total = cartService.getCartTotal(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("items", items);
        response.put("count", count);
        response.put("total", total);

        return ResponseEntity.ok(response);
    }

    /**
     * Update item quantity in cart
     * PUT /api/cart/update
     */
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateCartItem(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long gameId = Long.valueOf(request.get("gameId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());

        CartItem item = cartService.updateQuantity(userId, gameId, quantity);
        Integer newCount = cartService.getCartItemCount(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("cartItem", item);
        response.put("cartItemCount", newCount);

        return ResponseEntity.ok(response);
    }

    /**
     * Remove item from cart
     * DELETE /api/cart/remove
     */
    @DeleteMapping("/remove")
    public ResponseEntity<Map<String, Object>> removeFromCart(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long gameId = request.get("gameId");

        cartService.removeFromCart(userId, gameId);
        Integer newCount = cartService.getCartItemCount(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Item removed from cart");
        response.put("cartItemCount", newCount);

        return ResponseEntity.ok(response);
    }
}
