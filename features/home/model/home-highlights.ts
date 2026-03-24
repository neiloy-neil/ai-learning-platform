export type Highlight = {
  title: string;
  description: string;
  eyebrow: string;
};

export const homeHighlights: Highlight[] = [
  {
    eyebrow: "Learn",
    title: "Structured AI paths",
    description: "Curated learning tracks that break large topics into progressive, production-oriented milestones.",
  },
  {
    eyebrow: "Build",
    title: "Reusable project kits",
    description: "Composable UI and feature modules that keep experiments fast without sacrificing maintainability.",
  },
  {
    eyebrow: "Ship",
    title: "Clean architecture by default",
    description: "Shared boundaries between app, features, components, and libraries keep the frontend scalable as it grows.",
  },
];
