package com.aditya.nexepbackend.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

/** One row = one candidate viewing one job on one day (refreshes don't inflate the count). */
@Entity
@Table(
        name = "job_views",
        uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "viewer_id", "viewed_on"}),
        indexes = @Index(columnList = "job_id, viewed_on")
)
public class JobView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_id", nullable = false)
    private Integer jobId;      // JobPosting.id

    @Column(name = "viewer_id", nullable = false)
    private Long viewerId;      // User.id of the candidate

    @Column(name = "viewed_on", nullable = false)
    private LocalDate viewedOn;

    protected JobView() {}

    public JobView(Integer jobId, Long viewerId, LocalDate viewedOn) {
        this.jobId = jobId;
        this.viewerId = viewerId;
        this.viewedOn = viewedOn;
    }
}