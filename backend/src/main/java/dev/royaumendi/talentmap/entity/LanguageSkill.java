package dev.royaumendi.talentmap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "language_skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LanguageSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "talent_profile_id", nullable = false)
    private TalentProfile talentProfile;

    @Column(nullable = false)
    private String languageName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LanguageProficiency proficiency;
}
