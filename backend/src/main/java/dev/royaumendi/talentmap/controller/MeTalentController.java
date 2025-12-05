package dev.royaumendi.talentmap.controller;

import dev.royaumendi.talentmap.dto.MyTalentProfileDto;
import dev.royaumendi.talentmap.dto.UpsertTalentProfileRequest;
import dev.royaumendi.talentmap.service.TalentProfileService;
import dev.royaumendi.talentmap.service.FileStorageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/me/talent")
public class MeTalentController {

    private final TalentProfileService talentProfileService;
    private final FileStorageService fileStorageService;

    public MeTalentController(TalentProfileService talentProfileService, FileStorageService fileStorageService) {
        this.talentProfileService = talentProfileService;
        this.fileStorageService = fileStorageService;
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

    @PostMapping("/picture")
    public ResponseEntity<Map<String, String>> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        }

        if (!file.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().body(Map.of("error", "File must be an image"));
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body(Map.of("error", "File size must be less than 5MB"));
        }

        UUID userId = (UUID) authentication.getPrincipal();
        String fileUrl = fileStorageService.storeFile(file);

        talentProfileService.updateProfilePicture(userId, fileUrl);

        return ResponseEntity.ok(Map.of("url", fileUrl));
    }
}
