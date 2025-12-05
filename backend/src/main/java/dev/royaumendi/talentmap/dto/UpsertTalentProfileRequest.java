package dev.royaumendi.talentmap.dto;

import dev.royaumendi.talentmap.entity.AvailabilityStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UpsertTalentProfileRequest(
                @NotBlank String firstName,
                @NotBlank String lastName,
                String title,
                String bio,
                String city,
                String country,
                String profilePictureUrl,
                AvailabilityStatus availabilityStatus,
                @Valid List<SkillDto> skills,
                @Valid List<LanguageSkillDto> languages,
                @Valid List<ProjectExperienceDto> projects) {
}
