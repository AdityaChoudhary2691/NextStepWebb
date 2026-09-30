package com.aditya.nexepbackend.Model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import java.time.LocalDateTime;
import java.util.List;

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

    @Column(length = 2000)
    private String description;

    // NEW: short intro to the company, shown on the job details page
    @Column(length = 2000)
    private String companyBrief;

    // NEW: prior skills required for the role, e.g. ["React", "Tailwind CSS", "Git"]
    // Stored in a separate side table (job_posting_skills) so it stays a clean
    // List<String> on the entity and a plain JSON array over the wire.
    @ElementCollection
    @CollectionTable(name = "job_posting_skills", joinColumns = @JoinColumn(name = "job_posting_id"))
    @Column(name = "skill")
    private List<String> skillsRequired;

    // NEW: internship length in months — only sent/set when type == "Internship"
    private Integer durationMonths;

    @CreationTimestamp
    @Column(updatable = false, nullable = true)
    private LocalDateTime postedDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}