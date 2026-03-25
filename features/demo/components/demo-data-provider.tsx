'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  buildAssessmentResult,
  buildDashboardData,
  buildLearningPath,
  buildProgressData,
  completePracticeSession,
  createInitialStudentState,
  createInitialTeacherManagementState,
  demoUsers,
  getAssessments,
  getNotificationsForUserFromState,
  getPracticeQuestions,
  mockConcepts,
  type DemoAssessmentResult,
  type DemoGoal,
  type DemoStudentState,
  type DemoTeacherClass,
  type DemoTeacherNudge,
  type DemoTeacherStudent,
  type PracticeMode,
  type TeacherCohort,
} from '@/lib/mocks';
import type { Assignment, Notification } from '@/lib/pcdc-types';

const storageKey = 'demoStudentState';
const teacherStorageKey = 'demoTeacherManagementState';

type DemoTeacherManagementState = {
  classes: DemoTeacherClass[];
  students: DemoTeacherStudent[];
  assignments: Assignment[];
  nudges: DemoTeacherNudge[];
};

type DemoDataContextType = {
  state: DemoStudentState;
  teacherState: DemoTeacherManagementState;
  dashboardData: ReturnType<typeof buildDashboardData>;
  progressData: ReturnType<typeof buildProgressData>;
  learningPath: ReturnType<typeof buildLearningPath>;
  goals: DemoGoal[];
  assessments: ReturnType<typeof getAssessments>;
  getNotifications: (userId?: string) => Notification[];
  markNotificationRead: (notificationId: string) => void;
  archiveNotification: (notificationId: string) => void;
  addTeacherClass: (input: { name: string; section: string; focusArea: string }) => void;
  assignStudentToClass: (studentId: string, classId: string) => void;
  cycleStudentCohort: (studentId: string) => void;
  createTeacherAssignment: (input: { title: string; description: string; studentId: string; dueDate: string }) => void;
  sendTeacherNudge: (input: {
    studentId: string;
    audience: 'student' | 'parent';
    message: string;
    category: 'Encouragement' | 'Intervention' | 'Follow-up';
  }) => void;
  completeSession: (input: {
    answers: Array<{ questionId: string; selectedOptionId: string; confidenceRating: number }>;
    mode: PracticeMode;
    conceptId?: string | null;
    assessmentId?: string | null;
  }) => DemoAssessmentResult | null;
  addGoal: () => void;
  cycleGoalStatus: (goalId: string) => void;
};

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

function reviveDemoState(raw: string): DemoStudentState {
  const parsed = JSON.parse(raw) as DemoStudentState;
  return {
    ...parsed,
    mastery: parsed.mastery.map((item) => ({ ...item, lastUpdated: new Date(item.lastUpdated) })),
    notifications: parsed.notifications.map((item) => ({ ...item, createdAt: new Date(item.createdAt) })),
  };
}

