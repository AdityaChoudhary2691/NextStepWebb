package com.aditya.nexepbackend.Repo;

import com.aditya.nexepbackend.Model.SkillPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillPostingRepo extends JpaRepository<SkillPosting, Integer> {

    @Query("select s.usub, s.ubody, s.videoName, s.resumeName from SkillPosting s where s.user.id = :userId")
    List<Object[]> profileFields(@Param("userId") Long userId);

    @Query(value = "select count(*) from skill_posting_skills where skill_posting_id in " +
            "(select id from skill_posting where user_id = :userId)", nativeQuery = true)
    long countSkillsForUser(@Param("userId") Long userId);
}