package dev.royaumendi.talentmap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "project_experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "talent_profile_id", nullable = false)
    private TalentProfile talentProfile;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String role;

    private String technologies;

    private String link;

    private LocalDate startDate;

    private LocalDate endDate;
}
