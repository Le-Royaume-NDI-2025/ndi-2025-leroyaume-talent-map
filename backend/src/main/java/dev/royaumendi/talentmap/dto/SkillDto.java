package dev.royaumendi.talentmap.dto;

import dev.royaumendi.talentmap.entity.SkillCategory;
import dev.royaumendi.talentmap.entity.SkillLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SkillDto(
        @NotBlank String name,
        @NotNull SkillCategory category,
        @NotNull SkillLevel level) {
}
