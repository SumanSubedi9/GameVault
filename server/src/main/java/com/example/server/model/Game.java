package com.example.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Genre is mandatory")
    private String genre;

    @NotBlank(message = "Platform is mandatory")
    private String platform;

    // Enhanced pricing system
    @NotNull(message = "Original price is mandatory")
    @DecimalMin(value = "0.0", inclusive = true, message = "Original price must be non-negative")
    @Column(name = "original_price")
    private Double originalPrice;

    @DecimalMin(value = "0.0", inclusive = true, message = "Discount price must be non-negative")
    @Column(name = "discount_price")
    private Double discountPrice;

    @Min(value = 0, message = "Discount percentage must be between 0 and 100")
    @Max(value = 100, message = "Discount percentage must be between 0 and 100")
    @Column(name = "discount_percentage")
    private Integer discountPercentage;

    // Rating system
    @Min(value = 0, message = "Rating must be between 0 and 5")
    @Max(value = 5, message = "Rating must be between 5 and 5")
    private Double rating;

    // Visual enhancements
    @Column(name = "image_url")
    private String image;

    private String badge; // e.g., "SALE", "NEW", "FEATURED"

    // Helper method to get current price (discount or original)
    public Double getCurrentPrice() {
        return discountPrice != null ? discountPrice : originalPrice;
    }

    // Helper method to check if game is on sale
    public Boolean isOnSale() {
        return discountPrice != null && discountPrice < originalPrice;
    }
}
