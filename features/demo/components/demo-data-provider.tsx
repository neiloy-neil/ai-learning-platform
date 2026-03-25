'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  buildAssessmentResult,
  buildDashboardData,
  buildLearningPath,
  buildProgressData,
  completePracticeSession,
  createInitialStudentState,
  demoUsers,
  getAssessments,
  getNotificationsForUserFromState,
  getPracticeQuestions,
  mockConcepts,
  type DemoAssessmentResult,
  type DemoGoal,
  type DemoStudentState,
  type PracticeMode,
} from '@/lib/mocks';
import type { Notification } from '@/lib/pcdc-types';

const storageKey = 'demoStudentState';

type DemoDataContextType = {
  state: DemoStudentState;
  dashboardData: ReturnType<typeof buildDashboardData>;
  progressData: ReturnType<typeof buildProgressData>;
  learningPath: ReturnType<typeof buildLearningPath>;
  goals: DemoGoal[];
  assessments: ReturnType<typeof getAssessments>;
  getNotifications: (userId?: string) => Notification[];
  markNotificationRead: (notificationId: string) => void;
  archiveNotification: (notificationId: string) => void;
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

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoStudentState>(createInitialStudentState());

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue) {
      setState(reviveDemoState(storedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const value = useMemo<DemoDataContextType>(() => {
    const dashboardData = buildDashboardData(state);
    const progressData = buildProgressData(state.mastery, state.attempts);
    const learningPath = buildLearningPath(state.mastery);
    const assessments = getAssessments(state);

    return {
      state,
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
  }, [state]);

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
