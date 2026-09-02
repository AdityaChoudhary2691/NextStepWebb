package com.aditya.nexepbackend.Model;

public class AuthResponse {
    private Long id;
    private String username;
    private Role role;
    private String message;

    public AuthResponse(Long id, String username, Role role, String message) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.message = message;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public Role getRole() { return role; }
    public String getMessage() { return message; }
}