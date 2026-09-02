export type Language = "en" | "es";

export interface LocalizedString {
  en: string;
  es: string;
}

export interface LocalizedArray {
  en: string[];
  es: string[];
}

export interface EducationItem {
  id: string;
  institution: LocalizedString;
  degree: LocalizedString;
  period: LocalizedString;
  status: LocalizedString;
  location: LocalizedString;
  description: LocalizedString;
  highlights?: LocalizedArray;
  badge?: LocalizedString;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: LocalizedString;
  period: LocalizedString;
  location: LocalizedString;
  type: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedArray;
  skills: string[];
}

export interface SkillCategory {
  id: string;
  title: LocalizedString;
  iconName: string;
  description: LocalizedString;
  skills: {
    name: string;
    level?: string;
    featured?: boolean;
    category: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: LocalizedString;
  description: LocalizedString;
  year: string;
  featured: boolean;
  status: "live" | "coming_soon" | "in_development";
  demoUrl?: string;
  githubUrl: string;
  technologies: string[];
  architectureHighlights: LocalizedArray;
  roadmap?: LocalizedArray;
  image?: string;
  category: "Full-Stack" | "Backend" | "Frontend" | "AI";
}

export interface PortfolioData {
  personal: {
    name: string;
    title: LocalizedString;
    subtitles: LocalizedArray;
    location: LocalizedString;
    email: string;
    statusBadge: LocalizedString;
    shortBio: LocalizedString;
    fullBio: LocalizedArray;
    social: {
      github: string;
      linkedin: string;
      email: string;
    };
    stats: {
      label: LocalizedString;
      value: string;
      suffix?: string;
    }[];
  };
  navigation: {
    about: LocalizedString;
    skills: LocalizedString;
    experience: LocalizedString;
    education: LocalizedString;
    projects: LocalizedString;
    contact: LocalizedString;
    cvButton: LocalizedString;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  contact: {
    title: LocalizedString;
    subtitle: LocalizedString;
    formName: LocalizedString;
    formEmail: LocalizedString;
    formMessage: LocalizedString;
    sendButton: LocalizedString;
    sending: LocalizedString;
    successMessage: LocalizedString;
    copyEmail: LocalizedString;
    copiedEmail: LocalizedString;
    locationLabel: LocalizedString;
    timezone: LocalizedString;
  };
}
