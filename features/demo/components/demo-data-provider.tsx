'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  assessGeneratedQuiz as buildGeneratedQuizAssessment,
  buildTutorReply,
  createGeneratedQuiz,
  createParentSupportMessage,
  createStudyPlan,
  createTeacherAiArtifact,
  type DemoAiAssessment,
  type DemoGeneratedQuiz,
  type DemoStudyPlan,
  type TeacherAiArtifact,
  type TeacherAiTool,
} from '@/lib/mock-ai';
import {
  buildAssessmentResult,
  buildDashboardData,
  buildLearningPath,
  buildParentChildProfiles,
  buildProgressData,
  buildQuizHistory,
  buildTeacherHeatmap,
  buildTeacherWatchlist,
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
  type DemoMessageThread,
  type DemoParentContactRequest,
  type DemoQuizHistoryItem,
  type DemoStudentState,
  type DemoTeacherAssignmentTemplate,
  type DemoTeacherClass,
  type DemoTeacherDeadline,
  type DemoTeacherNote,
  type DemoTeacherNudge,
  type DemoTeacherReviewItem,
  type DemoTeacherStudent,
  type DemoTeacherSubmission,
  type PracticeMode,
  type TeacherCohort,
} from '@/lib/mocks';
import type { Assignment, Notification } from '@/lib/pcdc-types';

const storageKey = 'demoStudentState';
const teacherStorageKey = 'demoTeacherManagementState';
const aiStorageKey = 'demoAiState';
const parentSelectionStorageKey = 'demoParentSelectedStudentId';

type DemoTeacherManagementState = {
  classes: DemoTeacherClass[];
  students: DemoTeacherStudent[];
  assignments: Assignment[];
  nudges: DemoTeacherNudge[];
  threads: DemoMessageThread[];
  templates: DemoTeacherAssignmentTemplate[];
  submissions: DemoTeacherSubmission[];
  reviewQueue: DemoTeacherReviewItem[];
  notes: DemoTeacherNote[];
  deadlines: DemoTeacherDeadline[];
  contactRequests: DemoParentContactRequest[];
};

type DemoAiChatMessage = {
  id: string;
  sender: 'student' | 'assistant';
  text: string;
  title?: string;
};

type DemoAiState = {
  tutorMessages: DemoAiChatMessage[];
  generatedQuizzes: DemoGeneratedQuiz[];
  generatedQuizAssessments: Record<string, DemoAiAssessment>;
  studyPlans: DemoStudyPlan[];
  teacherArtifacts: TeacherAiArtifact[];
  parentSupportMessages: Record<string, ReturnType<typeof createParentSupportMessage>>;
};

