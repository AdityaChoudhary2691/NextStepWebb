package com.aditya.nexepbackend.Service;

import com.aditya.nexepbackend.Model.SkillPosting;
import com.aditya.nexepbackend.Repo.SkillPostingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class SkillService {

    @Autowired
    SkillPostingRepo repo;

    public List<SkillPosting> getskills() {
        return repo.findAll();
    }

    public SkillPosting addskill(SkillPosting skill) {
        return repo.save(skill);
    }

    public SkillPosting addSkillWithFiles(
            String username, String mobileno, String uemail, String ustatus,
            String applyingf, String upassoutYear, String[] uskills,
            MultipartFile video, MultipartFile resume) throws IOException {

        SkillPosting skill = new SkillPosting();
        skill.setUsername(username);
        skill.setMobileno(mobileno);
        skill.setUemail(uemail);
        skill.setUstatus(ustatus);
        skill.setApplyingf(applyingf);
        skill.setUpassoutYear(upassoutYear);
        skill.setUskills(uskills);

        if (video != null && !video.isEmpty()) {
            skill.setVideoName(video.getOriginalFilename());
            skill.setVideoType(video.getContentType());
            skill.setUvedio(video.getBytes());
        }

        if (resume != null && !resume.isEmpty()) {
            skill.setResumeName(resume.getOriginalFilename());
            skill.setResumeType(resume.getContentType());
            skill.setUresume(resume.getBytes());
        }

        return repo.save(skill);
    }

    public void deleteskill(Integer id) {
        repo.deleteById(id);
    }
}