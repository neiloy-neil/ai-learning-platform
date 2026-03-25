interface RouteMetadata {
  title: string;
  subtitle: string;
}

export const metadataMap: Record<string, RouteMetadata> = {
  '/student/dashboard': {
    title: 'Student Dashboard',
    subtitle: 'Your personal learning hub.',
  },
  '/student/ai-tutor': {
    title: 'AI Tutor',
    subtitle: 'Ask for explanations, hints, quizzes, and next-step guidance powered by deterministic demo AI.',
  },
  '/student/goals': {
    title: 'My Goals',
    subtitle: 'Your weekly study plan and objectives.',
  },
  '/student/learning-path': {
    title: 'Your Learning Path',
    subtitle: 'Your journey through the concepts, one step at a time.',
  },
  '/student/assessments': {
    title: 'Assessments',
    subtitle: 'Test your knowledge and track your progress.',
  },
  '/student/revision': {
    title: 'Revision Queue',
    subtitle: 'Clear due concept refreshers and keep weak topics from slipping backwards.',
  },
  '/student/study-plan': {
    title: 'Study Plan',
    subtitle: 'Your AI-guided weekly schedule, priorities, and revision slots.',
  },
  '/student/practice': {
    title: 'Practice',
    subtitle: 'Work through targeted questions with instant feedback.',
  },
  '/student/progress': {
    title: 'Your Progress',
    subtitle: 'A detailed overview of your concept mastery.',
  },
  '/teacher/dashboard': {
    title: 'Teacher Dashboard',
    subtitle: 'Overview of class performance and concept risk areas.',
  },
  '/teacher/classes': {
    title: 'Classes',
    subtitle: 'Manage sections, cohorts, class focus areas, and roster ownership.',
  },
  '/teacher/assignments': {
    title: 'Assignments',
    subtitle: 'Coordinate templates, interventions, due dates, and targeted workload across cohorts.',
  },
  '/teacher/review': {
    title: 'Review Queue',
    subtitle: 'Track submissions, grading priorities, and the next set of work that needs teacher attention.',
  },
  '/teacher/analytics': {
    title: 'Analytics',
    subtitle: 'Inspect heatmaps, risk segmentation, concept drift, and class-level momentum.',
  },
  '/teacher/ai-tools': {
    title: 'AI Tools',
    subtitle: 'Generate quizzes, remediation sets, lesson outlines, curriculum sequences, and class summaries.',
  },
  '/teacher/messages': {
    title: 'Teacher Messages',
    subtitle: 'Coordinate with students and parents around interventions and follow-up.',
  },
  '/parent/dashboard': {
    title: 'Parent Dashboard',
    subtitle: 'An overview of your child\'s progress.',
  },
  '/parent/children': {
    title: 'Children',
    subtitle: 'Compare linked learners, current progress, and where support is needed most.',
  },
  '/parent/reports': {
    title: 'Reports',
    subtitle: 'Review printable weekly summaries, progress snapshots, and milestone updates.',
  },
  '/parent/alerts': {
    title: 'Alerts',
    subtitle: 'Track missed work, falling mastery, and the latest changes that need parent follow-up.',
  },
  '/parent/messages': {
    title: 'Parent Messages',
    subtitle: 'Keep up with teacher updates, reminders, and support requests.',
  },
  '/parent/support-tips': {
    title: 'Support Tips',
    subtitle: 'Use AI-guided at-home actions, explanations, and encouragement scripts built for parents.',
  },
};

export function getRouteMetadata(pathname: string): RouteMetadata {
  if (pathname.startsWith('/teacher/students/')) {
    return {
      title: 'Student Workspace',
      subtitle: 'Mastery trends, interventions, and follow-up actions for an individual learner.',
    };
  }

  return metadataMap[pathname] || { title: 'Dashboard', subtitle: 'Welcome to the platform.' };
}

const segmentLabelMap: Record<string, string> = {
  student: 'Student',
  teacher: 'Teacher',
  parent: 'Parent',
  messages: 'Messages',
  dashboard: 'Dashboard',
  'ai-tutor': 'AI Tutor',
  'learning-path': 'Learning Path',
  goals: 'Goals',
  practice: 'Practice',
  assessments: 'Assessments',
  revision: 'Revision',
  'study-plan': 'Study Plan',
  progress: 'Progress',
  students: 'Students',
  classes: 'Classes',
  assignments: 'Assignments',
  review: 'Review',
  analytics: 'Analytics',
  'ai-tools': 'AI Tools',
  children: 'Children',
  reports: 'Reports',
  alerts: 'Alerts',
  'support-tips': 'Support Tips',
};

export function getRouteSegmentLabel(segment: string): string {
  return segmentLabelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}
