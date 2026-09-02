package com.aditya.nexepbackend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(name = "users")
public class User {

    // getters and setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false, unique = true)
    private String username;

    @Setter
    @Column(nullable = false)
    private String password; // stored as bcrypt hash

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // FRESHER or RECRUITER

    public User() {}

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }


}