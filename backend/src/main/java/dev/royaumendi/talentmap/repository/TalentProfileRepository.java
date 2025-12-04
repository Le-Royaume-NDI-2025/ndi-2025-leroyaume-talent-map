package dev.royaumendi.talentmap.repository;

import dev.royaumendi.talentmap.entity.TalentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TalentProfileRepository extends JpaRepository<TalentProfile, UUID> {

    List<TalentProfile> findByVerifiedTrue();

    List<TalentProfile> findByVerifiedFalse();

    List<TalentProfile> findByCityContainingIgnoreCase(String city);

    List<TalentProfile> findByCountryContainingIgnoreCase(String country);

    @Query("SELECT DISTINCT tp FROM TalentProfile tp " +
            "LEFT JOIN FETCH tp.skills s " +
            "WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :skillName, '%'))")
    List<TalentProfile> findBySkillNameContaining(@Param("skillName") String skillName);

    @Query("SELECT tp FROM TalentProfile tp WHERE tp.user.id = :userId")
    TalentProfile findByUserId(@Param("userId") UUID userId);
}
