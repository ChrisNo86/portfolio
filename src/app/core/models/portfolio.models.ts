export type Language = 'en' | 'de';

export interface Technology {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  descriptionKey: string;
  technologies: Technology[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

export interface SkillHint {
  textKey: string;
  technologies: Technology[];
}

export interface Skill {
  labelKey: string;
  icon: string;
  hint?: SkillHint;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
}
