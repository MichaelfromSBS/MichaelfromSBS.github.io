export interface PersonalInfo {
  name: string;
  headline: string;
  tagline: string;
  bio: string;
  school: string;
  degree: string;
  concentration: string;
  graduationYear: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  resumeUrl?: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  concentration?: string;
  period: string;
  coursework?: {
    code: string;
    name: string;
  }[];
  honors?: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
  iconName: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  lab: string;
  advisor: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
  paperUrl?: string;
  codeUrl?: string;
  demoUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  category: 'AI/ML' | 'Systems' | 'Web & Mobile' | 'Robotics';
  featured: boolean;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
}

export interface HonorItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  highlightRank?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  points: string[];
  tags?: string[];
}
