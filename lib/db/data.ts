import type {
  Concept,
  ConceptDependency,
  ConceptMastery,
  Question,
  StudentResponse,
  User,
  DemoAttempt,
} from '@/lib/pcdc-types';
import { QuestionDifficulty, UserRole } from '@/lib/pcdc-types';

const currentYear = new Date().getFullYear();

export const users: User[] = [
  { id: 'user1', name: 'Alice', email: 'alice@example.com', role: UserRole.STUDENT },
  { id: 'user2', name: 'Bob', email: 'bob@example.com', role: UserRole.STUDENT },
  { id: 'user3', name: 'Carol', email: 'carol@example.com', role: UserRole.STUDENT },
  {
    id: 'teacher1',
    name: 'Mr. Davis',
    email: 'teacher@example.com',
    role: UserRole.TEACHER,
  },
  {
    id: 'parent1',
    name: 'Sarah Johnson',
    email: 'parent@example.com',
    role: UserRole.PARENT,
    studentIds: ['user1'],
  },
];

export const concepts: Concept[] = [
  { id: 'concept1', name: 'Linear Equations', subject: 'Math', level: 'Grade 8' },
  { id: 'concept2', name: 'Variables and Expressions', subject: 'Math', level: 'Grade 7' },
  { id: 'concept3', name: 'Algebraic Fractions', subject: 'Math', level: 'Grade 9' },
  { id: 'concept4', name: 'Quadratic Equations', subject: 'Math', level: 'Grade 10' },
];

export const conceptDependencies: ConceptDependency[] = [
  { id: 'dep1', sourceConceptId: 'concept1', prerequisiteConceptId: 'concept2' },
  { id: 'dep2', sourceConceptId: 'concept3', prerequisiteConceptId: 'concept1' },
  { id: 'dep3', sourceConceptId: 'concept4', prerequisiteConceptId: 'concept1' },
];

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'What is x if 2x + 3 = 7?',
    difficulty: QuestionDifficulty.EASY,
    conceptIds: ['concept1'],
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: '4' },
    ],
    correctOptionId: 'b',
    explanation: 'Subtract 3 and divide by 2.',
  },
  {
    id: 'q2',
    text: 'Which expression contains a variable?',
    difficulty: QuestionDifficulty.EASY,
    conceptIds: ['concept2'],
    options: [
      { id: 'a', text: '5 + 4' },
      { id: 'b', text: '3x + 2' },
      { id: 'c', text: '12' },
      { id: 'd', text: '8 / 2' },
    ],
    correctOptionId: 'b',
    explanation: 'Variables are symbols like x that can represent values.',
  },
  {
    id: 'q3',
    text: 'Simplify 6x / 3.',
    difficulty: QuestionDifficulty.MEDIUM,
    conceptIds: ['concept3'],
    options: [
      { id: 'a', text: '2x' },
      { id: 'b', text: '3x' },
      { id: 'c', text: '6x' },
      { id: 'd', text: 'x / 2' },
    ],
    correctOptionId: 'a',
    explanation: 'Divide the coefficient 6 by 3 to get 2x.',
  },
];

