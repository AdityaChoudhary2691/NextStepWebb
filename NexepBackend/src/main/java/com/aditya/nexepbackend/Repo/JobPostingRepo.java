package com.aditya.nexepbackend.Repo;

import com.aditya.nexepbackend.Model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostingRepo extends JpaRepository<JobPosting,Integer> {
}
