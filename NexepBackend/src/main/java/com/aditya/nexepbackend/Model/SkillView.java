package com.aditya.nexepbackend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class SkillView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer skillId;     // SkillPosting.id that was viewed
    private Long viewerId;       // recruiter's user id
    private LocalDate viewedOn;
}