function reviveTeacherState(raw: string): DemoTeacherManagementState {
  const parsed = JSON.parse(raw) as DemoTeacherManagementState;
  return {
    ...parsed,
    assignments: parsed.assignments.map((item) => ({
      ...item,
      assignedDate: new Date(item.assignedDate),
      dueDate: new Date(item.dueDate),
    })),
  };
}

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoStudentState>(createInitialStudentState());
  const [teacherState, setTeacherState] = useState<DemoTeacherManagementState>(createInitialTeacherManagementState());

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue) {
      setState(reviveDemoState(storedValue));
    }

    const storedTeacherState = localStorage.getItem(teacherStorageKey);
    if (storedTeacherState) {
      setTeacherState(reviveTeacherState(storedTeacherState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem(teacherStorageKey, JSON.stringify(teacherState));
  }, [teacherState]);

  const value = useMemo<DemoDataContextType>(() => {
    const dashboardData = buildDashboardData(state);
    const progressData = buildProgressData(state.mastery, state.attempts);
    const learningPath = buildLearningPath(state.mastery);
    const assessments = getAssessments(state);

    return {
      state,
      teacherState,
      dashboardData,
      progressData,
      learningPath,
      goals: state.goals,
      assessments,
      getNotifications: (userId) => getNotificationsForUserFromState(state.notifications, userId),
      markNotificationRead: (notificationId) => {
        setState((current) => ({
          ...current,
          notifications: current.notifications.map((notification) =>
            notification.id === notificationId ? { ...notification, read: true } : notification,
          ),
        }));
      },
      archiveNotification: (notificationId) => {
        setState((current) => ({
          ...current,
          notifications: current.notifications.filter((notification) => notification.id !== notificationId),
        }));
      },
      addTeacherClass: (input) => {
        setTeacherState((current) => ({
          ...current,
          classes: [
            {
              id: `class-${current.classes.length + 1}`,
              name: input.name,
              section: input.section,
              focusArea: input.focusArea,
              studentIds: [],
            },
            ...current.classes,
          ],
        }));
      },
      assignStudentToClass: (studentId, classId) => {
        setTeacherState((current) => {
          const nextStudents = current.students.map((student) =>
            student.id === studentId ? { ...student, classId } : student,
          );

          const nextClasses = current.classes.map((teacherClass) => ({
            ...teacherClass,
            studentIds:
              teacherClass.id === classId
                ? Array.from(new Set([...teacherClass.studentIds, studentId]))
                : teacherClass.studentIds.filter((id) => id !== studentId),
          }));

          return {
            ...current,
            classes: nextClasses,
            students: nextStudents,
          };
        });
      },
      cycleStudentCohort: (studentId) => {
        const cohortOrder: TeacherCohort[] = ['Core', 'Acceleration', 'Intervention'];
        setTeacherState((current) => ({
          ...current,
          students: current.students.map((student) => {
            if (student.id !== studentId) {
              return student;
            }

            const currentIndex = cohortOrder.indexOf(student.cohort);
            return {
              ...student,
              cohort: cohortOrder[(currentIndex + 1) % cohortOrder.length],
            };
          }),
        }));
      },
      createTeacherAssignment: (input) => {
        setTeacherState((current) => ({
          ...current,
          assignments: [
            {
              id: `assignment-${current.assignments.length + 1}`,
              title: input.title,
              description: input.description,
              assignedDate: new Date(),
              dueDate: new Date(input.dueDate),
              status: 'Assigned',
              assignedToStudentId: input.studentId,
            },
            ...current.assignments,
          ],
        }));

        setState((current) => ({
          ...current,
          notifications: [
            {
              id: `notification-${current.notifications.length + 1}`,
              userId: demoUsers.student.id,
              text: `New targeted assignment added: ${input.title}.`,
              read: false,
              createdAt: new Date(),
            },
            ...current.notifications,
          ],
        }));
      },
      sendTeacherNudge: (input) => {
        setTeacherState((current) => ({
          ...current,
          nudges: [
            {
              id: `nudge-${current.nudges.length + 1}`,
              studentId: input.studentId,
              audience: input.audience,
              message: input.message,
              category: input.category,
              sentAt: new Date().toISOString(),
            },
            ...current.nudges,
          ],
        }));

        setState((current) => ({
          ...current,
          notifications: [
            {
              id: `notification-${current.notifications.length + 1}`,
              userId: input.audience === 'parent' ? demoUsers.parent.id : demoUsers.student.id,
              text: input.message,
              read: false,
              createdAt: new Date(),
            },
            ...current.notifications,
          ],
        }));
      },
      completeSession: (input) => {
        const nextState = completePracticeSession(state, input);
        const result = input.assessmentId
          ? buildAssessmentResult(nextState.assessments.find((assessment) => assessment.id === input.assessmentId) ?? assessments[0], nextState.attempts)
          : null;
        setState(nextState);
        return result;
      },
      addGoal: () => {
        setState((current) => ({
          ...current,
          goals: [
            {
              id: `goal-${current.goals.length + 1}`,
              text: `New demo goal ${current.goals.length + 1}`,
              progress: 0,
              metric: 'concepts',
              status: 'active',
            },
            ...current.goals,
          ],
        }));
      },
      cycleGoalStatus: (goalId) => {
        setState((current) => ({
          ...current,
          goals: current.goals.map((goal) => {
            if (goal.id !== goalId) return goal;
            if (goal.status === 'active') {
              return { ...goal, progress: Math.max(goal.progress, 100), status: 'completed' };
            }
            if (goal.status === 'completed') {
              return { ...goal, status: 'archived' };
            }
            return { ...goal, status: 'active', progress: 0 };
          }),
        }));
      },
    };
  }, [state, teacherState]);

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
}

export function getDemoPracticeTitle(input: { conceptId?: string | null; assessmentId?: string | null; mode?: string | null }) {
  const assessment = input.assessmentId ? getAssessments().find((item) => item.id === input.assessmentId) : null;
  const concept = input.conceptId ? mockConcepts.find((item) => item.id === input.conceptId) : null;
  const mode = input.mode as PracticeMode | null;

  if (assessment) {
    return {
      title: assessment.title,
      subtitle: `Assessment session with ${assessment.questionCount} questions and concept-level scoring.`,
      mode: 'assessment-review' as PracticeMode,
      questions: getPracticeQuestions({ assessmentId: assessment.id }),
    };
  }

  if (mode === 'revision') {
    return {
      title: 'Revision Queue Session',
      subtitle: 'Refresh weak or stale concepts before they slip.',
      mode,
      questions: getPracticeQuestions({ mode }),
    };
  }

  if (mode === 'recommended') {
    return {
      title: 'Recommended Practice',
      subtitle: 'The next best set based on your current mastery profile.',
      mode,
      questions: getPracticeQuestions({ mode, conceptId: input.conceptId }),
    };
  }

  if (concept) {
    return {
      title: concept.name,
      subtitle: 'Focused concept practice with instant feedback and confidence tracking.',
      mode: 'topic' as PracticeMode,
      questions: getPracticeQuestions({ conceptId: concept.id }),
    };
  }

  return {
    title: 'Daily Practice',
    subtitle: 'A quick mixed review drawn from your active concepts.',
    mode: 'topic' as PracticeMode,
    questions: getPracticeQuestions(),
  };
}

export function getCurrentDemoStudent() {
  return demoUsers.student;
}
