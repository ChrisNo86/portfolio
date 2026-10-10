import { Project, Skill, Technology } from '../models/portfolio.models';

const ICONS = 'assets/icons';

const TECH = {
  html: { name: 'HTML', icon: `${ICONS}/tech-html.svg` },
  css: { name: 'CSS', icon: `${ICONS}/tech-css.svg` },
  scss: { name: 'SCSS', icon: `${ICONS}/tech-css.svg` },
  javascript: { name: 'JavaScript', icon: `${ICONS}/tech-javascript.svg` },
  typescript: { name: 'TypeScript', icon: `${ICONS}/tech-typescript.svg` },
  firebase: { name: 'Firebase', icon: `${ICONS}/tech-firebase.svg` },
} satisfies Record<string, Technology>;

// TODO: replace liveUrl with the subdomains on your own server.
export const PROJECTS: Project[] = [
  {
    id: 'join',
    title: 'Join',
    descriptionKey: 'projects.items.join',
    technologies: [TECH.html, TECH.scss, TECH.javascript, TECH.firebase],
    githubUrl: 'https://github.com/ChrisNo86/join-app',
    liveUrl: 'https://join.TODO-your-domain.de',
    image: 'assets/img/project-join.jpg',
  },
  {
    id: 'el-pollo-loco',
    title: 'El Pollo Loco',
    descriptionKey: 'projects.items.elPolloLoco',
    technologies: [TECH.html, TECH.scss, TECH.javascript],
    githubUrl: 'https://github.com/ChrisNo86/el-pollo-loco',
    liveUrl: 'https://el-pollo-loco.TODO-your-domain.de',
    image: 'assets/img/project-el-pollo-loco.jpg',
  },
  {
    id: 'memory',
    title: 'Memory',
    descriptionKey: 'projects.items.memory',
    technologies: [TECH.typescript, TECH.html, TECH.css],
    githubUrl: 'https://github.com/ChrisNo86/memory',
    liveUrl: 'https://memory.TODO-your-domain.de',
    image: 'assets/img/project-memory.jpg',
  },
];

export const SKILLS: Skill[] = [
  { labelKey: 'skills.items.html', icon: `${ICONS}/skill-html.svg` },
  { labelKey: 'skills.items.css', icon: `${ICONS}/skill-css.svg` },
  { labelKey: 'skills.items.javascript', icon: `${ICONS}/skill-js.svg` },
  { labelKey: 'skills.items.materialDesign', icon: `${ICONS}/skill-material.svg` },
  { labelKey: 'skills.items.typescript', icon: `${ICONS}/skill-ts.svg` },
  { labelKey: 'skills.items.angular', icon: `${ICONS}/skill-angular.svg` },
  { labelKey: 'skills.items.supabase', icon: `${ICONS}/skill-supabase.svg` },
  { labelKey: 'skills.items.git', icon: `${ICONS}/skill-git.svg` },
  { labelKey: 'skills.items.restApi', icon: `${ICONS}/skill-api.svg` },
  { labelKey: 'skills.items.scrum', icon: `${ICONS}/skill-scrum.svg` },
  {
    labelKey: 'skills.items.growthMindset',
    icon: `${ICONS}/skill-growth.svg`,
    // TODO: adjust to the technologies you are really interested in learning
    hint: {
      textKey: 'skills.growthHint',
      technologies: [
        { name: 'React', icon: `${ICONS}/hint-react.svg` },
        { name: 'Vue Js', icon: `${ICONS}/hint-vue.svg` },
      ],
    },
  },
];
