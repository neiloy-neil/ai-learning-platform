interface RouteMetadata {
  title: string;
  subtitle: string;
}

export const metadataMap: Record<string, RouteMetadata> = {
  '/student/dashboard': {
    title: 'Student Dashboard',
    subtitle: 'Your personal learning hub.',
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
  '/teacher/messages': {
    title: 'Teacher Messages',
    subtitle: 'Coordinate with students and parents around interventions and follow-up.',
  },
  '/parent/dashboard': {
    title: 'Parent Dashboard',
    subtitle: 'An overview of your child\'s progress.',
  },
  '/parent/messages': {
    title: 'Parent Messages',
    subtitle: 'Keep up with teacher updates, reminders, and support requests.',
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
  'learning-path': 'Learning Path',
  goals: 'Goals',
  practice: 'Practice',
  assessments: 'Assessments',
  progress: 'Progress',
  students: 'Students',
};

export function getRouteSegmentLabel(segment: string): string {
  return segmentLabelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}
