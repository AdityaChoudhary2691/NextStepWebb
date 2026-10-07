package com.aditya.nexepbackend.Repo;

import com.aditya.nexepbackend.Model.SkillView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SkillViewRepo extends JpaRepository<SkillView, Long> {

    boolean existsBySkillIdAndViewerIdAndViewedOn(Integer skillId, Long viewerId, LocalDate viewedOn);

    @Query("select count(v) from SkillView v where v.viewedOn >= :since and v.skillId in " +
            "(select s.id from SkillPosting s where s.user.id = :userId)")
    long countForCandidate(@Param("userId") Long userId, @Param("since") LocalDate since);

    @Query("select count(distinct v.viewerId) from SkillView v where v.viewedOn >= :since and v.skillId in " +
            "(select s.id from SkillPosting s where s.user.id = :userId)")
    long countUniqueViewers(@Param("userId") Long userId, @Param("since") LocalDate since);

    @Query("select v.viewedOn, count(v) from SkillView v where v.viewedOn >= :since and v.skillId in " +
            "(select s.id from SkillPosting s where s.user.id = :userId) " +
            "group by v.viewedOn order by v.viewedOn")
    List<Object[]> countPerDay(@Param("userId") Long userId, @Param("since") LocalDate since);
}