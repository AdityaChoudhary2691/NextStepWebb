package com.aditya.nexepbackend.Model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String type;
    private String position;
    private int remuneration;
    private String name;
    private String description;

    @CreationTimestamp
    @Column(updatable = false, nullable = true)
    private LocalDateTime postedDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}