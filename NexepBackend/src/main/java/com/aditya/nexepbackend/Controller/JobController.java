package com.aditya.nexepbackend.Controller;


import com.aditya.nexepbackend.Model.JobPosting;
import com.aditya.nexepbackend.Service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class JobController {

    @Autowired
    JobService service;

    @GetMapping("/getjobs")
    public List<JobPosting> getJob(){
        return service.getJob();
    }

    @PostMapping("/postjobs/{userId}")
    public JobPosting create(@RequestBody JobPosting job, @PathVariable Long userId) {
        return service.addJob(job, userId);
    }

    @DeleteMapping("/{a}")
    public String deleteJob(@PathVariable Integer a){
        service.deleteJob(a);
        return "deleted";
    }
}
