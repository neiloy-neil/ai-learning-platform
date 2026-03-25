import { QuestionDifficulty, UserRole, type Assignment, type Concept, type ConceptDependency, type ConceptMastery, type Notification, type ParentAlert, type Question, type User } from '@/lib/pcdc-types';
import { appRoutes } from '@/lib/app-routes';

export type DemoUserKey = 'student' | 'teacher' | 'parent';
export type PracticeMode = 'topic' | 'recommended' | 'assessment-review' | 'revision';
export type AssessmentStatus = 'Assigned' | 'In Progress' | 'Completed' | 'Overdue' | 'Reviewed';

export type DashboardRecommendation = {
  nextConceptId: string;
  nextConceptName: string;
  reason: string;
  ctaLabel: string;
  href: string;
};

export type ActivityItem = {
  id: string;
  text: string;
  timeLabel: string;
};

export type SmartReminder = {
  concept: {
    id: string;
    name: string;
  };
  reason: string;
};

export type DemoAssessment = {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  status: AssessmentStatus;
  conceptIds: string[];
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  lastScore?: number;
  completedAt?: string;
};

export type DemoGoal = {
  id: string;
  text: string;
  progress: number;
  metric: 'concepts' | 'time' | 'assessments';
  status: 'active' | 'completed' | 'archived';
};

export type DemoAttempt = {
  id: string;
  questionId: string;
  conceptIds: string[];
  isCorrect: boolean;
  confidenceRating: number;
  selectedOptionId: string;
  submittedAt: string;
  source: 'practice' | 'assessment';
  mode: PracticeMode;
  assessmentId?: string;
};

export type ProgressDatum = {
  conceptId: string;
  conceptName: string;
  mastery: number;
  delta: number;
  lastPracticedLabel: string;
  rationale: string;
};

export type TeacherCohort = 'Core' | 'Acceleration' | 'Intervention';

export type DemoTeacherClass = {
  id: string;
  name: string;
  section: string;
  focusArea: string;
  studentIds: string[];
};

export type DemoTeacherStudent = {
  id: string;
  name: string;
  avgScore: number;
  status: 'Strong' | 'Good' | 'Weak';
  classId: string;
  cohort: TeacherCohort;
};

export type DemoTeacherNudge = {
  id: string;
  studentId: string;
  audience: 'student' | 'parent';
  message: string;
  category: 'Encouragement' | 'Intervention' | 'Follow-up';
  sentAt: string;
};

export type DemoThreadMessage = {
  id: string;
  senderRole: 'teacher' | 'student' | 'parent';
  text: string;
  sentAt: string;
};

export type DemoMessageThread = {
  id: string;
  studentId: string;
  participantRole: 'student' | 'parent';
  participantName: string;
  topic: string;
  messages: DemoThreadMessage[];
};

export type LearningPathNode = {
  conceptId: string;
  conceptName: string;
  status: 'Locked' | 'Available' | 'In Progress' | 'Completed';
  mastery: number;
  prerequisiteNames: string[];
  href?: string;
};

export type DemoStudentState = {
  mastery: ConceptMastery[];
  activities: ActivityItem[];
  assessments: DemoAssessment[];
  attempts: DemoAttempt[];
  goals: DemoGoal[];
  notifications: Notification[];
};

export type ParentWeeklyActivity = {
  day: string;
  minutes: number;
};

export type DemoParentChildProfile = {
  student: User;
  mastery: ConceptMastery[];
  goals: DemoGoal[];
  alerts: ParentAlert[];
  weeklyActivity: ParentWeeklyActivity[];
  digest: DemoParentDigest;
  changes: DemoParentChangeItem[];
  supportTips: DemoParentSupportTip[];
  upcomingAssessments: { id: string; title: string; dueLabel: string }[];
  missedWork: { id: string; title: string; status: string }[];
  teacherMessagesPreview: { id: string; sender: string; text: string }[];
};

export type DemoAssessmentResult = {
  assessment: DemoAssessment;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  conceptBreakdown: { conceptId: string; conceptName: string; correct: number; total: number }[];
};

export type DemoRevisionTask = {
  id: string;
  conceptId: string;
  conceptName: string;
  reason: string;
  dueLabel: string;
  intensity: 'light' | 'medium' | 'high';
};

export type DemoScheduleItem = {
  id: string;
  label: string;
  timeLabel: string;
  type: 'practice' | 'revision' | 'assessment' | 'coaching';
};

export type DemoQuizHistoryItem = {
  id: string;
  title: string;
  score: number;
  completedAtLabel: string;
  mode: 'practice' | 'assessment' | 'ai-quiz';
};

export type DemoTeacherAssignmentTemplate = {
  id: string;
  title: string;
  focusArea: string;
  audience: 'class' | 'cohort' | 'student';
  recommendedFor: string;
};

export type DemoTeacherSubmission = {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  status: 'Needs Review' | 'Reviewed';
  submittedAtLabel: string;
};

export type DemoTeacherReviewItem = {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  priority: 'High' | 'Medium';
  dueLabel: string;
};

export type DemoTeacherNote = {
  id: string;
  studentId: string;
  text: string;
  createdAtLabel: string;
};

export type DemoTeacherDeadline = {
  id: string;
  title: string;
  dueLabel: string;
  type: 'assignment' | 'assessment' | 'meeting';
};

export type DemoParentContactRequest = {
  id: string;
  parentName: string;
  studentId: string;
  topic: string;
  requestedAtLabel: string;
};

export type DemoTeacherHeatmapCell = {
  conceptId: string;
  conceptName: string;
  score: number;
};

export type DemoParentDigest = {
  summary: string;
  attendanceTone: string;
};

export type DemoParentChangeItem = {
  id: string;
  title: string;
  description: string;
  tone: 'positive' | 'warning';
};

export type DemoParentSupportTip = {
  id: string;
  title: string;
  description: string;
};

const currentYear = new Date().getFullYear();
const strongThreshold = 85;
const progressThreshold = 60;

export const demoUsers: Record<DemoUserKey, User> = {
  student: { id: 'student-1', name: 'Alex Carter', email: 'alex@example.com', role: UserRole.STUDENT },
  teacher: { id: 'teacher-1', name: 'Maya Thompson', email: 'maya@example.com', role: UserRole.TEACHER },
  parent: { id: 'parent-1', name: 'Jordan Carter', email: 'jordan@example.com', role: UserRole.PARENT, studentIds: ['student-1', 'student-2'] },
};

