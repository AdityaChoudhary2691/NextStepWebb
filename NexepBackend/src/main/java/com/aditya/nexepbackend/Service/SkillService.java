package com.aditya.nexepbackend.Service;

import com.aditya.nexepbackend.Model.JobPosting;
import com.aditya.nexepbackend.Model.SkillPosting;
import com.aditya.nexepbackend.Repo.SkillPostingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService{

    @Autowired
    SkillPostingRepo repo;

    public List<SkillPosting> getskills() {
        return repo.findAll();
    }

    public SkillPosting addskill(SkillPosting skill) {
        return repo.save(skill);
    }

    public void deleteskill(Integer id) {
        repo.deleteById(id);
    }
}
