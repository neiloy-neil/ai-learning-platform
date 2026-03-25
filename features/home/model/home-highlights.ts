export type Highlight = {
  title: string;
  description: string;
  eyebrow: string;
};

export const homeHighlights: Highlight[] = [
  {
    eyebrow: "Student",
    title: "Practice, assessments, and mastery",
    description: "Demo-ready learning flows connect question sessions to updated mastery, goals, reminders, and progress views.",
  },
  {
    eyebrow: "Teacher",
    title: "Class risk and intervention visibility",
    description: "Teacher dashboards surface weak concepts, assignment summaries, and student drill-downs from one shared mock dataset.",
  },
  {
    eyebrow: "Parent",
    title: "Clear progress and alerts",
    description: "Parent-facing reporting keeps strengths, weak spots, and support signals easy to understand without analytics jargon.",
  },
];
