export type Language = 'en' | 'de';

export interface Technology {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  /** i18n key of the project description */
  descriptionKey: string;
  technologies: Technology[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

export interface SkillHint {
  /** i18n key of the tooltip text */
  textKey: string;
  technologies: Technology[];
}

export interface Skill {
  /** i18n key of the label */
  labelKey: string;
  icon: string;
  /** Optional tooltip shown on hover */
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
