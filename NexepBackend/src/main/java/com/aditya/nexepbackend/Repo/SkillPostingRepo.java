package com.aditya.nexepbackend.Repo;

import com.aditya.nexepbackend.Model.SkillPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillPostingRepo extends JpaRepository<SkillPosting,Integer> {
}