export const studentAttempts: DemoAttempt[] = [
  {
    id: 'attempt-1',
    studentId: 'user1',
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
    studentId: 'user1',
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
    studentId: 'user1',
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

export const studentActivities = [
  { id: 'activity1', studentId: 'user1', text: 'Completed Linear Equations practice', timestamp: new Date('2026-03-24T10:00:00Z') },
  { id: 'activity2', studentId: 'user1', text: 'Reviewed Variables and Expressions', timestamp: new Date('2026-03-24T12:00:00Z') },
  { id: 'activity3', studentId: 'user1', text: 'Attempted Algebraic Fractions quiz', timestamp: new Date('2026-03-25T09:30:00Z') },
];

export const studentGoals = [
  { id: 'goal1', studentId: 'user1', text: 'Reach 80% in Linear Equations', progress: 90 },
  { id: 'goal2', studentId: 'user1', text: 'Practice algebra for 30 minutes daily', progress: 70 },
];

export const notifications = [
  { id: 'notif1', userId: 'user1', text: 'New practice set available for Linear Equations.', read: false, createdAt: new Date('2026-03-25T08:30:00Z') },
  { id: 'notif2', userId: 'user1', text: 'Your weekly mastery report is ready.', read: true, createdAt: new Date('2026-03-24T16:00:00Z') },
];

export const weeklyActivity = [
  { day: 'Mon', minutes: 35 },
  { day: 'Tue', minutes: 42 },
  { day: 'Wed', minutes: 28 },
  { day: 'Thu', minutes: 50 },
  { day: 'Fri', minutes: 31 },
  { day: 'Sat', minutes: 46 },
  { day: 'Sun', minutes: 25 },
];

export const assignments = [
  { id: 'assign1', title: 'Linear Equations Worksheet', description: 'Practice solving one-step and two-step equations.', assignedDate: new Date('2026-03-20T00:00:00Z'), dueDate: new Date('2026-03-27T00:00:00Z'), status: 'Assigned', assignedToStudentId: 'user1' },
  { id: 'assign2', title: 'Variables Quiz', description: 'Short quiz on variables and expressions.', assignedDate: new Date('2026-03-18T00:00:00Z'), dueDate: new Date('2026-03-22T00:00:00Z'), status: 'Submitted', assignedToStudentId: 'user1', score: 88 },
];

export const classStats = {
  averageScore: 78,
  completionRate: 84,
  studentsAtRisk: 3,
};

export const teacherWeakConcepts = [
  { conceptId: 'concept3', conceptName: 'Algebraic Fractions', performance: 48 },
  { conceptId: 'concept4', conceptName: 'Quadratic Equations', performance: 54 },
];

export const teacherStudentList = [
  { id: 'user1', name: 'Alice', avgScore: 84, status: 'Good' },
  { id: 'user2', name: 'Bob', avgScore: 73, status: 'Good' },
  { id: 'user3', name: 'Carol', avgScore: 58, status: 'Weak' },
];

export const parentAlerts = [
  { id: 'alert1', studentId: 'user1', message: "Alice's activity level was low this week.", type: 'low_activity', createdAt: new Date('2026-03-25T08:00:00Z') },
  { id: 'alert2', studentId: 'user1', message: 'Alice missed the "Weekly Quiz - Week 3".', type: 'missed_assessment', createdAt: new Date('2026-03-24T12:00:00Z') },
  { id: 'alert3', studentId: 'user1', message: "Alice's grade in Algebra has dropped.", type: 'grade_drop', createdAt: new Date('2026-03-23T16:00:00Z') },
];

export const conceptMastery: ConceptMastery[] = [
    { id: 'mastery-1', studentId: 'user1', conceptId: 'linear-equations', masteryScore: 92, lastUpdated: new Date(currentYear, 2, 20) },
    { id: 'mastery-2', studentId: 'user1', conceptId: 'graphing-inequalities', masteryScore: 78, lastUpdated: new Date(currentYear, 2, 19) },
    { id: 'mastery-3', studentId: 'user1', conceptId: 'polynomials', masteryScore: 66, lastUpdated: new Date(currentYear, 2, 18) },
    { id: 'mastery-4', studentId: 'user1', conceptId: 'quadratics', masteryScore: 42, lastUpdated: new Date(currentYear, 2, 16) },
    { id: 'mastery-5', studentId: 'user1', conceptId: 'calculus-intro', masteryScore: 18, lastUpdated: new Date(currentYear, 2, 14) },
];

export const auditLogs: any[] = [];

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
  const prerequisites = conceptDependencies.filter((dependency) => dependency.sourceConceptId === conceptId);
  if (prerequisites.length === 0) {
    return 1;
  }

  const hasWeakPrerequisite = prerequisites.some((dependency) => (masteryMap.get(dependency.prerequisiteConceptId) ?? 0) < 60);
  return hasWeakPrerequisite ? 0.92 : 1;
}

export function recalculateMastery(attempts: DemoAttempt[]): ConceptMastery[] {
  const mastery = conceptMastery.map((item) => ({ ...item, lastUpdated: new Date(item.lastUpdated) }));
  const masteryMap = new Map(mastery.map((item) => [item.conceptId, item.masteryScore]));

  for (const concept of concepts) {
    const conceptAttempts = attempts.filter((attempt) => attempt.conceptIds.includes(concept.id));
    if (conceptAttempts.length === 0) {
      continue;
    }

    const weightedScore = conceptAttempts.reduce((sum, attempt) => {
      const question = questions.find((candidate) => candidate.id === attempt.questionId);
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
    const baseMastery = conceptMastery.find((item) => item.conceptId === concept.id)?.masteryScore ?? 40;
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

export function updateProgress(newAttempts: DemoAttempt[]) {
    studentAttempts.push(...newAttempts);
    const newMastery = recalculateMastery(studentAttempts);
    // Clear and replace the existing conceptMastery array
    conceptMastery.length = 0;
    conceptMastery.push(...newMastery);
}
