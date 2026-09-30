package com.aditya.nexepbackend.Controller;

import com.aditya.nexepbackend.Model.JobPosting;
import com.aditya.nexepbackend.Repo.JobPostingRepo;
import com.aditya.nexepbackend.Repo.Jobviewrepo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
public class AnalyticsController {

    private final JobPostingRepo jobs;
    private final Jobviewrepo views;

    public AnalyticsController(JobPostingRepo jobs, Jobviewrepo views) {
        this.jobs = jobs;
        this.views = views;
    }

    /**
     * GET /analytics/recruiter/{userId}?range=30d
     * Returns only what exists today (jobs + views). Add applications, response time, etc.
     * to the same JSON later; the page shows each section once its data is present.
     *
     * Needs this method added to JobPostingRepo:
     *     List<JobPosting> findByUserId(Long userId);
     */
    @GetMapping("/analytics/recruiter/{userId}")
    public Map<String, Object> recruiter(@PathVariable Long userId,
                                         @RequestParam(defaultValue = "30d") String range) {
        int days;
        try {
            days = Math.min(Integer.parseInt(range.replaceAll("\\D", "")), 365);
        } catch (NumberFormatException e) {
            days = 30;
        }
        LocalDate since = LocalDate.now().minusDays(days);

        Map<Integer, Long> perJob = new HashMap<>();
        for (Object[] row : views.countPerJob(userId, since)) {
            perJob.put((Integer) row[0], (Long) row[1]);
        }

        List<JobPosting> myJobs = jobs.findByUserId(userId);
        List<Map<String, Object>> postings = new ArrayList<>();
        for (JobPosting j : myJobs) {
            Map<String, Object> p = new LinkedHashMap<>();
            p.put("id", j.getId());
            p.put("title", j.getPosition());
            p.put("views", perJob.getOrDefault(j.getId(), 0L));
            postings.add(p);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("jobs", Map.of("total", myJobs.size()));
        result.put("funnel", Map.of("views", views.countForRecruiter(userId, since)));
        result.put("postings", postings);
        return result;
    }
}