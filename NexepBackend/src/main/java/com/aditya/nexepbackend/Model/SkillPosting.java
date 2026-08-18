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
    private String username;
    private String mobileno;
    private String uemail;
    private String ustatus;
    private String applyingf;
    private String upassoutYear;
    private String[] uskills;
    private String uvedio;
    private String uresume;
}
