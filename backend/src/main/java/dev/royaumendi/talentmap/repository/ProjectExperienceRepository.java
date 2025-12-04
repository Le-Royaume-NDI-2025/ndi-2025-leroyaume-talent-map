package dev.royaumendi.talentmap.repository;

import dev.royaumendi.talentmap.entity.ProjectExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProjectExperienceRepository extends JpaRepository<ProjectExperience, UUID> {
}
