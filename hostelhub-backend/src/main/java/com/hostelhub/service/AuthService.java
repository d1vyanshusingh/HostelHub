package com.hostelhub.service;

import com.hostelhub.dto.request.LoginRequest;
import com.hostelhub.dto.request.RegisterRequest;
import com.hostelhub.dto.response.AuthResponse;
import com.hostelhub.exception.BadRequestException;
import com.hostelhub.model.User;
import com.hostelhub.repository.UserRepository;
import com.hostelhub.security.jwt.JwtUtils;
import com.hostelhub.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Transactional
    public User registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Error: Email is already registered!");
        }

        if (userRepository.existsByRegNo(registerRequest.getRegNo())) {
            throw new BadRequestException("Error: Registration / Staff number is already in use!");
        }

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .name(registerRequest.getName())
                .regNo(registerRequest.getRegNo())
                .role(registerRequest.getRole())
                .build();

        return userRepository.save(user);
    }

    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return AuthResponse.builder()
                .token(jwt)
                .tokenType("Bearer")
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .name(userDetails.getName())
                .regNo(userDetails.getRegNo())
                .role(userDetails.getRole())
                .build();
    }
}
