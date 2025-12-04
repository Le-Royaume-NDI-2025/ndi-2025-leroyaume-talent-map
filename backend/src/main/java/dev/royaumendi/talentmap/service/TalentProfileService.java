package dev.royaumendi.talentmap.service;

import dev.royaumendi.talentmap.dto.MyTalentProfileDto;
import dev.royaumendi.talentmap.dto.TalentDetailDto;
import dev.royaumendi.talentmap.dto.TalentSummaryDto;
import dev.royaumendi.talentmap.dto.UpsertTalentProfileRequest;
import dev.royaumendi.talentmap.entity.TalentProfile;
import dev.royaumendi.talentmap.entity.User;
import dev.royaumendi.talentmap.exception.ResourceNotFoundException;
import dev.royaumendi.talentmap.mapper.LanguageSkillMapper;
import dev.royaumendi.talentmap.mapper.ProjectExperienceMapper;
import dev.royaumendi.talentmap.mapper.SkillMapper;
import dev.royaumendi.talentmap.mapper.TalentProfileMapper;
import dev.royaumendi.talentmap.repository.TalentProfileRepository;
import dev.royaumendi.talentmap.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TalentProfileService {

    private final TalentProfileRepository talentProfileRepository;
    private final UserRepository userRepository;
    private final TalentProfileMapper talentProfileMapper;
    private final SkillMapper skillMapper;
    private final LanguageSkillMapper languageSkillMapper;
    private final ProjectExperienceMapper projectExperienceMapper;

    public TalentProfileService(
            TalentProfileRepository talentProfileRepository,
            UserRepository userRepository,
            TalentProfileMapper talentProfileMapper,
            SkillMapper skillMapper,
            LanguageSkillMapper languageSkillMapper,
            ProjectExperienceMapper projectExperienceMapper) {
        this.talentProfileRepository = talentProfileRepository;
        this.userRepository = userRepository;
        this.talentProfileMapper = talentProfileMapper;
        this.skillMapper = skillMapper;
        this.languageSkillMapper = languageSkillMapper;
        this.projectExperienceMapper = projectExperienceMapper;
    }

    public List<TalentSummaryDto> searchTalents(String city, String skill, Boolean verified) {
        List<TalentProfile> profiles;

        if (verified != null && verified) {
            profiles = talentProfileRepository.findByVerifiedTrue();
        } else if (city != null && !city.isEmpty()) {
            profiles = talentProfileRepository.findByCityContainingIgnoreCase(city);
        } else if (skill != null && !skill.isEmpty()) {
            profiles = talentProfileRepository.findBySkillNameContaining(skill);
        } else {
            profiles = talentProfileRepository.findAll();
        }

        return profiles.stream()
                .map(talentProfileMapper::toSummaryDto)
                .collect(Collectors.toList());
    }

    public TalentDetailDto getTalentDetail(UUID profileId) {
        TalentProfile profile = talentProfileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException("Talent profile not found"));
        return talentProfileMapper.toDetailDto(profile);
    }

    public MyTalentProfileDto getMyProfile(UUID userId) {
        TalentProfile profile = talentProfileRepository.findByUserId(userId);
        if (profile == null) {
            throw new ResourceNotFoundException("Profile not found");
        }
        return talentProfileMapper.toMyProfileDto(profile);
    }

    @Transactional
    public MyTalentProfileDto createMyProfile(UUID userId, UpsertTalentProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        TalentProfile profile = talentProfileMapper.fromUpsertRequest(request);
        profile.setUser(user);
        profile.setVerified(false);

        if (request.skills() != null) {
            request.skills().forEach(skillDto -> {
                var skill = skillMapper.fromDto(skillDto);
                profile.addSkill(skill);
            });
        }

        if (request.languages() != null) {
            request.languages().forEach(langDto -> {
                var language = languageSkillMapper.fromDto(langDto);
                profile.addLanguage(language);
            });
        }

        if (request.projects() != null) {
            request.projects().forEach(projDto -> {
                var project = projectExperienceMapper.fromDto(projDto);
                profile.addProject(project);
            });
        }

        TalentProfile saved = talentProfileRepository.save(profile);
        return talentProfileMapper.toMyProfileDto(saved);
    }

    @Transactional
    public MyTalentProfileDto updateMyProfile(UUID userId, UpsertTalentProfileRequest request) {
        TalentProfile profile = talentProfileRepository.findByUserId(userId);
        if (profile == null) {
            throw new ResourceNotFoundException("Profile not found");
        }

        profile.getSkills().clear();
        profile.getLanguages().clear();
        profile.getProjects().clear();

        talentProfileMapper.updateFromUpsertRequest(request, profile);

        if (request.skills() != null) {
            request.skills().forEach(skillDto -> {
                var skill = skillMapper.fromDto(skillDto);
                profile.addSkill(skill);
            });
        }

        if (request.languages() != null) {
            request.languages().forEach(langDto -> {
                var language = languageSkillMapper.fromDto(langDto);
                profile.addLanguage(language);
            });
        }

        if (request.projects() != null) {
            request.projects().forEach(projDto -> {
                var project = projectExperienceMapper.fromDto(projDto);
                profile.addProject(project);
            });
        }

        TalentProfile saved = talentProfileRepository.save(profile);
        return talentProfileMapper.toMyProfileDto(saved);
    }
}
