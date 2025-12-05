export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum SkillCategory {
    PROGRAMMING = 'PROGRAMMING',
    DESIGN = 'DESIGN',
    MANAGEMENT = 'MANAGEMENT',
    COMMUNICATION = 'COMMUNICATION',
    OTHER = 'OTHER',
}

export enum SkillLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
    EXPERT = 'EXPERT',
}

export enum LanguageProficiency {
    BASIC = 'BASIC',
    CONVERSATIONAL = 'CONVERSATIONAL',
    PROFESSIONAL = 'PROFESSIONAL',
    NATIVE = 'NATIVE',
}

export enum AvailabilityStatus {
    AVAILABLE = 'AVAILABLE',
    BUSY = 'BUSY',
    NOT_LOOKING = 'NOT_LOOKING',
}

export interface SkillDto {
    name: string;
    category: SkillCategory;
    level: SkillLevel;
}

export interface LanguageSkillDto {
    languageName: string;
    proficiency: LanguageProficiency;
}

export interface ProjectExperienceDto {
    name: string;
    description?: string;
    role?: string;
    technologies?: string;
    link?: string;
    startDate?: string;
    endDate?: string;
}

export interface TalentSummaryDto {
    id: string;
    firstName: string;
    lastName: string;
    title?: string;
    city?: string;
    country?: string;
    profilePictureUrl?: string;
    verified: boolean;
    skillNames: string[];
}

export interface TalentDetailDto {
    id: string;
    firstName: string;
    lastName: string;
    title?: string;
    bio?: string;
    city?: string;
    country?: string;
    profilePictureUrl?: string;
    availabilityStatus: AvailabilityStatus;
    verified: boolean;
    skills: SkillDto[];
    languages: LanguageSkillDto[];
    projects: ProjectExperienceDto[];
}

export interface MyTalentProfileDto {
    id: string;
    firstName: string;
    lastName: string;
    title?: string;
    bio?: string;
    city?: string;
    country?: string;
    profilePictureUrl?: string;
    availabilityStatus: AvailabilityStatus;
    verified: boolean;
    skills: SkillDto[];
    languages: LanguageSkillDto[];
    projects: ProjectExperienceDto[];
}

export interface UpsertTalentProfileRequest {
    firstName: string;
    lastName: string;
    title?: string;
    bio?: string;
    city?: string;
    country?: string;
    profilePictureUrl?: string;
    availabilityStatus?: AvailabilityStatus;
    skills?: SkillDto[];
    languages?: LanguageSkillDto[];
    projects?: ProjectExperienceDto[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginResponse {
    token: string;
    userId: string;
    email: string;
    roles: Role[];
}
