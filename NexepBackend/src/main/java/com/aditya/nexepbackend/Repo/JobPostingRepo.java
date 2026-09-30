package com.aditya.nexepbackend.Repo;

import com.aditya.nexepbackend.Model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostingRepo extends JpaRepository<JobPosting, Integer> {

    List<JobPosting> findByUserId(Long userId);
}