export const mockUsers = demoUsers;

export const mockConcepts: Concept[] = [
  { id: 'linear-equations', name: 'Solving Linear Equations', subject: 'math', level: 'grade-9' },
  { id: 'graphing-inequalities', name: 'Graphing Inequalities', subject: 'math', level: 'grade-9' },
  { id: 'polynomials', name: 'Understanding Polynomials', subject: 'math', level: 'grade-9' },
  { id: 'quadratics', name: 'Mastering Quadratic Equations', subject: 'math', level: 'grade-10' },
  { id: 'calculus-intro', name: 'Introduction to Calculus', subject: 'math', level: 'grade-11' },
];

export const mockConceptDependencies: ConceptDependency[] = [
  { id: 'dep-1', sourceConceptId: 'graphing-inequalities', prerequisiteConceptId: 'linear-equations' },
  { id: 'dep-2', sourceConceptId: 'polynomials', prerequisiteConceptId: 'linear-equations' },
  { id: 'dep-3', sourceConceptId: 'quadratics', prerequisiteConceptId: 'polynomials' },
  { id: 'dep-4', sourceConceptId: 'calculus-intro', prerequisiteConceptId: 'quadratics' },
];

export const mockQuestions: Question[] = [
  {
    id: 'question-1',
    text: 'What value of x solves 3x + 6 = 21?',
    difficulty: QuestionDifficulty.EASY,
    conceptIds: ['linear-equations'],
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '5' },
      { id: 'c', text: '7' },
      { id: 'd', text: '9' },
    ],
    correctOptionId: 'b',
    explanation: 'Subtract 6 from both sides to get 3x = 15, then divide by 3.',
  },
  {
    id: 'question-2',
    text: 'Which graph matches y > 2x - 1?',
    difficulty: QuestionDifficulty.MEDIUM,
    conceptIds: ['graphing-inequalities'],
    options: [
      { id: 'a', text: 'Dashed line with shading above' },
      { id: 'b', text: 'Solid line with shading below' },
      { id: 'c', text: 'Dashed line with shading below' },
      { id: 'd', text: 'Solid line with shading above' },
    ],
    correctOptionId: 'a',
    explanation: 'A strict inequality uses a dashed boundary line and shades the region above the line.',
  },
  {
    id: 'question-3',
    text: 'Which expression is a polynomial?',
    difficulty: QuestionDifficulty.EASY,
    conceptIds: ['polynomials'],
    options: [
      { id: 'a', text: '3x^2 + 2x - 5' },
      { id: 'b', text: '4/x + 1' },
      { id: 'c', text: 'sqrt(x) + 7' },
      { id: 'd', text: '2^x + 1' },
    ],
    correctOptionId: 'a',
    explanation: 'Polynomials contain only non-negative integer exponents and no variables in denominators or radicals.',
  },
  {
    id: 'question-4',
    text: 'What are the factors of x^2 - 5x + 6?',
    difficulty: QuestionDifficulty.MEDIUM,
    conceptIds: ['quadratics'],
    options: [
      { id: 'a', text: '(x - 1)(x - 6)' },
      { id: 'b', text: '(x - 2)(x - 3)' },
      { id: 'c', text: '(x + 2)(x + 3)' },
      { id: 'd', text: '(x - 4)(x - 2)' },
    ],
    correctOptionId: 'b',
    explanation: 'The two numbers that multiply to 6 and add to -5 are -2 and -3.',
  },
  {
    id: 'question-5',
    text: 'Which concept is required before starting introductory calculus?',
    difficulty: QuestionDifficulty.HARD,
    conceptIds: ['calculus-intro'],
    options: [
      { id: 'a', text: 'Linear equations only' },
      { id: 'b', text: 'Quadratics and strong algebra fluency' },
      { id: 'c', text: 'Geometry only' },
      { id: 'd', text: 'Statistics' },
    ],
    correctOptionId: 'b',
    explanation: 'Calculus readiness usually depends on algebra and function fluency, which this path models through quadratics.',
  },
];

const initialMastery: ConceptMastery[] = [
  { id: 'mastery-1', studentId: demoUsers.student.id, conceptId: 'linear-equations', masteryScore: 92, lastUpdated: new Date(currentYear, 2, 20) },
  { id: 'mastery-2', studentId: demoUsers.student.id, conceptId: 'graphing-inequalities', masteryScore: 78, lastUpdated: new Date(currentYear, 2, 19) },
  { id: 'mastery-3', studentId: demoUsers.student.id, conceptId: 'polynomials', masteryScore: 66, lastUpdated: new Date(currentYear, 2, 18) },
  { id: 'mastery-4', studentId: demoUsers.student.id, conceptId: 'quadratics', masteryScore: 42, lastUpdated: new Date(currentYear, 2, 16) },
  { id: 'mastery-5', studentId: demoUsers.student.id, conceptId: 'calculus-intro', masteryScore: 18, lastUpdated: new Date(currentYear, 2, 14) },
];

const initialAttempts: DemoAttempt[] = [
  {
    id: 'attempt-1',
    questionId: 'question-1',
    conceptIds: ['linear-equations'],
    isCorrect: true,
    confidenceRating: 4,
    selectedOptionId: 'b',
    submittedAt: new Date(currentYear, 2, 20, 10, 0).toISOString(),
    source: 'practice',
    mode: 'topic',
  },
  {
    id: 'attempt-2',
    questionId: 'question-2',
    conceptIds: ['graphing-inequalities'],
    isCorrect: true,
    confidenceRating: 4,
    selectedOptionId: 'a',
    submittedAt: new Date(currentYear, 2, 21, 9, 40).toISOString(),
    source: 'practice',
    mode: 'revision',
  },
  {
    id: 'attempt-3',
    questionId: 'question-4',
    conceptIds: ['quadratics'],
    isCorrect: false,
    confidenceRating: 2,
    selectedOptionId: 'd',
    submittedAt: new Date(currentYear, 2, 23, 16, 30).toISOString(),
    source: 'assessment',
    mode: 'assessment-review',
    assessmentId: 'assess-2',
  },
];

