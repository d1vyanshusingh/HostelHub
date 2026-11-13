package com.hostelhub.controller;

import com.hostelhub.dto.request.LoginRequest;
import com.hostelhub.dto.request.RegisterRequest;
import com.hostelhub.dto.response.ApiResponse;
import com.hostelhub.dto.response.AuthResponse;
import com.hostelhub.model.User;
import com.hostelhub.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = authService.registerUser(registerRequest);
        return new ResponseEntity<>(
                new ApiResponse(true, "User registered successfully with email: " + user.getEmail()),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(authResponse);
    }
}
