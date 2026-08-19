package com.aditya.nexepbackend.Controller;


import com.aditya.nexepbackend.Model.JobPosting;
import com.aditya.nexepbackend.Model.SendEmail;
import com.aditya.nexepbackend.Model.SkillPosting;
import com.aditya.nexepbackend.Service.EmailService;
import com.aditya.nexepbackend.Service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class SkillController {

    @Autowired
    SkillService service;

    @Autowired
    EmailService ser;

    @GetMapping("/getskills")
    public List<SkillPosting> getskill(){
        return service.getskills();
    }

    @PostMapping("/postskills")
    public SkillPosting addskil(@RequestBody SkillPosting skill){
        return service.addskill(skill);
    }

    @DeleteMapping("/skills/{id}")
    public String deleteskill(@PathVariable Integer id){
        service.deleteskill(id);
        return "Deleted";
    }

    @PostMapping("/sended")
    public String sendEmail(@RequestBody SendEmail request){
        ser.sendCandidateEmail(request.getToEmail(), request.getSubject(), request.getBody());
        return "sended";
    }
}
