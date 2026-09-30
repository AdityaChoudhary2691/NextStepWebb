package com.aditya.nexepbackend.Controller;

import com.aditya.nexepbackend.Model.JobPosting;
import com.aditya.nexepbackend.Model.JobView;
import com.aditya.nexepbackend.Repo.JobPostingRepo;
import com.aditya.nexepbackend.Repo.Jobviewrepo;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
public class Jobviewcontroller {

    private final Jobviewrepo views;
    private final JobPostingRepo jobs;      // the repository, not the JobPosting entity

    public Jobviewcontroller(Jobviewrepo views, JobPostingRepo jobs) {
        this.views = views;
        this.jobs = jobs;
    }

    /** Called when a candidate clicks "View details". */
    @PostMapping("/jobs/{jobId}/view")
    public ResponseEntity<Void> recordView(@PathVariable Integer jobId, @RequestParam Long userId) {
        JobPosting job = jobs.findById(jobId).orElse(null);
        if (job == null) return ResponseEntity.notFound().build();

        // Don't count the recruiter looking at their own posting.
        if (job.getUser().getId().equals(userId)) return ResponseEntity.noContent().build();

        LocalDate today = LocalDate.now();
        if (!views.existsByJobIdAndViewerIdAndViewedOn(jobId, userId, today)) {
            try {
                views.save(new JobView(jobId, userId, today));
            } catch (DataIntegrityViolationException ignored) {
                // two clicks at the same moment: the unique constraint already counted it
            }
        }
        return ResponseEntity.noContent().build();
    }

    /**
     * Use inside your existing GET /analytics/recruiter/{userId} handler.
     *  - funnel.views       -> result.get("total")
     *  - postings[i].views  -> perJob.getOrDefault(job.getId(), 0L)
     */
    public Map<String, Object> viewStats(Long recruiterId, int days) {
        LocalDate since = LocalDate.now().minusDays(days);

        Map<Integer, Long> perJob = new HashMap<>();
        for (Object[] row : views.countPerJob(recruiterId, since)) {
            perJob.put((Integer) row[0], (Long) row[1]);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("total", views.countForRecruiter(recruiterId, since));
        result.put("perJob", perJob);
        return result;
    }
}