export const mockRecentActivity: ActivityItem[] = [
  { id: 'activity-1', text: 'Completed a revision set on Graphing Inequalities', timeLabel: '2h ago' },
  { id: 'activity-2', text: 'Reached 92% mastery in Solving Linear Equations', timeLabel: '1d ago' },
  { id: 'activity-3', text: 'Submitted the Weekly Quiz: Linear Equations', timeLabel: '2d ago' },
];

const initialAssessments: DemoAssessment[] = [
  {
    id: 'assess-1',
    title: 'Algebra Diagnostic Test',
    description: 'Test your foundational knowledge of Algebra before the next unit.',
    questionCount: 3,
    status: 'Assigned',
    conceptIds: ['linear-equations', 'graphing-inequalities', 'polynomials'],
    dueDate: new Date(currentYear, 2, 28).toISOString(),
    availableFrom: new Date(currentYear, 2, 22).toISOString(),
    availableUntil: new Date(currentYear, 2, 29).toISOString(),
  },
  {
    id: 'assess-2',
    title: 'Weekly Quiz: Quadratics',
    description: 'A short checkpoint on quadratic setup, factorization, and interpretation.',
    questionCount: 2,
    status: 'In Progress',
    conceptIds: ['quadratics', 'polynomials'],
    dueDate: new Date(currentYear, 2, 27).toISOString(),
    availableFrom: new Date(currentYear, 2, 21).toISOString(),
    availableUntil: new Date(currentYear, 2, 28).toISOString(),
    lastScore: 50,
  },
  {
    id: 'assess-3',
    title: 'Functions Readiness Review',
    description: 'A completed review used to check readiness for upcoming calculus concepts.',
    questionCount: 2,
    status: 'Reviewed',
    conceptIds: ['calculus-intro', 'quadratics'],
    dueDate: new Date(currentYear, 2, 20).toISOString(),
    availableFrom: new Date(currentYear, 2, 13).toISOString(),
    availableUntil: new Date(currentYear, 2, 20).toISOString(),
    lastScore: 80,
    completedAt: new Date(currentYear, 2, 19).toISOString(),
  },
];

const initialGoals: DemoGoal[] = [
  { id: 'goal-1', text: 'Raise quadratics mastery above 65%', progress: 42, metric: 'concepts', status: 'active' },
  { id: 'goal-2', text: 'Finish two assessments this week', progress: 50, metric: 'assessments', status: 'active' },
  { id: 'goal-3', text: 'Study at least 120 minutes this week', progress: 68, metric: 'time', status: 'active' },
];

export const mockTeacherClassStats = { averageScore: 78, completionRate: 85, studentsAtRisk: 3 };
export const mockTeacherWeakConcepts = [
  { conceptId: 'quadratics', conceptName: 'Quadratic Equations', performance: 45 },
  { conceptId: 'polynomials', conceptName: 'Polynomials', performance: 52 },
  { conceptId: 'graphing-inequalities', conceptName: 'Graphing Inequalities', performance: 61 },
];
export const mockTeacherStudents = [
  { id: 'student-a', name: 'Alice', avgScore: 92, status: 'Strong' as const, classId: 'class-1', cohort: 'Acceleration' as const },
  { id: 'student-b', name: 'Bob', avgScore: 75, status: 'Good' as const, classId: 'class-1', cohort: 'Core' as const },
  { id: 'student-c', name: 'Charlie', avgScore: 55, status: 'Weak' as const, classId: 'class-2', cohort: 'Intervention' as const },
  { id: 'student-d', name: 'David', avgScore: 81, status: 'Good' as const, classId: 'class-2', cohort: 'Core' as const },
] satisfies DemoTeacherStudent[];

export const mockTeacherClasses: DemoTeacherClass[] = [
  {
    id: 'class-1',
    name: 'Algebra Foundations',
    section: 'Section A',
    focusArea: 'Equation fluency and graph interpretation',
    studentIds: ['student-a', 'student-b'],
  },
  {
    id: 'class-2',
    name: 'Quadratics Readiness',
    section: 'Section B',
    focusArea: 'Factorization and function confidence',
    studentIds: ['student-c', 'student-d'],
  },
];

export const mockTeacherAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'Quadratics Rescue Set',
    description: 'Targeted remediation for students below 60% mastery in factorization.',
    assignedDate: new Date(currentYear, 2, 24),
    dueDate: new Date(currentYear, 2, 29),
    status: 'Assigned',
    assignedToStudentId: 'student-c',
  },
  {
    id: 'assignment-2',
    title: 'Polynomial Confidence Check',
    description: 'Short graded checkpoint to verify readiness for the next module.',
    assignedDate: new Date(currentYear, 2, 22),
    dueDate: new Date(currentYear, 2, 27),
    status: 'Submitted',
    assignedToStudentId: 'student-b',
  },
  {
    id: 'assignment-3',
    title: 'Functions Readiness Review',
    description: 'Teacher-reviewed assessment for students approaching the calculus pathway.',
    assignedDate: new Date(currentYear, 2, 18),
    dueDate: new Date(currentYear, 2, 23),
    status: 'Graded',
    assignedToStudentId: 'student-a',
    score: 88,
  },
];

export const mockTeacherAssignmentTemplates: DemoTeacherAssignmentTemplate[] = [
  {
    id: 'template-1',
    title: 'Quadratics Rescue Sprint',
    focusArea: 'Quadratics',
    audience: 'cohort',
    recommendedFor: 'Intervention',
  },
  {
    id: 'template-2',
    title: 'Polynomial Confidence Check',
    focusArea: 'Polynomials',
    audience: 'class',
    recommendedFor: 'Core',
  },
  {
    id: 'template-3',
    title: 'Stretch Challenge Set',
    focusArea: 'Graphing Inequalities',
    audience: 'student',
    recommendedFor: 'Acceleration',
  },
];

export const mockTeacherSubmissions: DemoTeacherSubmission[] = [
  {
    id: 'submission-1',
    studentId: 'student-c',
    studentName: 'Charlie',
    title: 'Quadratics Rescue Set',
    status: 'Needs Review',
    submittedAtLabel: '35 min ago',
  },
  {
    id: 'submission-2',
    studentId: 'student-b',
    studentName: 'Bob',
    title: 'Polynomial Confidence Check',
    status: 'Reviewed',
    submittedAtLabel: '2h ago',
  },
  {
    id: 'submission-3',
    studentId: 'student-a',
    studentName: 'Alice',
    title: 'Functions Readiness Review',
    status: 'Needs Review',
    submittedAtLabel: 'Today',
  },
];

