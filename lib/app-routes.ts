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
    family: '/parent/family',
    children: '/parent/children',
    reports: '/parent/reports',
    alerts: '/parent/alerts',
    messages: '/parent/messages',
    supportTips: '/parent/support-tips',
  },
  admin: {
    root: '/admin',
    dashboard: '/admin/dashboard',
    students: '/admin/students',
    leads: '/admin/leads',
    bookings: '/admin/bookings',
    enrolments: '/admin/enrolments',
    schedule: '/admin/schedule',
    workflow: '/admin/workflow',
    'enrolment-reports': '/admin/enrolment-reports',
    attendance: '/admin/attendance',
    homework: '/admin/homework',
    'academic-reports': '/admin/academic-reports',
    notifications: '/admin/notifications',
    'class-workflow': '/admin/class-workflow',
    makeup: '/admin/makeup',
    billing: '/admin/billing',
    'fee-rules': '/admin/billing/fee-rules',
    invoices: '/admin/billing/invoices',
    payments: '/admin/billing/payments',
    overdue: '/admin/billing/overdue',
    analytics: '/admin/analytics',
    users: '/admin/users',
    classes: '/admin/classes',
    content: '/admin/content',
    reports: '/admin/reports',
    emails: '/admin/emails',
    system: '/admin/system',
    settings: '/admin/settings',
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
    case UserRole.ADMIN:
      return appRoutes.admin.dashboard;
    default:
      return appRoutes.auth.login;
  }
}
