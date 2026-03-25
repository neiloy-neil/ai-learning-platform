import { UserRole } from '@/lib/pcdc-types';

export const appRoutes = {
  auth: {
    login: '/login',
    register: '/register',
  },
  student: {
    root: '/student',
    dashboard: '/student/dashboard',
    aiTutor: '/student/ai-tutor',
    learningPath: '/student/learning-path',
    goals: '/student/goals',
    practice: '/student/practice',
    assessments: '/student/assessments',
    revision: '/student/revision',
    studyPlan: '/student/study-plan',
    progress: '/student/progress',
  },
  teacher: {
    root: '/teacher',
    dashboard: '/teacher/dashboard',
    classes: '/teacher/classes',
    assignments: '/teacher/assignments',
    review: '/teacher/review',
    analytics: '/teacher/analytics',
    aiTools: '/teacher/ai-tools',
    messages: '/teacher/messages',
  },
  parent: {
    root: '/parent',
    dashboard: '/parent/dashboard',
    children: '/parent/children',
    reports: '/parent/reports',
    alerts: '/parent/alerts',
    messages: '/parent/messages',
    supportTips: '/parent/support-tips',
  },
  generic: {
    dashboard: '/dashboard',
    learningPath: '/learning-path',
    practice: '/practice',
    assessments: '/assessments',
  },
} as const;

export function getTeacherStudentRoute(studentId: string) {
  return `${appRoutes.teacher.root}/students/${studentId}`;
}

export function getDefaultRouteForRole(role: UserRole) {
  switch (role) {
    case UserRole.STUDENT:
      return appRoutes.student.dashboard;
    case UserRole.TEACHER:
      return appRoutes.teacher.dashboard;
    case UserRole.PARENT:
      return appRoutes.parent.dashboard;
    default:
      return appRoutes.auth.login;
  }
}