type DemoDataContextType = {
  state: DemoStudentState;
  teacherState: DemoTeacherManagementState;
  dashboardData: ReturnType<typeof buildDashboardData> & { recentQuizHistory: DemoQuizHistoryItem[] };
  progressData: ReturnType<typeof buildProgressData>;
  learningPath: ReturnType<typeof buildLearningPath>;
  goals: DemoGoal[];
  assessments: ReturnType<typeof getAssessments>;
  parentProfiles: ReturnType<typeof buildParentChildProfiles>;
  selectedParentStudentId: string;
  aiTutorMessages: DemoAiChatMessage[];
  generatedQuizzes: DemoGeneratedQuiz[];
  generatedQuizAssessments: Record<string, DemoAiAssessment>;
  latestStudyPlan: DemoStudyPlan | null;
  teacherArtifacts: TeacherAiArtifact[];
  teacherHeatmap: ReturnType<typeof buildTeacherHeatmap>;
  teacherWatchlist: ReturnType<typeof buildTeacherWatchlist>;
  selectedParentSupport: ReturnType<typeof createParentSupportMessage> | null;
  selectParentStudent: (studentId: string) => void;
  getNotifications: (userId?: string) => Notification[];
  markNotificationRead: (notificationId: string) => void;
  archiveNotification: (notificationId: string) => void;
  addTeacherClass: (input: { name: string; section: string; focusArea: string }) => void;
  assignStudentToClass: (studentId: string, classId: string) => void;
  cycleStudentCohort: (studentId: string) => void;
  createTeacherAssignment: (input: { title: string; description: string; studentId: string; dueDate: string }) => void;
  createAssignmentFromTemplate: (templateId: string, studentId: string) => void;
  sendTeacherNudge: (input: {
    studentId: string;
    audience: 'student' | 'parent';
    message: string;
    category: 'Encouragement' | 'Intervention' | 'Follow-up';
  }) => void;
  addTeacherNote: (studentId: string, text: string) => void;
  createParentContactRequest: (input: { studentId: string; topic: string }) => void;
  sendThreadMessage: (input: {
    threadId: string;
    senderRole: 'teacher' | 'student' | 'parent';
    text: string;
  }) => void;
  completeSession: (input: {
    answers: Array<{ questionId: string; selectedOptionId: string; confidenceRating: number }>;
    mode: PracticeMode;
    conceptId?: string | null;
    assessmentId?: string | null;
  }) => DemoAssessmentResult | null;
  addGoal: () => void;
  cycleGoalStatus: (goalId: string) => void;
  sendAiTutorPrompt: (input: { prompt: string; conceptName?: string }) => void;
  generateQuiz: (input: {
    conceptId: string;
    conceptName: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
    questionCount: number;
    ownerRole: 'student' | 'teacher';
  }) => DemoGeneratedQuiz;
  assessGeneratedQuiz: (input: {
    quizId: string;
    answers: Array<{ questionId: string; selectedOptionId: string }>;
  }) => DemoAiAssessment | null;
  generateStudyPlan: (availableMinutes?: number) => DemoStudyPlan;
  generateTeacherArtifact: (input: { tool: TeacherAiTool; focus: string; className: string }) => TeacherAiArtifact;
  generateParentSupport: (studentId: string) => ReturnType<typeof createParentSupportMessage>;
};

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

function createInitialAiState(): DemoAiState {
  return {
    tutorMessages: [
      {
        id: 'ai-message-1',
        sender: 'assistant',
        title: 'AI Tutor',
        text: 'Ask me for a concept explanation, a simpler version of a topic, a hint, a study plan, or a generated quiz.',
      },
    ],
    generatedQuizzes: [],
    generatedQuizAssessments: {},
    studyPlans: [],
    teacherArtifacts: [],
    parentSupportMessages: {},
  };
}

function reviveDemoState(raw: string): DemoStudentState {
  const fallback = createInitialStudentState();
  const parsed = JSON.parse(raw) as Partial<DemoStudentState>;
  return {
    ...fallback,
    ...parsed,
    mastery: (parsed.mastery ?? fallback.mastery).map((item) => ({ ...item, lastUpdated: new Date(item.lastUpdated) })),
    activities: parsed.activities ?? fallback.activities,
    assessments: parsed.assessments ?? fallback.assessments,
    attempts: parsed.attempts ?? fallback.attempts,
    goals: parsed.goals ?? fallback.goals,
    notifications: (parsed.notifications ?? fallback.notifications).map((item) => ({ ...item, createdAt: new Date(item.createdAt) })),
  };
}

function reviveTeacherState(raw: string): DemoTeacherManagementState {
  const fallback = createInitialTeacherManagementState();
  const parsed = JSON.parse(raw) as Partial<DemoTeacherManagementState>;
  return {
    ...fallback,
    ...parsed,
    classes: parsed.classes ?? fallback.classes,
    students: parsed.students ?? fallback.students,
    nudges: parsed.nudges ?? fallback.nudges,
    threads: parsed.threads ?? fallback.threads,
    templates: parsed.templates ?? fallback.templates,
    submissions: parsed.submissions ?? fallback.submissions,
    reviewQueue: parsed.reviewQueue ?? fallback.reviewQueue,
    notes: parsed.notes ?? fallback.notes,
    deadlines: parsed.deadlines ?? fallback.deadlines,
    contactRequests: parsed.contactRequests ?? fallback.contactRequests,
    assignments: (parsed.assignments ?? fallback.assignments).map((item) => ({
      ...item,
      assignedDate: new Date(item.assignedDate),
      dueDate: new Date(item.dueDate),
    })),
  };
}

