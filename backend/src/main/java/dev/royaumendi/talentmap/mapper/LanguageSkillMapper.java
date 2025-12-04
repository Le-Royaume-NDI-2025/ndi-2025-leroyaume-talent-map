package dev.royaumendi.talentmap.mapper;

import dev.royaumendi.talentmap.dto.LanguageSkillDto;
import dev.royaumendi.talentmap.entity.LanguageSkill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LanguageSkillMapper {

    LanguageSkillDto toDto(LanguageSkill languageSkill);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "talentProfile", ignore = true)
    LanguageSkill fromDto(LanguageSkillDto dto);
}
