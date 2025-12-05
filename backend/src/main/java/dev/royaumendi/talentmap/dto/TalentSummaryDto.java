package dev.royaumendi.talentmap.dto;

import java.util.List;
import java.util.UUID;

public record TalentSummaryDto(
                UUID id,
                String firstName,
                String lastName,
                String title,
                String city,
                String country,
                String profilePictureUrl,
                boolean verified,
                List<String> skillNames) {
}