function reviveAiState(raw: string): DemoAiState {
  const fallback = createInitialAiState();
  const parsed = JSON.parse(raw) as Partial<DemoAiState>;
  return {
    ...fallback,
    ...parsed,
    tutorMessages: parsed.tutorMessages ?? fallback.tutorMessages,
    generatedQuizzes: parsed.generatedQuizzes ?? fallback.generatedQuizzes,
    generatedQuizAssessments: parsed.generatedQuizAssessments ?? fallback.generatedQuizAssessments,
    studyPlans: parsed.studyPlans ?? fallback.studyPlans,
    teacherArtifacts: parsed.teacherArtifacts ?? fallback.teacherArtifacts,
    parentSupportMessages: parsed.parentSupportMessages ?? fallback.parentSupportMessages,
  };
}

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoStudentState>(createInitialStudentState());
  const [teacherState, setTeacherState] = useState<DemoTeacherManagementState>(createInitialTeacherManagementState());
  const [aiState, setAiState] = useState<DemoAiState>(createInitialAiState());
  const [selectedParentStudentId, setSelectedParentStudentId] = useState(demoUsers.student.id);

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue) {
      try {
        setState(reviveDemoState(storedValue));
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    const storedTeacherState = localStorage.getItem(teacherStorageKey);
    if (storedTeacherState) {
      try {
        setTeacherState(reviveTeacherState(storedTeacherState));
      } catch {
        localStorage.removeItem(teacherStorageKey);
      }
    }

    const storedAiState = localStorage.getItem(aiStorageKey);
    if (storedAiState) {
      try {
        setAiState(reviveAiState(storedAiState));
      } catch {
        localStorage.removeItem(aiStorageKey);
      }
    }

    const storedParentStudentId = localStorage.getItem(parentSelectionStorageKey);
    if (storedParentStudentId) {
      setSelectedParentStudentId(storedParentStudentId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem(teacherStorageKey, JSON.stringify(teacherState));
  }, [teacherState]);

  useEffect(() => {
    localStorage.setItem(aiStorageKey, JSON.stringify(aiState));
  }, [aiState]);

  useEffect(() => {
    localStorage.setItem(parentSelectionStorageKey, selectedParentStudentId);
  }, [selectedParentStudentId]);

  const value = useMemo<DemoDataContextType>(() => {
    const baseDashboardData = buildDashboardData(state);
    const aiQuizHistory: DemoQuizHistoryItem[] = Object.entries(aiState.generatedQuizAssessments).map(([quizId, assessment]) => {
      const quiz = aiState.generatedQuizzes.find((item) => item.id === quizId);
      return {
        id: `history-${quizId}`,
        title: quiz?.title ?? 'AI Quiz',
        score: assessment.score,
        completedAtLabel: 'Just now',
        mode: 'ai-quiz',
      };
    });
    const studyPlanSchedule = aiState.studyPlans[0]
      ? aiState.studyPlans[0].tasks.slice(0, 3).map((task) => ({
          id: `schedule-${task.id}`,
          label: task.title,
          timeLabel: `${task.minutes} min`,
          type:
            task.type === 'reflection'
              ? ('coaching' as const)
              : task.type,
        }))
      : [];
    const quizReviewSchedule = aiQuizHistory[0]
      ? [
          {
            id: `schedule-quiz-${aiQuizHistory[0].id}`,
            label: `Review ${aiQuizHistory[0].title}`,
            timeLabel: 'AI recap',
            type: 'assessment' as const,
          },
        ]
      : [];
    const dashboardData = {
      ...baseDashboardData,
      recentQuizHistory: [...aiQuizHistory, ...buildQuizHistory(state)].slice(0, 5),
      todayPlan: [...studyPlanSchedule, ...quizReviewSchedule, ...baseDashboardData.todayPlan].slice(0, 4),
    };
    const progressData = buildProgressData(state.mastery, state.attempts);
    const learningPath = buildLearningPath(state.mastery);
    const assessments = getAssessments(state);
    const parentProfiles = buildParentChildProfiles(state);
    const teacherHeatmap = buildTeacherHeatmap(teacherState.students);
    const teacherWatchlist = buildTeacherWatchlist(teacherState.students);

    return {
      state,
      teacherState,
      dashboardData,
      progressData,
      learningPath,
      goals: state.goals,
      assessments,
      parentProfiles,
      selectedParentStudentId,
      aiTutorMessages: aiState.tutorMessages,
      generatedQuizzes: aiState.generatedQuizzes,
      generatedQuizAssessments: aiState.generatedQuizAssessments,
      latestStudyPlan: aiState.studyPlans[0] ?? null,
      teacherArtifacts: aiState.teacherArtifacts,
      teacherHeatmap,
      teacherWatchlist,
      selectedParentSupport: aiState.parentSupportMessages[selectedParentStudentId] ?? null,
      selectParentStudent: setSelectedParentStudentId,
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
      createAssignmentFromTemplate: (templateId, studentId) => {
        const template = teacherState.templates.find((item) => item.id === templateId);
        if (!template) {
          return;
        }

        const targetStudent = teacherState.students.find((student) => student.id === studentId);
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 3);

        setTeacherState((current) => ({
          ...current,
          assignments: [
            {
              id: `assignment-${current.assignments.length + 1}`,
              title: template.title,
              description: `Template-based intervention for ${template.focusArea}. Recommended for ${template.recommendedFor}.`,
              assignedDate: new Date(),
              dueDate,
              status: 'Assigned',
              assignedToStudentId: studentId,
            },
            ...current.assignments,
          ],
        }));

        if (targetStudent) {
          setState((current) => ({
            ...current,
            activities: [
              { id: `activity-${Date.now()}`, text: `Teacher assigned ${template.title}`, timeLabel: 'Just now' },
              ...current.activities.slice(0, 4),
            ],
          }));
        }
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
      addTeacherNote: (studentId, text) => {
        const trimmedText = text.trim();
        if (!trimmedText) {
          return;
        }

        setTeacherState((current) => ({
          ...current,
          notes: [
            { id: `note-${current.notes.length + 1}`, studentId, text: trimmedText, createdAtLabel: 'Just now' },
            ...current.notes,
            ],
          }));
        },
      createParentContactRequest: (input) => {
        const topic = input.topic.trim();
        if (!topic) {
          return;
        }

        setTeacherState((current) => ({
          ...current,
          contactRequests: [
            {
              id: `contact-${current.contactRequests.length + 1}`,
              parentName: demoUsers.parent.name,
              studentId: input.studentId,
              topic,
              requestedAtLabel: 'Just now',
            },
            ...current.contactRequests,
          ],
        }));

        setState((current) => ({
          ...current,
          notifications: [
            {
              id: `notification-${current.notifications.length + 1}`,
              userId: demoUsers.teacher.id,
              text: `New parent follow-up request: ${topic}.`,
              read: false,
              createdAt: new Date(),
            },
            ...current.notifications,
          ],
        }));
      },
      sendThreadMessage: (input) => {
        setTeacherState((current) => ({
          ...current,
          threads: current.threads.map((thread) => {
            if (thread.id !== input.threadId) {
              return thread;
            }

            return {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  id: `message-${thread.messages.length + 1}-${Date.now()}`,
                  senderRole: input.senderRole,
                  text: input.text,
                  sentAt: new Date().toISOString(),
                },
              ],
            };
          }),
        }));
      },
      completeSession: (input) => {
        const nextState = completePracticeSession(state, input);
        const result = input.assessmentId
          ? buildAssessmentResult(
              nextState.assessments.find((assessment) => assessment.id === input.assessmentId) ?? assessments[0],
              nextState.attempts,
            )
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
      sendAiTutorPrompt: (input) => {
        const reply = buildTutorReply({
          prompt: input.prompt,
          conceptName: input.conceptName ?? dashboardData.recommendation.nextConceptName,
          recommendedConceptName: dashboardData.recommendation.nextConceptName,
        });

        setAiState((current) => ({
          ...current,
          tutorMessages: [
            ...current.tutorMessages,
            { id: `ai-message-${current.tutorMessages.length + 1}`, sender: 'student', text: input.prompt },
            {
              id: `ai-message-${current.tutorMessages.length + 2}`,
              sender: 'assistant',
              title: reply.title,
              text: reply.body,
            },
          ],
        }));
      },
      generateQuiz: (input) => {
        const quiz = createGeneratedQuiz(input);
        setAiState((current) => ({
          ...current,
          generatedQuizzes: [quiz, ...current.generatedQuizzes.filter((item) => item.id !== quiz.id)],
        }));
        return quiz;
      },
      assessGeneratedQuiz: (input) => {
        const quiz = aiState.generatedQuizzes.find((item) => item.id === input.quizId);
        if (!quiz) {
          return null;
        }

        const assessment = buildGeneratedQuizAssessment({ quiz, answers: input.answers });
        setAiState((current) => ({
          ...current,
          generatedQuizAssessments: {
            ...current.generatedQuizAssessments,
            [quiz.id]: assessment,
          },
        }));
        setState((current) => ({
          ...current,
          activities: [
            { id: `activity-${Date.now()}`, text: `Completed ${quiz.title} with a ${assessment.score}% score`, timeLabel: 'Just now' },
            ...current.activities.slice(0, 4),
          ],
          notifications: [
            {
              id: `notification-${current.notifications.length + 1}`,
              userId: demoUsers.student.id,
              text: `AI assessed ${quiz.title} and suggested your next study move.`,
              read: false,
              createdAt: new Date(),
            },
            ...current.notifications,
          ],
        }));
        return assessment;
      },
      generateStudyPlan: (availableMinutes = 70) => {
        const recommendation = dashboardData.recommendation;
        const nextAssessment = assessments[0];
        const plan = createStudyPlan({
          studentName: demoUsers.student.name,
          availableMinutes,
          focusConceptName: recommendation.nextConceptName,
          assessmentTitle: nextAssessment?.title ?? 'Upcoming checkpoint',
        });
        setAiState((current) => ({
          ...current,
          studyPlans: [plan, ...current.studyPlans.filter((item) => item.id !== plan.id)],
        }));
        return plan;
      },
      generateTeacherArtifact: (input) => {
        const artifact = createTeacherAiArtifact(input);
        setAiState((current) => ({
          ...current,
          teacherArtifacts: [artifact, ...current.teacherArtifacts.filter((item) => item.id !== artifact.id)],
        }));
        return artifact;
      },
      generateParentSupport: (studentId) => {
        const profile = parentProfiles.find((item) => item.student.id === studentId) ?? parentProfiles[0];
        const weakestConcept = profile.mastery.slice().sort((left, right) => left.masteryScore - right.masteryScore)[0];
        const support = createParentSupportMessage({
          studentName: profile.student.name,
          weakConceptName: weakestConcept ? mockConcepts.find((concept) => concept.id === weakestConcept.conceptId)?.name ?? 'current topic' : 'current topic',
        });
        setAiState((current) => ({
          ...current,
          parentSupportMessages: {
            ...current.parentSupportMessages,
            [studentId]: support,
          },
        }));
        return support;
      },
    };
  }, [aiState, selectedParentStudentId, state, teacherState]);

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
