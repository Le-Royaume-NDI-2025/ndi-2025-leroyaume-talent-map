package dev.royaumendi.talentmap.repository;

import dev.royaumendi.talentmap.entity.LanguageSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LanguageSkillRepository extends JpaRepository<LanguageSkill, UUID> {
}
