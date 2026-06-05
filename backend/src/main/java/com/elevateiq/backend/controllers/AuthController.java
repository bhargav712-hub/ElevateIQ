package com.elevateiq.backend.controllers;

import com.elevateiq.backend.models.User;
import com.elevateiq.backend.payload.request.LoginRequest;
import com.elevateiq.backend.payload.request.RegisterRequest;
import com.elevateiq.backend.payload.response.JwtResponse;
import com.elevateiq.backend.payload.response.MessageResponse;
import com.elevateiq.backend.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        return authService.registerUser(signUpRequest);
    }
}
