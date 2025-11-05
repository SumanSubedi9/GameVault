package com.example.game_store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.game_store.model.WishlistItem;
import com.example.game_store.service.WishlistService;
import com.example.game_store.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

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
     * Add game to wishlist
     * POST /api/wishlist/add
     */
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToWishlist(@RequestBody Map<String, Long> request,
            HttpServletRequest httpRequest) {
        try {
            Long userId = getAuthenticatedUserId(httpRequest);
            Long gameId = request.get("gameId");

            System.out.println("Adding to wishlist - User ID: " + userId + ", Game ID: " + gameId);

            WishlistItem item = wishlistService.addToWishlist(userId, gameId);
            Integer wishlistCount = wishlistService.getWishlistCount(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Game added to wishlist");
            response.put("wishlistCount", wishlistCount);
            response.put("wishlistItem", item);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Remove game from wishlist
     * DELETE /api/wishlist/remove
     */
    @DeleteMapping("/remove")
    public ResponseEntity<Map<String, Object>> removeFromWishlist(@RequestBody Map<String, Long> request,
            HttpServletRequest httpRequest) {
        try {
            Long userId = getAuthenticatedUserId(httpRequest);
            Long gameId = request.get("gameId");

            System.out.println("Removing from wishlist - User ID: " + userId + ", Game ID: " + gameId);

            wishlistService.removeFromWishlist(userId, gameId);
            Integer wishlistCount = wishlistService.getWishlistCount(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Game removed from wishlist");
            response.put("wishlistCount", wishlistCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Toggle wishlist status (add/remove)
     * POST /api/wishlist/toggle
     */
    @PostMapping("/toggle")
    public ResponseEntity<Map<String, Object>> toggleWishlist(@RequestBody Map<String, Long> request,
            HttpServletRequest httpRequest) {
        try {
            Long userId = getAuthenticatedUserId(httpRequest);
            Long gameId = request.get("gameId");

            System.out.println("Toggling wishlist - User ID: " + userId + ", Game ID: " + gameId);

            boolean isInWishlist = wishlistService.toggleWishlist(userId, gameId);
            Integer wishlistCount = wishlistService.getWishlistCount(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("isInWishlist", isInWishlist);
            response.put("message", isInWishlist ? "Game added to wishlist" : "Game removed from wishlist");
            response.put("wishlistCount", wishlistCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Get user's wishlist
     * GET /api/wishlist
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getWishlist(HttpServletRequest httpRequest) {
        try {
            Long userId = getAuthenticatedUserId(httpRequest);
            List<WishlistItem> items = wishlistService.getWishlistItems(userId);
            Integer count = wishlistService.getWishlistCount(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("items", items);
            response.put("count", count);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Get wishlist count
     * GET /api/wishlist/count
     */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> getWishlistCount(HttpServletRequest httpRequest) {
        try {
            Long userId = getAuthenticatedUserId(httpRequest);
            Integer count = wishlistService.getWishlistCount(userId);

            Map<String, Integer> response = new HashMap<>();
            response.put("count", count);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Integer> response = new HashMap<>();
            response.put("count", 0);
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Check if game is in wishlist
     * GET /api/wishlist/check/{gameId}
     */
    @GetMapping("/check/{gameId}")
    public ResponseEntity<Map<String, Object>> checkWishlistStatus(@PathVariable Long gameId,
            HttpServletRequest httpRequest) {
        try {
            Long userId = getAuthenticatedUserId(httpRequest);
            boolean isInWishlist = wishlistService.isInWishlist(userId, gameId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("isInWishlist", isInWishlist);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("isInWishlist", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}