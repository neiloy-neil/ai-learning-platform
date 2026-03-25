import { UserRole } from '@/lib/pcdc-types';

export const appRoutes = {
  auth: {
    login: '/login',
    register: '/register',
  },
  student: {
    root: '/student',
    dashboard: '/student/dashboard',
    learningPath: '/student/learning-path',
    goals: '/student/goals',
    practice: '/student/practice',
    assessments: '/student/assessments',
    progress: '/student/progress',
  },
  teacher: {
    root: '/teacher',
    dashboard: '/teacher/dashboard',
  },
  parent: {
    root: '/parent',
    dashboard: '/parent/dashboard',
  },
  generic: {
    dashboard: '/dashboard',
    learningPath: '/learning-path',
    practice: '/practice',
    assessments: '/assessments',
  },
} as const;

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
