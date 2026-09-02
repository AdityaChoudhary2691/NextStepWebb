package com.aditya.nexepbackend.Service;

import com.aditya.nexepbackend.Model.*;
import com.aditya.nexepbackend.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public String signup(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username already taken";
        }
        User user = new User(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole()
        );
        userRepository.save(user);
        return "Signup successful";
    }
    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if (user == null) {
            return new AuthResponse(null, null, null, "User not found");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, null, null, "Invalid password");
        }
        return new AuthResponse(user.getId(), user.getUsername(), user.getRole(), "Login successful");
    }
}