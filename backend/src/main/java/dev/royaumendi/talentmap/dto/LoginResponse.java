package dev.royaumendi.talentmap.dto;

import dev.royaumendi.talentmap.entity.Role;

import java.util.Set;
import java.util.UUID;

public record LoginResponse(
        String token,
        UUID userId,
        String email,
        Set<Role> roles) {
}
