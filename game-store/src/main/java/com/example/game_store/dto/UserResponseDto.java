package com.example.game_store.dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private String token; // JWT token for authentication
    // Password not included for security
}