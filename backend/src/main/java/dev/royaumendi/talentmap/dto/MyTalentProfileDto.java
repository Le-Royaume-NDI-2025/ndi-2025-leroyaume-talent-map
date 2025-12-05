package dev.royaumendi.talentmap.dto;

import dev.royaumendi.talentmap.entity.AvailabilityStatus;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record MyTalentProfileDto(
                UUID id,
                String firstName,
                String lastName,
                String title,
                String bio,
                String city,
                String country,
                String profilePictureUrl,
                AvailabilityStatus availabilityStatus,
                boolean verified,
                Instant verifiedAt,
                List<SkillDto> skills,
                List<LanguageSkillDto> languages,
                List<ProjectExperienceDto> projects) {
}
