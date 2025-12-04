package dev.royaumendi.talentmap.mapper;

import dev.royaumendi.talentmap.dto.SkillDto;
import dev.royaumendi.talentmap.entity.Skill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    SkillDto toDto(Skill skill);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "talentProfile", ignore = true)
    Skill fromDto(SkillDto dto);
}
