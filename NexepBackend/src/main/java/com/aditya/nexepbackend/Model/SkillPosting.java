package com.aditya.nexepbackend.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private String uname;
    private Long mobile;
    private String email;
    private String status;
    private String apply;
    private Integer passoutYear;
    private String[] skill;
    private String vedio;
    private String resume;
}
