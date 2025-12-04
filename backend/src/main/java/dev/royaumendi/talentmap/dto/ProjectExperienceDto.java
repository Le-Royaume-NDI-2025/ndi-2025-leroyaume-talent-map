package dev.royaumendi.talentmap.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record ProjectExperienceDto(
        @NotBlank String name,
        String description,
        String role,
        String technologies,
        String link,
        LocalDate startDate,
        LocalDate endDate) {
}
