package com.aditya.nexepbackend.Controller;

import com.aditya.nexepbackend.Model.SkillView;
import com.aditya.nexepbackend.Repo.JobPostingRepo;
import com.aditya.nexepbackend.Repo.SkillPostingRepo;
import com.aditya.nexepbackend.Repo.SkillViewRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin
@RestController
public class CandidateAnalyticController {

    private final SkillPostingRepo skills;
    private final SkillViewRepo views;
    private final JobPostingRepo jobs;

    public CandidateAnalyticController(SkillPostingRepo skills, SkillViewRepo views, JobPostingRepo jobs) {
        this.skills = skills;
        this.views = views;
        this.jobs = jobs;
    }
    @GetMapping("/analytics/candidate/{userId}")
    public Map<String, Object> candidate(@PathVariable Long userId,
                                         @RequestParam(defaultValue = "30d") String range) {
        int days;
        try {
            days = Math.min(Integer.parseInt(range.replaceAll("\\D", "")), 365);
        } catch (NumberFormatException e) {
            days = 30;
        }
        LocalDate today = LocalDate.now();
        LocalDate since = today.minusDays(days);

        // ---- profile strength (a user may have more than one posting: any posting can satisfy an item)
        boolean headline = false, about = false, video = false, resume = false;
        List<Object[]> rows = skills.profileFields(userId);
        for (Object[] r : rows) {
            headline |= notBlank(r[0]);
            about    |= notBlank(r[1]);
            video    |= notBlank(r[2]);
            resume   |= notBlank(r[3]);
        }
        long skillCount = skills.countSkillsForUser(userId);

        List<Map<String, Object>> checklist = new ArrayList<>();
        checklist.add(item("Resume uploaded", resume));
        checklist.add(item("Video introduction", video));
        checklist.add(item("Skills listed", skillCount > 0));
        checklist.add(item("About section written", about));
        checklist.add(item("Headline added", headline));
        long done = checklist.stream().filter(c -> (boolean) c.get("done")).count();

        Map<String, Object> profile = new LinkedHashMap<>();
        profile.put("exists", !rows.isEmpty());
        profile.put("strength", Math.round(done * 100f / checklist.size()));
        profile.put("skills", skillCount);
        profile.put("checklist", checklist);

        // ---- recruiter views (zero-filled so the chart has a point for every day)
        Map<LocalDate, Long> perDay = new HashMap<>();
        for (Object[] r : views.countPerDay(userId, since)) {
            perDay.put((LocalDate) r[0], (Long) r[1]);
        }
        List<Map<String, Object>> daily = new ArrayList<>();
        for (LocalDate d = since; !d.isAfter(today); d = d.plusDays(1)) {
            Map<String, Object> p = new LinkedHashMap<>();
            p.put("date", d.toString());
            p.put("count", perDay.getOrDefault(d, 0L));
            daily.add(p);
        }
        Map<String, Object> viewStats = new LinkedHashMap<>();
        viewStats.put("total", views.countForCandidate(userId, since));
        viewStats.put("uniqueRecruiters", views.countUniqueViewers(userId, since));
        viewStats.put("daily", daily);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("profile", profile);
        result.put("views", viewStats);
        result.put("market", Map.of("openJobs", jobs.count()));
        return result;
    }

    /**
     * POST /skills/{id}/view?viewerId=5
     * Call this from the recruiter UI when a candidate profile is opened.
     * One view per recruiter per profile per day, so refreshing doesn't inflate the numbers.
     */
    @PostMapping("/skills/{id}/view")
    public ResponseEntity<Void> recordView(@PathVariable Integer id, @RequestParam Long viewerId) {
        LocalDate today = LocalDate.now();
        if (!views.existsBySkillIdAndViewerIdAndViewedOn(id, viewerId, today)) {
            SkillView v = new SkillView();
            v.setSkillId(id);
            v.setViewerId(viewerId);
            v.setViewedOn(today);
            views.save(v);
        }
        return ResponseEntity.ok().build();
    }

    private static boolean notBlank(Object o) {
        return o != null && !o.toString().isBlank();
    }

    private static Map<String, Object> item(String label, boolean done) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("label", label);
        m.put("done", done);
        return m;
    }
}