package com.aditya.nexepbackend.Repo;

import com.aditya.nexepbackend.Model.JobView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface Jobviewrepo extends JpaRepository<JobView, Long> {

    boolean existsByJobIdAndViewerIdAndViewedOn(Integer jobId, Long viewerId, LocalDate viewedOn);

    @Query("""
        select count(v) from JobView v
        where v.viewedOn >= :since
          and v.jobId in (select j.id from JobPosting j where j.user.id = :recruiterId)
        """)
    long countForRecruiter(@Param("recruiterId") Long recruiterId, @Param("since") LocalDate since);

    @Query("""
        select v.jobId, count(v) from JobView v
        where v.viewedOn >= :since
          and v.jobId in (select j.id from JobPosting j where j.user.id = :recruiterId)
        group by v.jobId
        """)
    List<Object[]> countPerJob(@Param("recruiterId") Long recruiterId, @Param("since") LocalDate since);
}