export const mockTeacherReviewQueue: DemoTeacherReviewItem[] = [
  { id: 'review-1', studentId: 'student-c', studentName: 'Charlie', title: 'Quadratics misconception check', priority: 'High', dueLabel: 'Today' },
  { id: 'review-2', studentId: 'student-b', studentName: 'Bob', title: 'Polynomial checkpoint feedback', priority: 'Medium', dueLabel: 'Tomorrow' },
];

export const mockTeacherNotes: DemoTeacherNote[] = [
  { id: 'note-1', studentId: 'student-c', text: 'Needs tighter step-by-step support before independent work.', createdAtLabel: 'Today' },
  { id: 'note-2', studentId: 'student-b', text: 'Close to readiness. Parent follow-up is helping homework completion.', createdAtLabel: 'Yesterday' },
];

export const mockTeacherDeadlines: DemoTeacherDeadline[] = [
  { id: 'deadline-1', title: 'Quadratics rescue submissions due', dueLabel: 'Tomorrow', type: 'assignment' },
  { id: 'deadline-2', title: 'Weekly quiz grading block', dueLabel: 'Friday', type: 'assessment' },
  { id: 'deadline-3', title: 'Parent follow-up calls', dueLabel: 'Friday afternoon', type: 'meeting' },
];

export const mockTeacherContactRequests: DemoParentContactRequest[] = [
  { id: 'contact-1', parentName: 'Morgan Brown', studentId: 'student-b', topic: 'Clarify improvement plan for next week', requestedAtLabel: '1h ago' },
  { id: 'contact-2', parentName: 'Elena Davis', studentId: 'student-c', topic: 'Support options for home revision', requestedAtLabel: 'Today' },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    userId: demoUsers.student.id,
    text: 'Your quadratics recommendation was refreshed after the latest practice session.',
    read: false,
    createdAt: new Date(currentYear, 2, 25, 9, 0),
  },
  {
    id: 'notification-2',
    userId: demoUsers.teacher.id,
    text: 'Three students are now flagged for targeted intervention in quadratics.',
    read: false,
    createdAt: new Date(currentYear, 2, 25, 8, 30),
  },
  {
    id: 'notification-3',
    userId: demoUsers.parent.id,
    text: 'Alex completed a recommended practice session and improved one mastery area.',
    read: true,
    createdAt: new Date(currentYear, 2, 24, 18, 0),
  },
];

export const mockParentAlerts: ParentAlert[] = [
  {
    id: 'parent-alert-1',
    studentId: demoUsers.student.id,
    message: 'Quadratics mastery is still below readiness for the next milestone.',
    type: 'grade_drop',
    createdAt: new Date(currentYear, 2, 25, 7, 30),
  },
  {
    id: 'parent-alert-2',
    studentId: demoUsers.student.id,
    message: 'A weekly quiz is due soon and should be completed before Friday.',
    type: 'missed_assessment',
    createdAt: new Date(currentYear, 2, 24, 20, 15),
  },
];

const mockSecondStudent: User = {
  id: 'student-2',
  name: 'Mia Carter',
  email: 'mia@example.com',
  role: UserRole.STUDENT,
};

const mockSecondStudentMastery: ConceptMastery[] = [
  { id: 'mastery-6', studentId: mockSecondStudent.id, conceptId: 'linear-equations', masteryScore: 88, lastUpdated: new Date(currentYear, 2, 19) },
  { id: 'mastery-7', studentId: mockSecondStudent.id, conceptId: 'graphing-inequalities', masteryScore: 72, lastUpdated: new Date(currentYear, 2, 20) },
  { id: 'mastery-8', studentId: mockSecondStudent.id, conceptId: 'polynomials', masteryScore: 64, lastUpdated: new Date(currentYear, 2, 18) },
  { id: 'mastery-9', studentId: mockSecondStudent.id, conceptId: 'quadratics', masteryScore: 58, lastUpdated: new Date(currentYear, 2, 18) },
  { id: 'mastery-10', studentId: mockSecondStudent.id, conceptId: 'calculus-intro', masteryScore: 12, lastUpdated: new Date(currentYear, 2, 15) },
];

const mockSecondStudentGoals: DemoGoal[] = [
  { id: 'goal-4', text: 'Complete three practice sessions this week', progress: 67, metric: 'time', status: 'active' },
  { id: 'goal-5', text: 'Bring quadratics above 60%', progress: 58, metric: 'concepts', status: 'active' },
];

const mockSecondStudentAlerts: ParentAlert[] = [
  {
    id: 'parent-alert-3',
    studentId: mockSecondStudent.id,
    message: 'Mia has one overdue review task in quadratics that should be cleared this week.',
    type: 'missed_assessment',
    createdAt: new Date(currentYear, 2, 25, 12, 0),
  },
];

export function createInitialStudentState(): DemoStudentState {
  return {
    mastery: initialMastery.map((item) => ({ ...item, lastUpdated: new Date(item.lastUpdated) })),
    activities: mockRecentActivity.map((item) => ({ ...item })),
    assessments: initialAssessments.map((item) => ({ ...item })),
    attempts: initialAttempts.map((item) => ({ ...item })),
    goals: initialGoals.map((item) => ({ ...item })),
    notifications: mockNotifications.map((item) => ({ ...item, createdAt: new Date(item.createdAt) })),
  };
}

export function getConceptName(conceptId: string) {
  return mockConcepts.find((concept) => concept.id === conceptId)?.name ?? 'Unknown Concept';
}

