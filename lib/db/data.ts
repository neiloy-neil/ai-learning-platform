import type {
  Concept,
  ConceptDependency,
  ConceptMastery,
  Question,
  StudentResponse,
  User,
} from '@/lib/pcdc-types';
import { QuestionDifficulty, UserRole } from '@/lib/pcdc-types';

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

export const studentAttempts: StudentResponse[] = [
  {
    id: 'attempt1',
    studentId: 'user1',
    questionId: 'q1',
    isCorrect: true,
    attemptTimestamp: new Date('2026-03-20T10:00:00Z'),
    confidenceRating: 4,
  },
  {
    id: 'attempt2',
    studentId: 'user1',
    questionId: 'q2',
    isCorrect: true,
    attemptTimestamp: new Date('2026-03-20T10:05:00Z'),
    confidenceRating: 5,
  },
  {
    id: 'attempt3',
    studentId: 'user1',
    questionId: 'q3',
    isCorrect: false,
    attemptTimestamp: new Date('2026-03-21T14:00:00Z'),
    confidenceRating: 2,
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

export const conceptMastery: ConceptMastery[] = [];
