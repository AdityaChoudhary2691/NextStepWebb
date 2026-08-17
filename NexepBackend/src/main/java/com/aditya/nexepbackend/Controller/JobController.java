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

    @PostMapping("/postjobs")
    public JobPosting addJob(@RequestBody JobPosting job){
        return service.addJob(job);
    }

    @DeleteMapping("/{a}")
    public String deleteJob(@PathVariable Integer a){
        service.deleteJob(a);
        return "deleted";
    }
}