function minutesAgo(dateIso: string) {
  const diffMs = Date.now() - new Date(dateIso).getTime();
  const diffHours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function getQuestionWeight(difficulty: Question['difficulty']) {
  switch (difficulty) {
    case QuestionDifficulty.EASY:
      return 1;
    case QuestionDifficulty.MEDIUM:
      return 1.15;
    case QuestionDifficulty.HARD:
      return 1.3;
    default:
      return 1;
  }
}

function getPrerequisitePenalty(conceptId: string, masteryMap: Map<string, number>) {
  const prerequisites = mockConceptDependencies.filter((dependency) => dependency.sourceConceptId === conceptId);
  if (prerequisites.length === 0) {
    return 1;
  }

  const hasWeakPrerequisite = prerequisites.some((dependency) => (masteryMap.get(dependency.prerequisiteConceptId) ?? 0) < progressThreshold);
  return hasWeakPrerequisite ? 0.92 : 1;
}

export function recalculateMastery(attempts: DemoAttempt[]): ConceptMastery[] {
  const mastery = initialMastery.map((item) => ({ ...item, lastUpdated: new Date(item.lastUpdated) }));
  const masteryMap = new Map(mastery.map((item) => [item.conceptId, item.masteryScore]));

  for (const concept of mockConcepts) {
    const conceptAttempts = attempts.filter((attempt) => attempt.conceptIds.includes(concept.id));
    if (conceptAttempts.length === 0) {
      continue;
    }

    const weightedScore = conceptAttempts.reduce((sum, attempt) => {
      const question = mockQuestions.find((candidate) => candidate.id === attempt.questionId);
      const questionWeight = getQuestionWeight(question?.difficulty ?? QuestionDifficulty.EASY);
      const confidenceAdjustment = attempt.confidenceRating >= 4 ? 1.05 : attempt.confidenceRating <= 2 ? 0.92 : 1;
      const recencyHours = Math.max(1, (Date.now() - new Date(attempt.submittedAt).getTime()) / (1000 * 60 * 60));
      const recencyWeight = recencyHours < 48 ? 1.15 : recencyHours < 120 ? 1.05 : 0.95;
      const baseScore = attempt.isCorrect ? 100 : 25;
      return sum + baseScore * questionWeight * confidenceAdjustment * recencyWeight;
    }, 0);

    const averageScore = weightedScore / conceptAttempts.length;
    const consistencyBonus = conceptAttempts.slice(-3).every((attempt) => attempt.isCorrect) ? 6 : 0;
    const prerequisitePenalty = getPrerequisitePenalty(concept.id, masteryMap);
    const baseMastery = initialMastery.find((item) => item.conceptId === concept.id)?.masteryScore ?? 40;
    const masteryScore = Math.max(5, Math.min(100, Math.round(((baseMastery * 0.4) + (averageScore * 0.6) + consistencyBonus) * prerequisitePenalty)));

    masteryMap.set(concept.id, masteryScore);

    const current = mastery.find((item) => item.conceptId === concept.id);
    if (current) {
      current.masteryScore = masteryScore;
      current.lastUpdated = new Date();
    }
  }

  return mastery;
}

export function getPracticeQuestions(input?: { assessmentId?: string | null; conceptId?: string | null; mode?: string | null }) {
  if (input?.assessmentId) {
    const assessment = initialAssessments.find((item) => item.id === input.assessmentId);
    return mockQuestions.filter((question) => question.conceptIds.some((conceptId) => assessment?.conceptIds.includes(conceptId))).slice(0, assessment?.questionCount ?? 3);
  }

  if (input?.mode === 'recommended') {
    return mockQuestions.filter((question) => question.conceptIds.includes('quadratics'));
  }

  if (input?.mode === 'revision') {
    return mockQuestions.filter((question) => ['graphing-inequalities', 'quadratics'].some((conceptId) => question.conceptIds.includes(conceptId)));
  }

  if (input?.conceptId) {
    const conceptId = input.conceptId;
    return mockQuestions.filter((question) => question.conceptIds.includes(conceptId));
  }

  return mockQuestions.slice(0, 3);
}

export function buildLearningPath(mastery: ConceptMastery[]): LearningPathNode[] {
  const masteryMap = new Map(mastery.map((item) => [item.conceptId, item.masteryScore]));

  return mockConcepts.map((concept) => {
    const prerequisites = mockConceptDependencies.filter((dependency) => dependency.sourceConceptId === concept.id);
    const prerequisiteNames = prerequisites.map((dependency) => getConceptName(dependency.prerequisiteConceptId));
    const prerequisitesMet = prerequisites.every((dependency) => (masteryMap.get(dependency.prerequisiteConceptId) ?? 0) >= progressThreshold);
    const score = masteryMap.get(concept.id) ?? 0;

    let status: LearningPathNode['status'];
    if (!prerequisitesMet) {
      status = 'Locked';
    } else if (score >= strongThreshold) {
      status = 'Completed';
    } else if (score >= progressThreshold) {
      status = 'In Progress';
    } else {
      status = 'Available';
    }

    return {
      conceptId: concept.id,
      conceptName: concept.name,
      status,
      mastery: score,
      prerequisiteNames,
      href: status === 'Locked' ? undefined : `${appRoutes.student.practice}?conceptId=${concept.id}`,
    };
  });
}

export function buildReminders(mastery: ConceptMastery[], attempts: DemoAttempt[]): SmartReminder[] {
  const weakConcepts = mastery.filter((item) => item.masteryScore < progressThreshold);
  const staleConcepts = mastery.filter((item) => {
    const lastAttempt = attempts.find((attempt) => attempt.conceptIds.includes(item.conceptId));
    if (!lastAttempt) return true;
    return Date.now() - new Date(lastAttempt.submittedAt).getTime() > 1000 * 60 * 60 * 48;
  });

  return [...weakConcepts, ...staleConcepts]
    .filter((item, index, array) => array.findIndex((candidate) => candidate.conceptId === item.conceptId) === index)
    .slice(0, 2)
    .map((item) => ({
      concept: { id: item.conceptId, name: getConceptName(item.conceptId) },
      reason: item.masteryScore < progressThreshold ? 'Low mastery needs reinforcement before the next unit.' : 'This concept is due for a spaced revision check-in.',
    }));
}

export function buildRecommendation(mastery: ConceptMastery[]): DashboardRecommendation {
  const sorted = [...mastery].sort((left, right) => left.masteryScore - right.masteryScore);
  const target = sorted[0] ?? initialMastery[0];
  const prerequisite = mockConceptDependencies.find((dependency) => dependency.sourceConceptId === target.conceptId);
  const prerequisiteScore = prerequisite ? mastery.find((item) => item.conceptId === prerequisite.prerequisiteConceptId)?.masteryScore ?? 0 : 100;
  const needsPrerequisite = prerequisite && prerequisiteScore < progressThreshold;
  const nextConceptId = needsPrerequisite ? prerequisite.prerequisiteConceptId : target.conceptId;

  return {
    nextConceptId,
    nextConceptName: getConceptName(nextConceptId),
    reason: needsPrerequisite
      ? `Before advancing, shore up ${getConceptName(prerequisite!.prerequisiteConceptId)} to unlock smoother progress.`
      : `Recent evidence shows ${getConceptName(target.conceptId)} is the best next move for a quick mastery gain.`,
    ctaLabel: needsPrerequisite ? 'Review prerequisite' : 'Start targeted practice',
    href: `${appRoutes.student.practice}?conceptId=${nextConceptId}&mode=recommended`,
  };
}

export function buildProgressData(mastery: ConceptMastery[], attempts: DemoAttempt[]): ProgressDatum[] {
  return mastery.map((item) => {
    const conceptAttempts = attempts.filter((attempt) => attempt.conceptIds.includes(item.conceptId));
    const lastAttempt = conceptAttempts[0];
    const recentAccuracy = conceptAttempts.slice(0, 3).filter((attempt) => attempt.isCorrect).length;
    const delta = conceptAttempts.length === 0 ? 0 : Math.min(12, recentAccuracy * 4 - 2);

    return {
      conceptId: item.conceptId,
      conceptName: getConceptName(item.conceptId),
      mastery: item.masteryScore,
      delta,
      lastPracticedLabel: lastAttempt ? minutesAgo(lastAttempt.submittedAt) : 'Not started',
      rationale: item.masteryScore >= strongThreshold ? 'Consistent recent accuracy keeps this concept stable.' : item.masteryScore >= progressThreshold ? 'You are improving here, but another focused session would help.' : 'Missed or uncertain answers are keeping this concept below readiness.',
    };
  });
}

export function buildAssessmentResult(assessment: DemoAssessment, attempts: DemoAttempt[]): DemoAssessmentResult {
  const assessmentAttempts = attempts.filter((attempt) => attempt.assessmentId === assessment.id);
  const totalQuestions = Math.max(assessment.questionCount, assessmentAttempts.length);
  const correctAnswers = assessmentAttempts.filter((attempt) => attempt.isCorrect).length;
  const score = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);

  const conceptBreakdown = assessment.conceptIds.map((conceptId) => {
    const conceptAttempts = assessmentAttempts.filter((attempt) => attempt.conceptIds.includes(conceptId));
    return {
      conceptId,
      conceptName: getConceptName(conceptId),
      correct: conceptAttempts.filter((attempt) => attempt.isCorrect).length,
      total: Math.max(1, conceptAttempts.length),
    };
  });

  return { assessment, score, correctAnswers, totalQuestions, conceptBreakdown };
}

