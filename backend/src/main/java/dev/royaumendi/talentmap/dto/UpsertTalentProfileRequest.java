package dev.royaumendi.talentmap.dto;

import dev.royaumendi.talentmap.entity.AvailabilityStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UpsertTalentProfileRequest(
        @NotBlank @Size(max = 100) String firstName,
        @NotBlank @Size(max = 100) String lastName,
        @Size(max = 200) String title,
        @Size(max = 5000) String bio,
        @Size(max = 100) String city,
        @Size(max = 100) String country,
        AvailabilityStatus availabilityStatus,
        @Valid List<SkillDto> skills,
        @Valid List<LanguageSkillDto> languages,
        @Valid List<ProjectExperienceDto> projects) {
}
