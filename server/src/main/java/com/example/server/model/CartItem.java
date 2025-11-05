package com.example.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User ID is required")
    @Column(name = "user_id")
    private Long userId;

    @NotNull(message = "Game is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "added_at")
    private java.time.LocalDateTime addedAt;

    @PrePersist
    protected void onCreate() {
        addedAt = java.time.LocalDateTime.now();
    }

    // Helper method to calculate total price for this cart item
    public Double getTotalPrice() {
        if (game != null) {
            Double currentPrice = game.getCurrentPrice(); // Uses the new helper method
            return currentPrice != null ? currentPrice * quantity : 0.0;
        }
        return 0.0;
    }
}