export function buildRevisionQueue(mastery: ConceptMastery[], attempts: DemoAttempt[]): DemoRevisionTask[] {
  return mastery
    .filter((item) => item.masteryScore < strongThreshold)
    .sort((left, right) => left.masteryScore - right.masteryScore)
    .slice(0, 4)
    .map((item, index) => {
      const latestAttempt = attempts.find((attempt) => attempt.conceptIds.includes(item.conceptId));
      const dueLabel = latestAttempt ? `Due ${minutesAgo(latestAttempt.submittedAt)}` : 'Due now';
      return {
        id: `revision-${item.conceptId}`,
        conceptId: item.conceptId,
        conceptName: getConceptName(item.conceptId),
        reason:
          item.masteryScore < progressThreshold
            ? 'Weak concept needs remediation before the next checkpoint.'
            : 'Good momentum, but one more spaced review will stabilize it.',
        dueLabel,
        intensity: index === 0 || item.masteryScore < progressThreshold ? 'high' : item.masteryScore < 75 ? 'medium' : 'light',
      };
    });
}

export function getStudyStreakDays(attempts: DemoAttempt[]) {
  const recentAttempt = attempts[0];
  if (!recentAttempt) {
    return 0;
  }

  const daysSinceRecent = Math.max(0, Math.floor((Date.now() - new Date(recentAttempt.submittedAt).getTime()) / (1000 * 60 * 60 * 24)));
  return Math.max(1, 5 - daysSinceRecent);
}

export function buildTodayPlan(state: DemoStudentState): DemoScheduleItem[] {
  const recommendation = buildRecommendation(state.mastery);
  const nextAssessment = state.assessments.find((assessment) => assessment.status === 'Assigned' || assessment.status === 'In Progress');

  return [
    {
      id: 'schedule-1',
      label: `Targeted practice: ${recommendation.nextConceptName}`,
      timeLabel: '4:00 PM',
      type: 'practice',
    },
    {
      id: 'schedule-2',
      label: 'Revision queue refresh',
      timeLabel: '4:25 PM',
      type: 'revision',
    },
    {
      id: 'schedule-3',
      label: nextAssessment ? `Assessment prep: ${nextAssessment.title}` : 'Coach reflection check-in',
      timeLabel: '5:00 PM',
      type: nextAssessment ? 'assessment' : 'coaching',
    },
  ];
}

export function buildQuizHistory(state: DemoStudentState): DemoQuizHistoryItem[] {
  const assessmentHistory = state.assessments
    .filter((assessment) => assessment.lastScore !== undefined)
    .slice(0, 3)
    .map((assessment) => ({
      id: `history-${assessment.id}`,
      title: assessment.title,
      score: assessment.lastScore ?? 0,
      completedAtLabel: assessment.completedAt ? minutesAgo(assessment.completedAt) : 'This week',
      mode: 'assessment' as const,
    }));

  const practiceHistory = state.attempts
    .filter((attempt) => attempt.source === 'practice')
    .slice(0, 2)
    .map((attempt, index) => ({
      id: `history-practice-${index + 1}-${attempt.id}`,
      title: `${getConceptName(attempt.conceptIds[0] ?? 'linear-equations')} quick check`,
      score: attempt.isCorrect ? 100 : 50,
      completedAtLabel: minutesAgo(attempt.submittedAt),
      mode: 'practice' as const,
    }));

  return [...assessmentHistory, ...practiceHistory].slice(0, 5);
}

