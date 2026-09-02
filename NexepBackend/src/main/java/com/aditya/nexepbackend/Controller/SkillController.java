package com.aditya.nexepbackend.Controller;

import com.aditya.nexepbackend.Model.SendEmail;
import com.aditya.nexepbackend.Model.SkillPosting;
import com.aditya.nexepbackend.Service.EmailService;
import com.aditya.nexepbackend.Service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(value = "/postskills/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addSkillWithFiles(
            @RequestParam Long userId,
            @RequestParam String username,
            @RequestParam String mobileno,
            @RequestParam String uemail,
            @RequestParam String ustatus,
            @RequestParam String applyingf,
            @RequestParam String upassoutYear,
            @RequestParam(required = false) String usub,
            @RequestParam(required = false) String ubody,
            @RequestParam(required = false) String[] uskills,
            @RequestParam(required = false) MultipartFile video,
            @RequestParam(required = false) MultipartFile resume) {
        try {
            SkillPosting saved = service.addSkillWithFiles(userId,
                    username, mobileno, uemail, ustatus, applyingf,
                    upassoutYear, usub, ubody, uskills, video, resume);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/skills/{id}/video")
    public ResponseEntity<byte[]> getVideo(@PathVariable Integer id) {
        SkillPosting skill = service.getskills().stream()
                .filter(s -> s.getId().equals(id))
                .findFirst()
                .orElseThrow();
        if (skill.getUvedio() == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(skill.getVideoType()))
                .body(skill.getUvedio());
    }

    @GetMapping("/skills/{id}/resume")
    public ResponseEntity<byte[]> getResume(@PathVariable Integer id) {
        SkillPosting skill = service.getskills().stream()
                .filter(s -> s.getId().equals(id))
                .findFirst()
                .orElseThrow();
        if (skill.getUresume() == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(skill.getResumeType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + skill.getResumeName() + "\"")
                .body(skill.getUresume());
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