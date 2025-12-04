package dev.royaumendi.talentmap.controller;

import dev.royaumendi.talentmap.dto.TalentSummaryDto;
import dev.royaumendi.talentmap.service.AdminTalentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/talents")
@PreAuthorize("hasRole('ADMIN')")
public class AdminTalentController {

    private final AdminTalentService adminTalentService;

    public AdminTalentController(AdminTalentService adminTalentService) {
        this.adminTalentService = adminTalentService;
    }

    @GetMapping("/pending")
    public ResponseEntity<List<TalentSummaryDto>> getPendingTalents() {
        return ResponseEntity.ok(adminTalentService.getUnverifiedTalents());
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<Void> verifyTalent(@PathVariable UUID id) {
        adminTalentService.verifyTalent(id);
        return ResponseEntity.ok().build();
    }
}