export function buildTeacherHeatmap(students: DemoTeacherStudent[]): DemoTeacherHeatmapCell[] {
  return mockTeacherWeakConcepts.map((item, index) => {
    const interventionWeight = students.filter((student) => student.cohort === 'Intervention').length * 2;
    return {
      conceptId: item.conceptId,
      conceptName: item.conceptName,
      score: Math.max(25, item.performance - interventionWeight + index * 4),
    };
  });
}

export function buildTeacherWatchlist(students: DemoTeacherStudent[]) {
  return students
    .filter((student) => student.status === 'Weak' || student.cohort === 'Intervention')
    .sort((left, right) => left.avgScore - right.avgScore)
    .slice(0, 4);
}

export function buildDashboardData(state: DemoStudentState) {
  return {
    user: demoUsers.student,
    concepts: mockConcepts,
    mastery: state.mastery,
    recommendation: buildRecommendation(state.mastery),
    recentActivity: state.activities,
    reminders: buildReminders(state.mastery, state.attempts),
    revisionQueue: buildRevisionQueue(state.mastery, state.attempts),
    streakDays: getStudyStreakDays(state.attempts),
    todayPlan: buildTodayPlan(state),
    recentQuizHistory: buildQuizHistory(state),
  };
}

export function completePracticeSession(
  state: DemoStudentState,
  input: {
    answers: Array<{ questionId: string; selectedOptionId: string; confidenceRating: number }>;
    mode: PracticeMode;
    conceptId?: string | null;
    assessmentId?: string | null;
  },
): DemoStudentState {
  const newAttempts: DemoAttempt[] = input.answers.map((answer, index) => {
    const question = mockQuestions.find((candidate) => candidate.id === answer.questionId)!;
    return {
      id: `attempt-${state.attempts.length + index + 1}`,
      questionId: question.id,
      conceptIds: question.conceptIds,
      isCorrect: question.correctOptionId === answer.selectedOptionId,
      confidenceRating: answer.confidenceRating,
      selectedOptionId: answer.selectedOptionId,
      submittedAt: new Date(Date.now() + index * 1000).toISOString(),
      source: input.assessmentId ? 'assessment' : 'practice',
      mode: input.mode,
      assessmentId: input.assessmentId ?? undefined,
    };
  });

  const attempts = [...newAttempts, ...state.attempts];
  const mastery = recalculateMastery(attempts);
  const correctAnswers = newAttempts.filter((attempt) => attempt.isCorrect).length;
  const score = newAttempts.length === 0 ? 0 : Math.round((correctAnswers / newAttempts.length) * 100);
  const sessionLabel = input.assessmentId
    ? `Submitted ${initialAssessments.find((assessment) => assessment.id === input.assessmentId)?.title ?? 'assessment'} with a ${score}% score`
    : `Completed a ${input.mode.replace('-', ' ')} practice session with a ${score}% score`;

  const activities = [
    { id: `activity-${Date.now()}`, text: sessionLabel, timeLabel: 'Just now' },
    ...state.activities.slice(0, 4),
  ];

  const assessments: DemoAssessment[] = state.assessments.map((assessment) => {
    if (assessment.id !== input.assessmentId) {
      return assessment;
    }

    const nextStatus: AssessmentStatus = score >= 75 ? 'Reviewed' : 'Completed';

    return {
      ...assessment,
      status: nextStatus,
      lastScore: score,
      completedAt: new Date().toISOString(),
    };
  });

  const goals: DemoGoal[] = state.goals.map((goal) => {
    if (goal.status !== 'active') {
      return goal;
    }

    const nextProgress = Math.min(100, goal.progress + (input.assessmentId ? 18 : 10));
    const nextStatus: DemoGoal['status'] = nextProgress >= 100 ? 'completed' : goal.status;
    return {
      ...goal,
      progress: nextProgress,
      status: nextStatus,
    };
  });

  return {
    ...state,
    attempts,
    mastery,
    activities,
    assessments,
    goals,
  };
}

export function getStudentMastery(state?: DemoStudentState, studentId = demoUsers.student.id) {
  const source = state?.mastery ?? initialMastery;
  return source.filter((item) => item.studentId === studentId);
}

export function getStudentDashboardData(state?: DemoStudentState) {
  return buildDashboardData(state ?? createInitialStudentState());
}

export function getParentDashboardData(state?: DemoStudentState) {
  const source = state ?? createInitialStudentState();
  const mastery = source.mastery;
  return {
    parent: demoUsers.parent,
    student: demoUsers.student,
    mastery,
    strengths: mastery.filter((item) => item.masteryScore >= strongThreshold),
    weaknesses: mastery.filter((item) => item.masteryScore < progressThreshold),
  };
}

