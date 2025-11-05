package com.example.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.server.dto.UserLoginDto;
import com.example.server.dto.UserRegistrationDto;
import com.example.server.dto.UserResponseDto;
import com.example.server.exception.EntityNotFoundException;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import com.example.server.util.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Register a new user
     */
    public UserResponseDto registerUser(UserRegistrationDto registrationDto) {
        // Validate business rules
        validateUserRegistration(registrationDto);

        // Create new user with data sanitization and password hashing
        User user = new User();
        user.setUsername(registrationDto.getUsername().trim());
        user.setEmail(registrationDto.getEmail().toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));

        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getId());

        UserResponseDto responseDto = convertToResponseDto(savedUser);
        responseDto.setToken(token);

        return responseDto;
    }

    /**
     * Authenticate user login
     */
    public UserResponseDto loginUser(UserLoginDto loginDto) {
        User user = userRepository.findByEmailIgnoreCase(loginDto.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Invalid email or password"));

        // Verify hashed password using BCrypt
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new EntityNotFoundException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername(), user.getId());

        UserResponseDto responseDto = convertToResponseDto(user);
        responseDto.setToken(token);

        return responseDto;
    }

    // Private helper method for business validation
    private void validateUserRegistration(UserRegistrationDto registrationDto) {
        if (userRepository.findByUsernameIgnoreCase(registrationDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepository.findByEmailIgnoreCase(registrationDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
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
