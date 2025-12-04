package dev.royaumendi.talentmap.mapper;

import dev.royaumendi.talentmap.dto.ProjectExperienceDto;
import dev.royaumendi.talentmap.entity.ProjectExperience;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectExperienceMapper {

    ProjectExperienceDto toDto(ProjectExperience projectExperience);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "talentProfile", ignore = true)
    ProjectExperience fromDto(ProjectExperienceDto dto);
}
