interface RouteMetadata {
  title: string;
  subtitle: string;
}

const metadataMap: Record<string, RouteMetadata> = {
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
  '/parent/dashboard': {
    title: 'Parent Dashboard',
    subtitle: 'An overview of your child\'s progress.',
  },
};

export function getRouteMetadata(pathname: string): RouteMetadata {
  return metadataMap[pathname] || { title: 'Dashboard', subtitle: 'Welcome to the platform.' };
}
