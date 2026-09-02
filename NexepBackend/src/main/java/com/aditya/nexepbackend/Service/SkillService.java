package com.aditya.nexepbackend.Service;

import com.aditya.nexepbackend.Model.SkillPosting;
import com.aditya.nexepbackend.Model.User;
import com.aditya.nexepbackend.Repo.SkillPostingRepo;
import com.aditya.nexepbackend.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class SkillService {

    @Autowired
    SkillPostingRepo repo;

    @Autowired
    UserRepository userRepository;

    public List<SkillPosting> getskills() {
        return repo.findAll();
    }

    public SkillPosting addskill(SkillPosting skill,Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        skill.setUser(user);
        return repo.save(skill);
    }

    public SkillPosting addSkillWithFiles(
            Long userId, String username, String mobileno, String uemail, String ustatus,
            String applyingf, String upassoutYear, String usub, String ubody, String[] uskills,
            MultipartFile video, MultipartFile resume) throws IOException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SkillPosting skill = new SkillPosting();
        skill.setUser(user);
        skill.setUsername(username);
        skill.setMobileno(mobileno);
        skill.setUemail(uemail);
        skill.setUstatus(ustatus);
        skill.setApplyingf(applyingf);
        skill.setUpassoutYear(upassoutYear);
        skill.setUbody(ubody);
        skill.setUsub(usub);
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