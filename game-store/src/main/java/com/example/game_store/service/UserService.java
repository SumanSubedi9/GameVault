package com.example.game_store.service;

import com.example.game_store.dto.UserLoginDto;
import com.example.game_store.dto.UserRegistrationDto;
import com.example.game_store.dto.UserResponseDto;
import com.example.game_store.exception.EntityNotFoundException;
import com.example.game_store.model.User;
import com.example.game_store.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Register a new user
     */
    public UserResponseDto registerUser(UserRegistrationDto registrationDto) {
        // Check if username already exists
        if (userRepository.findByUsernameIgnoreCase(registrationDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Check if email already exists
        if (userRepository.findByEmailIgnoreCase(registrationDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setEmail(registrationDto.getEmail());
        // Note: In production, you should hash the password using BCrypt
        user.setPassword(registrationDto.getPassword());

        User savedUser = userRepository.save(user);
        return convertToResponseDto(savedUser);
    }

    /**
     * Authenticate user login
     */
    public UserResponseDto loginUser(UserLoginDto loginDto) {
        User user = userRepository.findByUsernameOrEmailIgnoreCase(loginDto.getUsernameOrEmail())
                .orElseThrow(() -> new RuntimeException("Invalid username/email or password"));

        // Note: In production, you should verify hashed password using BCrypt
        if (!user.getPassword().equals(loginDto.getPassword())) {
            throw new RuntimeException("Invalid username/email or password");
        }

        return convertToResponseDto(user);
    }

    /**
     * Get user by ID
     */
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        return convertToResponseDto(user);
    }

    /**
     * Convert User entity to UserResponseDto
     */
    private UserResponseDto convertToResponseDto(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        return dto;
    }
}
