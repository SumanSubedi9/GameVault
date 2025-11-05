package com.example.server.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.server.util.JwtUtil;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Check if Authorization header exists and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Remove "Bearer " prefix
            try {
                username = jwtUtil.extractUsername(jwt);
                System.out.println("JWT Filter - Token found for user: " + username);
            } catch (Exception e) {
                System.out.println("JWT Filter - Invalid token: " + e.getMessage());
            }
        }

        // If we have a username and no authentication is set in the context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Validate the token
            if (jwtUtil.validateToken(jwt, username)) {
                System.out.println("JWT Filter - Token validated successfully for: " + username);

                // Create authentication token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null,
                        new ArrayList<>());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set authentication in the security context
                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println("JWT Filter - Authentication set for user: " + username);
            } else {
                System.out.println("JWT Filter - Token validation failed for: " + username);
            }
        }

        filterChain.doFilter(request, response);
    }
}