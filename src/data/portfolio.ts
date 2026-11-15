import gearJson from "./GearData.json";
import projectJson from "./ProjectData.json";
import requestJson from "./RequestData.json";

export type SectionId = "home" | "about" | "projects" | "skills" | "contact";

export type SectionMeta = {
  id: SectionId;
  label: string;
  code: string;
  sub: string;
};

export const SECTIONS: SectionMeta[] = [
  { id: "home", label: "HOME", code: "01", sub: "OVERVIEW" },
  { id: "about", label: "ABOUT", code: "02", sub: "PILOT RECORD" },
  { id: "projects", label: "PROJECTS", code: "03", sub: "MISSION FILES" },
  { id: "skills", label: "SKILLS", code: "04", sub: "CAPABILITY" },
  { id: "contact", label: "CONTACT", code: "05", sub: "COMMS" },
];

export const PROFILE = {
  name: "ARFY SLOWY",
  callsign: "SLOWY_001",
  role: "SOFTWARE ENGINEER",
  domain: "SOFTWARE / DESIGN",
  status: "ACTIVE",
  intro:
    "Software engineer working across systems programming and AI research. Builds operating systems, database engines, and compilers — and keeps coming back to quantum computing.",
  hobbies: ["Coding", "Dota", "Film"],
  languages: [
    "Python",
    "C++",
    "C",
    "Assembly",
    "Rust",
    "Zig",
    "Golang",
  ],
  learning: [
    "Nim",
    "Quantum computing",
    "Geospatial information systems (GIS)",
  ],
  github: "https://github.com/slowy07",
  youtube: "https://youtube.com/@arfyslowy",
  wakatime: "https://wakatime.com/@slowy07",
};

export const ABOUT = {
  paragraphs: [
    "Software engineer and AI researcher. The work moves between low-level systems — operating systems, database engines, compilers and transpilers — and research-flavoured problems such as quantum computing and geospatial analysis.",
    "Volunteering has run alongside the engineering: data-flow work for machine-learning projects at Intel, AI-oriented quantitative investment at Microsoft, and interactive geospatial tooling with the Google Earth Engine community and OpenGeos.",
    "Off the clock: coding, Dota, and film. The learning queue currently holds Nim, quantum computing, and GIS.",
  ],
  focus: ["Systems", "AI research", "Quantum computing", "Geospatial"],
};

export type Project = {
  title: string;
  description: string;
  technology: string;
  visibleProject: string;
  image: string;
  link: string;
};

export const PROJECTS = projectJson as Project[];

export const PROJECT_STACKS = [
  ...new Set(PROJECTS.map((project) => project.technology)),
];

export type SkillStatus = "logged" | "learning" | "environment";

export type SkillGroup = {
  id: string;
  label: string;
  note: string;
  items: { name: string; status: SkillStatus }[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    label: "LANGUAGES",
    note: "ON RECORD",
    items: [
      { name: "Python", status: "logged" },
      { name: "C++", status: "logged" },
      { name: "C", status: "logged" },
      { name: "Assembly", status: "logged" },
      { name: "Rust", status: "logged" },
      { name: "Zig", status: "logged" },
      { name: "Golang", status: "logged" },
      { name: "Nim", status: "learning" },
    ],
  },
  {
    id: "environment",
    label: "ENVIRONMENT",
    note: "DAILY DRIVERS",
    items: [
      { name: "Linux / EndeavourOS", status: "environment" },
      { name: "BSPWM", status: "environment" },
      { name: "Neovim", status: "environment" },
      { name: "VSCodium", status: "environment" },
      { name: "Ghostty / Kitty", status: "environment" },
      { name: "TensorFlow / Magenta", status: "environment" },
    ],
  },
  {
    id: "domains",
    label: "DOMAINS",
    note: "BUILD / RESEARCH",
    items: [
      { name: "Systems programming", status: "logged" },
      { name: "AI research", status: "logged" },
      { name: "Compiler / transpiler work", status: "logged" },
      { name: "Quantum computing", status: "learning" },
      { name: "Geospatial analysis (GIS)", status: "learning" },
    ],
  },
];

export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  type: "WORK" | "VOLUNTEER";
  detail: string;
  active: boolean;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    org: "GOOGLE BRAIN",
    role: "SOFTWARE ENGINEER",
    period: "2021 — 2023",
    type: "WORK",
    detail:
      "Worked on Google Brain, specifically Magenta and TensorFlow. Left in 2023 to step away from the tech industry and restore a healthier work-life balance.",
    active: false,
  },
  {
    org: "OPENGEOS",
    role: "SOFTWARE ENGINEER · VOLUNTEER",
    period: "2024 — PRESENT",
    type: "VOLUNTEER",
    detail:
      "Open-source geospatial software projects developed by a community of geospatial software developers and researchers.",
    active: true,
  },
  {
    org: "MICROSOFT",
    role: "SOFTWARE ENGINEER · VOLUNTEER",
    period: "2023",
    type: "VOLUNTEER",
    detail:
      "AI-oriented quantitative investment, applying AI technologies to quantitative investment work.",
    active: false,
  },
  {
    org: "GOOGLE EARTH ENGINE",
    role: "SOFTWARE ENGINEER · VOLUNTEER",
    period: "2021 — PRESENT",
    type: "VOLUNTEER",
    detail:
      "Packaging interactive geospatial analysis and visualisation with Google Earth Engine.",
    active: true,
  },
  {
    org: "INTEL",
    role: "SOFTWARE ENGINEER · VOLUNTEER",
    period: "2021",
    type: "VOLUNTEER",
    detail:
      "Data-flow facilitator for machine learning: generating easy datasets, then training and using ML models.",
    active: false,
  },
];

export const TRAINING = [
  { name: "Nim", kind: "PROGRAMMING LANGUAGE" },
  { name: "Quantum computing", kind: "RESEARCH FIELD" },
  { name: "Geospatial information systems", kind: "RESEARCH FIELD" },
];

export type GearItem = { item: string; desc: string; type?: string[] };
export type GearGroup = { gear: string; gearList: GearItem[] };

export const GEAR = (gearJson as { gearType: GearGroup[] }).gearType;

export type Channel = {
  id: string;
  label: string;
  handle: string;
  href: string;
  note: string;
};

export const CHANNELS: Channel[] = [
  {
    id: "github",
    label: "GITHUB",
    handle: "github.com/slowy07",
    href: PROFILE.github,
    note: "SOURCE / PROJECTS",
  },
  {
    id: "youtube",
    label: "YOUTUBE",
    handle: "youtube.com/@arfyslowy",
    href: PROFILE.youtube,
    note: "VIDEO / TUTORIALS",
  },
  {
    id: "wakatime",
    label: "WAKATIME",
    handle: "wakatime.com/@slowy07",
    href: PROFILE.wakatime,
    note: "CODING ACTIVITY",
  },
];

export type SupportRequest = { name: string; nominal: number; note?: string };

export const REQUESTS = requestJson as SupportRequest[];
export const REQUESTS_TOTAL = REQUESTS.reduce(
  (sum, request) => sum + request.nominal,
  0
);
