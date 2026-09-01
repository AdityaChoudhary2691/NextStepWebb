package com.aditya.nexepbackend.Service;

import com.aditya.nexepbackend.Model.JobPosting;
import com.aditya.nexepbackend.Model.User;
import com.aditya.nexepbackend.Repo.JobPostingRepo;
import com.aditya.nexepbackend.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    JobPostingRepo repo;

    @Autowired
    UserRepository userRepository;



    public List<JobPosting> getJob() {
        return repo.findAll();
    }

    public void deleteJob(Integer a){
        repo.deleteById(a);
    }
    public JobPosting addJob(JobPosting job, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        job.setUser(user);
        return repo.save(job);
    }
}
