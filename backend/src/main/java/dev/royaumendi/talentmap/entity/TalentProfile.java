package dev.royaumendi.talentmap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "talent_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TalentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String city;

    private String country;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AvailabilityStatus availabilityStatus = AvailabilityStatus.NOT_LOOKING;

    @Column(nullable = false)
    private Boolean verified = false;

    private Instant verifiedAt;

    @OneToMany(mappedBy = "talentProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "talentProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LanguageSkill> languages = new ArrayList<>();

    @OneToMany(mappedBy = "talentProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectExperience> projects = new ArrayList<>();

    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.setTalentProfile(this);
    }

    public void addLanguage(LanguageSkill language) {
        languages.add(language);
        language.setTalentProfile(this);
    }

    public void addProject(ProjectExperience project) {
        projects.add(project);
        project.setTalentProfile(this);
    }
}
