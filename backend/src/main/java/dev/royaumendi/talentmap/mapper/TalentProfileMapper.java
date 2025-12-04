package dev.royaumendi.talentmap.mapper;

import dev.royaumendi.talentmap.dto.MyTalentProfileDto;
import dev.royaumendi.talentmap.dto.TalentDetailDto;
import dev.royaumendi.talentmap.dto.TalentSummaryDto;
import dev.royaumendi.talentmap.dto.UpsertTalentProfileRequest;
import dev.royaumendi.talentmap.entity.TalentProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { SkillMapper.class, LanguageSkillMapper.class,
        ProjectExperienceMapper.class })
public interface TalentProfileMapper {

    @Mapping(target = "skillNames", expression = "java(extractSkillNames(profile))")
    TalentSummaryDto toSummaryDto(TalentProfile profile);

    TalentDetailDto toDetailDto(TalentProfile profile);

    MyTalentProfileDto toMyProfileDto(TalentProfile profile);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "verified", ignore = true)
    @Mapping(target = "verifiedAt", ignore = true)
    TalentProfile fromUpsertRequest(UpsertTalentProfileRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "verified", ignore = true)
    @Mapping(target = "verifiedAt", ignore = true)
    void updateFromUpsertRequest(UpsertTalentProfileRequest request, @MappingTarget TalentProfile profile);

    default List<String> extractSkillNames(TalentProfile profile) {
        if (profile == null || profile.getSkills() == null) {
            return List.of();
        }
        return profile.getSkills().stream()
                .map(skill -> skill.getName())
                .collect(Collectors.toList());
    }
}
