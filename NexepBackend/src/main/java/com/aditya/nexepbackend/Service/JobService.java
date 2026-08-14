package com.aditya.nexepbackend.Service;

import com.aditya.nexepbackend.Model.JobPosting;
import com.aditya.nexepbackend.Repo.JobPostingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    JobPostingRepo repo;

    public JobPosting addJob(JobPosting job) {
        return  repo.save(job);
    }

    public List<JobPosting> getJob() {
        return repo.findAll();
    }

    public void deleteJob(Integer a){
        repo.deleteById(a);
    }
}