export function buildParentChildProfiles(state?: DemoStudentState): DemoParentChildProfile[] {
  const source = state ?? createInitialStudentState();

  return [
    {
      student: demoUsers.student,
      mastery: source.mastery,
      goals: source.goals,
      alerts: mockParentAlerts.filter((alert) => alert.studentId === demoUsers.student.id),
      weeklyActivity: [
        { day: 'Mon', minutes: 30 },
        { day: 'Tue', minutes: 45 },
        { day: 'Wed', minutes: 25 },
        { day: 'Thu', minutes: 50 },
        { day: 'Fri', minutes: 40 },
      ],
      digest: {
        summary: 'Alex stayed active across the week, but quadratics still needs one focused follow-up before the next milestone.',
        attendanceTone: 'Steady weekly effort with one high-value gap still open.',
      },
      changes: [
        {
          id: 'change-1',
          title: 'Quadratics improved slightly',
          description: 'Recent targeted practice created a small lift, but the concept is still below readiness.',
          tone: 'positive',
        },
        {
          id: 'change-2',
          title: 'Assessment deadline is close',
          description: 'The algebra diagnostic is now the highest-risk upcoming checkpoint.',
          tone: 'warning',
        },
      ],
      supportTips: [
        {
          id: 'tip-1',
          title: 'Ask for a worked example aloud',
          description: 'Have Alex explain one quadratics example step by step before starting independent work.',
        },
        {
          id: 'tip-2',
          title: 'Use a short review block',
          description: 'A 15-minute focused review is more valuable right now than a long general study session.',
        },
      ],
      upcomingAssessments: source.assessments.slice(0, 2).map((assessment) => ({
        id: assessment.id,
        title: assessment.title,
        dueLabel: new Date(assessment.dueDate).toLocaleDateString(),
      })),
      missedWork: [
        { id: 'missed-1', title: 'Quadratics review reflection', status: 'Overdue' },
      ],
      teacherMessagesPreview: [
        { id: 'preview-1', sender: 'Maya Thompson', text: 'A short quadratics review tonight would help lock in the last session.' },
      ],
    },
    {
      student: mockSecondStudent,
      mastery: mockSecondStudentMastery.map((item) => ({ ...item, lastUpdated: new Date(item.lastUpdated) })),
      goals: mockSecondStudentGoals.map((item) => ({ ...item })),
      alerts: mockSecondStudentAlerts.map((item) => ({ ...item, createdAt: new Date(item.createdAt) })),
      weeklyActivity: [
        { day: 'Mon', minutes: 20 },
        { day: 'Tue', minutes: 35 },
        { day: 'Wed', minutes: 30 },
        { day: 'Thu', minutes: 15 },
        { day: 'Fri', minutes: 25 },
      ],
      digest: {
        summary: 'Mia is staying engaged, but one overdue review task is keeping progress flatter than it should be.',
        attendanceTone: 'Moderate activity with inconsistent follow-through on weak-topic cleanup.',
      },
      changes: [
        {
          id: 'change-3',
          title: 'Overdue review still open',
          description: 'The quadratics review task has not been completed yet.',
          tone: 'warning',
        },
      ],
      supportTips: [
        {
          id: 'tip-3',
          title: 'Clear one overdue task first',
          description: 'Have Mia finish the open review item before starting new work so momentum resets cleanly.',
        },
      ],
      upcomingAssessments: [
        { id: 'assessment-child-2', title: 'Functions readiness checkpoint', dueLabel: '03/29/2026' },
      ],
      missedWork: [
        { id: 'missed-2', title: 'Quadratics revision queue', status: 'Overdue' },
      ],
      teacherMessagesPreview: [
        { id: 'preview-2', sender: 'Maya Thompson', text: 'Mia is close to stable progress once the overdue quadratics review is cleared.' },
      ],
    },
  ];
}

export function getTeacherDashboardData() {
  return { classStats: mockTeacherClassStats, weakConcepts: mockTeacherWeakConcepts, students: mockTeacherStudents };
}

export function getAssessments(state?: DemoStudentState) {
  return state?.assessments ?? initialAssessments;
}

export function getProgressData(state?: DemoStudentState) {
  const source = state ?? createInitialStudentState();
  return buildProgressData(source.mastery, source.attempts);
}




export function getTeacherAssignments() {
  return mockTeacherAssignments;
}

export function createInitialTeacherManagementState() {
  return {
    classes: mockTeacherClasses.map((item) => ({ ...item, studentIds: [...item.studentIds] })),
    students: mockTeacherStudents.map((item) => ({ ...item })),
    assignments: mockTeacherAssignments.map((item) => ({
      ...item,
      assignedDate: new Date(item.assignedDate),
      dueDate: new Date(item.dueDate),
    })),
    nudges: [
      {
        id: 'nudge-1',
        studentId: 'student-c',
        audience: 'student' as const,
        message: 'Start the quadratics rescue set before tomorrow so we can review gaps together.',
        category: 'Intervention' as const,
        sentAt: new Date(currentYear, 2, 25, 8, 10).toISOString(),
      },
      {
        id: 'nudge-2',
        studentId: 'student-b',
        audience: 'parent' as const,
        message: 'Bob is close to readiness. A short review session tonight would help lock it in.',
        category: 'Follow-up' as const,
        sentAt: new Date(currentYear, 2, 24, 18, 40).toISOString(),
      },
    ] satisfies DemoTeacherNudge[],
    threads: [
      {
        id: 'thread-1',
        studentId: 'student-c',
        participantRole: 'student' as const,
        participantName: 'Charlie',
        topic: 'Quadratics recovery plan',
        messages: [
          {
            id: 'message-1',
            senderRole: 'teacher' as const,
            text: 'Please start with the rescue set tonight. We will review factorization tomorrow.',
            sentAt: new Date(currentYear, 2, 25, 9, 0).toISOString(),
          },
          {
            id: 'message-2',
            senderRole: 'student' as const,
            text: 'I can do the first half tonight and finish the rest in the morning.',
            sentAt: new Date(currentYear, 2, 25, 9, 20).toISOString(),
          },
        ],
      },
      {
        id: 'thread-2',
        studentId: 'student-b',
        participantRole: 'parent' as const,
        participantName: 'Morgan Brown',
        topic: 'Weekly readiness follow-up',
        messages: [
          {
            id: 'message-3',
            senderRole: 'teacher' as const,
            text: 'Bob is close to readiness. A short review block this evening would help.',
            sentAt: new Date(currentYear, 2, 24, 18, 0).toISOString(),
          },
          {
            id: 'message-4',
            senderRole: 'parent' as const,
            text: 'Understood. We will review the assigned work after dinner.',
            sentAt: new Date(currentYear, 2, 24, 18, 30).toISOString(),
          },
        ],
      },
    ] satisfies DemoMessageThread[],
    templates: mockTeacherAssignmentTemplates.map((item) => ({ ...item })),
    submissions: mockTeacherSubmissions.map((item) => ({ ...item })),
    reviewQueue: mockTeacherReviewQueue.map((item) => ({ ...item })),
    notes: mockTeacherNotes.map((item) => ({ ...item })),
    deadlines: mockTeacherDeadlines.map((item) => ({ ...item })),
    contactRequests: mockTeacherContactRequests.map((item) => ({ ...item })),
  };
}

export function getNotificationsForUser(userId?: string) {
  if (!userId) {
    return mockNotifications;
  }

  return mockNotifications.filter((notification) => notification.userId === userId);
}

export function getNotificationsForUserFromState(
  notifications: Notification[],
  userId?: string,
) {
  if (!userId) {
    return notifications;
  }

  return notifications.filter((notification) => notification.userId === userId);
}

export function getParentAlerts(studentId = demoUsers.student.id) {
  return mockParentAlerts.filter((alert) => alert.studentId === studentId);
}
