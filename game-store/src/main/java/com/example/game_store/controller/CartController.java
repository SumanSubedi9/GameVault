package com.example.game_store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.game_store.model.CartItem;
import com.example.game_store.service.CartService;
import com.example.game_store.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Get the authenticated user ID from JWT token
     */
    private Long getAuthenticatedUserId(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            // Extract JWT token from Authorization header
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                return jwtUtil.extractUserId(token);
            }
        }
        throw new RuntimeException("User not authenticated or token not found");
    }

    /**
     * Add game to cart - supports "Add to Cart" button
     * POST /api/cart/add
     */
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestBody Map<String, Long> request,
            HttpServletRequest httpRequest) {
        try {
            Long userId = getAuthenticatedUserId(httpRequest);
            Long gameId = request.get("gameId");

            CartItem item = cartService.addToCart(userId, gameId);
            Integer newCount = cartService.getCartItemCount(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Game added to cart");
            response.put("cartItemCount", newCount);
            response.put("cartItem", item);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error adding to cart: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Get cart item count - for cart icon in navigation
     * GET /api/cart/count
     */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> getCartCount(HttpServletRequest httpRequest) {
        Long userId = getAuthenticatedUserId(httpRequest); // Get from JWT instead of path
        Integer count = cartService.getCartItemCount(userId);
        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all cart items for user
     * GET /api/cart
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getCart(HttpServletRequest httpRequest) {
        Long userId = getAuthenticatedUserId(httpRequest); // Get from JWT instead of path
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
    public ResponseEntity<Map<String, Object>> updateCartItem(@RequestBody Map<String, Object> request,
            HttpServletRequest httpRequest) {
        Long userId = getAuthenticatedUserId(httpRequest); // Get from JWT instead of request
        Long gameId = Long.valueOf(request.get("gameId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());

        System.out.println("Updating cart - User ID: " + userId + ", Game ID: " + gameId + ", Quantity: " + quantity);

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
    public ResponseEntity<Map<String, Object>> removeFromCart(@RequestBody Map<String, Long> request,
            HttpServletRequest httpRequest) {
        Long userId = getAuthenticatedUserId(httpRequest); // Get from JWT instead of request
        Long gameId = request.get("gameId");

        System.out.println("Removing from cart - User ID: " + userId + ", Game ID: " + gameId);

        cartService.removeFromCart(userId, gameId);
        Integer newCount = cartService.getCartItemCount(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Item removed from cart");
        response.put("cartItemCount", newCount);

        return ResponseEntity.ok(response);
    }
}
