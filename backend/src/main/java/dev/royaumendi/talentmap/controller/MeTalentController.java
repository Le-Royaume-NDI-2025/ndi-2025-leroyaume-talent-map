package dev.royaumendi.talentmap.controller;

import dev.royaumendi.talentmap.dto.MyTalentProfileDto;
import dev.royaumendi.talentmap.dto.UpsertTalentProfileRequest;
import dev.royaumendi.talentmap.service.TalentProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/me/talent")
public class MeTalentController {

    private final TalentProfileService talentProfileService;

    public MeTalentController(TalentProfileService talentProfileService) {
        this.talentProfileService = talentProfileService;
    }

    @GetMapping
    public ResponseEntity<MyTalentProfileDto> getMyProfile(Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(talentProfileService.getMyProfile(userId));
    }

    @PutMapping
    public ResponseEntity<MyTalentProfileDto> updateMyProfile(
            @Valid @RequestBody UpsertTalentProfileRequest request,
            Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(talentProfileService.updateMyProfile(userId, request));
    }

    @PostMapping
    public ResponseEntity<MyTalentProfileDto> createMyProfile(
            @Valid @RequestBody UpsertTalentProfileRequest request,
            Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(talentProfileService.createMyProfile(userId, request));
    }
}
