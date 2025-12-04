package dev.royaumendi.talentmap.dto;

import dev.royaumendi.talentmap.entity.LanguageProficiency;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LanguageSkillDto(
        @NotBlank String languageName,
        @NotNull LanguageProficiency proficiency) {
}
