package dev.royaumendi.talentmap.service;

import dev.royaumendi.talentmap.dto.TalentSummaryDto;
import dev.royaumendi.talentmap.entity.TalentProfile;
import dev.royaumendi.talentmap.exception.ResourceNotFoundException;
import dev.royaumendi.talentmap.mapper.TalentProfileMapper;
import dev.royaumendi.talentmap.repository.TalentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminTalentService {

    private final TalentProfileRepository talentProfileRepository;
    private final TalentProfileMapper talentProfileMapper;

    public AdminTalentService(TalentProfileRepository talentProfileRepository,
            TalentProfileMapper talentProfileMapper) {
        this.talentProfileRepository = talentProfileRepository;
        this.talentProfileMapper = talentProfileMapper;
    }

    public List<TalentSummaryDto> getUnverifiedTalents() {
        return talentProfileRepository.findByVerifiedFalse().stream()
                .map(talentProfileMapper::toSummaryDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void verifyTalent(UUID profileId) {
        TalentProfile profile = talentProfileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

        profile.setVerified(true);
        profile.setVerifiedAt(Instant.now());

        talentProfileRepository.save(profile);
    }
}
