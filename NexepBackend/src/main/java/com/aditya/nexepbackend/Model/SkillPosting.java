package com.aditya.nexepbackend.Model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class SkillPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String mobileno;
    private String uemail;
    private String usub;
    private String ubody;
    private String ustatus;
    private String applyingf;
    private String upassoutYear;
    @ElementCollection
    @CollectionTable(name = "skill_posting_skills", joinColumns = @JoinColumn(name = "skill_posting_id"))
    @Column(name = "skill")
    private String[] uskills;

    private String videoName;
    private String videoType;

    private String resumeName;
    private String resumeType;
    @Lob
    @Column(columnDefinition = "BYTEA")
    private byte[] uvedio;

    @Lob
    @Column(columnDefinition = "BYTEA")
    private byte[] uresume;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
