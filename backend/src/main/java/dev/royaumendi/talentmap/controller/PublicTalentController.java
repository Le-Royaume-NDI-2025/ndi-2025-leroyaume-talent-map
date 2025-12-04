package dev.royaumendi.talentmap.controller;

import dev.royaumendi.talentmap.dto.TalentDetailDto;
import dev.royaumendi.talentmap.dto.TalentSummaryDto;
import dev.royaumendi.talentmap.service.TalentProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/public/talents")
public class PublicTalentController {

    private final TalentProfileService talentProfileService;

    public PublicTalentController(TalentProfileService talentProfileService) {
        this.talentProfileService = talentProfileService;
    }

    @GetMapping
    public ResponseEntity<List<TalentSummaryDto>> getAllTalents(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) Boolean verified) {
        return ResponseEntity.ok(talentProfileService.searchTalents(city, skill, verified));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TalentDetailDto> getTalentById(@PathVariable UUID id) {
        return ResponseEntity.ok(talentProfileService.getTalentDetail(id));
    }
}
