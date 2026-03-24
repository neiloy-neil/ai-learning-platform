import { QuestionDifficulty, UserRole, type Concept, type ConceptMastery, type Question, type User } from "@/lib/pcdc-types";

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

export type AssessmentSummary = {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  status: "Available" | "In Progress" | "Completed";
};

export type TeacherStudentRow = {
  id: string;
  name: string;
  avgScore: number;
  status: "Strong" | "Good" | "Weak";
};

export type TeacherWeakConcept = {
  conceptId: string;
  conceptName: string;
  performance: number;
};

export type TeacherClassStats = {
  averageScore: number;
  completionRate: number;
  studentsAtRisk: number;
};

export type ProgressDatum = {
  conceptId: string;
  conceptName: string;
  mastery: number;
};

const currentYear = new Date().getFullYear();

export const mockConcepts: Concept[] = [
  { id: "linear-equations", name: "Solving Linear Equations", subject: "math", level: "grade-9" },
  { id: "graphing-inequalities", name: "Graphing Inequalities", subject: "math", level: "grade-9" },
  { id: "polynomials", name: "Understanding Polynomials", subject: "math", level: "grade-9" },
  { id: "quadratics", name: "Mastering Quadratic Equations", subject: "math", level: "grade-10" },
  { id: "calculus-intro", name: "Introduction to Calculus", subject: "math", level: "grade-11" },
];

export const mockUsers = {
  student: { id: "student-1", name: "Alex Carter", email: "alex@example.com", role: UserRole.STUDENT } satisfies User,
  parent: { id: "parent-1", name: "Jordan Carter", email: "jordan@example.com", role: UserRole.PARENT, studentIds: ["student-1"] } satisfies User,
  teacher: { id: "teacher-1", name: "Maya Thompson", email: "maya@example.com", role: UserRole.TEACHER } satisfies User,
};

export const mockMastery: ConceptMastery[] = [
  { id: "mastery-1", studentId: "student-1", conceptId: "linear-equations", masteryScore: 95, lastUpdated: new Date(currentYear, 2, 20) },
  { id: "mastery-2", studentId: "student-1", conceptId: "graphing-inequalities", masteryScore: 80, lastUpdated: new Date(currentYear, 2, 19) },
  { id: "mastery-3", studentId: "student-1", conceptId: "polynomials", masteryScore: 65, lastUpdated: new Date(currentYear, 2, 18) },
  { id: "mastery-4", studentId: "student-1", conceptId: "quadratics", masteryScore: 40, lastUpdated: new Date(currentYear, 2, 16) },
  { id: "mastery-5", studentId: "student-1", conceptId: "calculus-intro", masteryScore: 15, lastUpdated: new Date(currentYear, 2, 14) },
];

export const mockRecentActivity: ActivityItem[] = [
  { id: "activity-1", text: "Completed a quiz on Graphing Inequalities", timeLabel: "2h ago" },
  { id: "activity-2", text: "Spent 25 minutes practicing Linear Equations", timeLabel: "1d ago" },
  { id: "activity-3", text: "Reached 95% mastery in Solving Linear Equations", timeLabel: "2d ago" },
];

export const mockReminders: SmartReminder[] = [
  { concept: { id: "quadratics", name: "Mastering Quadratic Equations" }, reason: "Revision is due because recent attempts showed unstable mastery." },
  { concept: { id: "calculus-intro", name: "Introduction to Calculus" }, reason: "You have not reviewed this concept recently and mastery is still low." },
];

export const mockRecommendation: DashboardRecommendation = {
  nextConceptId: "quadratics",
  nextConceptName: "Mastering Quadratic Equations",
  reason: "Your latest results show strong algebra fundamentals, but quadratic setup and factorization still need reinforcement.",
  ctaLabel: "Start targeted practice",
  href: "/student/practice?conceptId=quadratics",
};

export const mockAssessments: AssessmentSummary[] = [
  { id: "assess-1", title: "Algebra Diagnostic Test", description: "Test your foundational knowledge of Algebra.", questionCount: 10, status: "Available" },
  { id: "assess-2", title: "Weekly Quiz: Linear Equations", description: "A short checkpoint on equation-solving and graph interpretation.", questionCount: 5, status: "In Progress" },
  { id: "assess-3", title: "Geometry Fundamentals Check", description: "Assess your understanding of core geometry ideas before the next module.", questionCount: 15, status: "Completed" },
];

export const mockQuestions: Question[] = [
  { id: "question-1", text: "What value of x solves 3x + 6 = 21?", difficulty: QuestionDifficulty.EASY, conceptIds: ["linear-equations"], options: [{ id: "a", text: "3" }, { id: "b", text: "5" }, { id: "c", text: "7" }, { id: "d", text: "9" }], correctOptionId: "b", explanation: "Subtract 6 from both sides to get 3x = 15, then divide by 3." },
  { id: "question-2", text: "Which graph matches y > 2x - 1?", difficulty: QuestionDifficulty.MEDIUM, conceptIds: ["graphing-inequalities"], options: [{ id: "a", text: "Dashed line with shading above" }, { id: "b", text: "Solid line with shading below" }, { id: "c", text: "Dashed line with shading below" }, { id: "d", text: "Solid line with shading above" }], correctOptionId: "a", explanation: "A strict inequality uses a dashed boundary line and shades the region above the line." },
  { id: "question-3", text: "Which expression is a polynomial?", difficulty: QuestionDifficulty.EASY, conceptIds: ["polynomials"], options: [{ id: "a", text: "3x^2 + 2x - 5" }, { id: "b", text: "4/x + 1" }, { id: "c", text: "sqrt(x) + 7" }, { id: "d", text: "2^x + 1" }], correctOptionId: "a", explanation: "Polynomials contain only non-negative integer exponents and no variables in denominators or radicals." },
  { id: "question-4", text: "What are the factors of x^2 - 5x + 6?", difficulty: QuestionDifficulty.MEDIUM, conceptIds: ["quadratics"], options: [{ id: "a", text: "(x - 1)(x - 6)" }, { id: "b", text: "(x - 2)(x - 3)" }, { id: "c", text: "(x + 2)(x + 3)" }, { id: "d", text: "(x - 4)(x - 2)" }], correctOptionId: "b", explanation: "The two numbers that multiply to 6 and add to -5 are -2 and -3." },
];

export const mockTeacherClassStats: TeacherClassStats = { averageScore: 78, completionRate: 85, studentsAtRisk: 3 };
export const mockTeacherWeakConcepts: TeacherWeakConcept[] = [
  { conceptId: "quadratics", conceptName: "Quadratic Equations", performance: 45 },
  { conceptId: "polynomials", conceptName: "Polynomials", performance: 52 },
  { conceptId: "graphing-inequalities", conceptName: "Graphing Inequalities", performance: 61 },
];
export const mockTeacherStudents: TeacherStudentRow[] = [
  { id: "student-a", name: "Alice", avgScore: 92, status: "Strong" },
  { id: "student-b", name: "Bob", avgScore: 75, status: "Good" },
  { id: "student-c", name: "Charlie", avgScore: 55, status: "Weak" },
  { id: "student-d", name: "David", avgScore: 81, status: "Good" },
];

export function getConceptName(conceptId: string) {
  return mockConcepts.find((concept) => concept.id === conceptId)?.name ?? "Unknown Concept";
}
export function getStudentMastery(studentId = mockUsers.student.id) {
  return mockMastery.filter((item) => item.studentId === studentId);
}
export function getStudentDashboardData() {
  return { user: mockUsers.student, concepts: mockConcepts, mastery: getStudentMastery(), recommendation: mockRecommendation, recentActivity: mockRecentActivity, reminders: mockReminders };
}
export function getParentDashboardData() {
  const mastery = getStudentMastery();
  return { parent: mockUsers.parent, student: mockUsers.student, mastery, strengths: mastery.filter((item) => item.masteryScore >= 80), weaknesses: mastery.filter((item) => item.masteryScore < 60) };
}
export function getTeacherDashboardData() {
  return { classStats: mockTeacherClassStats, weakConcepts: mockTeacherWeakConcepts, students: mockTeacherStudents };
}
export function getAssessments() {
  return mockAssessments;
}
export function getPracticeQuestions(input?: { assessmentId?: string | null; conceptId?: string | null }) {
  if (input?.conceptId) return mockQuestions.filter((question) => question.conceptIds.includes(input.conceptId as string));
  if (input?.assessmentId === "assess-2") return mockQuestions.slice(0, 2);
  return mockQuestions.slice(0, 3);
}
export function getProgressData(): ProgressDatum[] {
  return getStudentMastery().map((item) => ({ conceptId: item.conceptId, conceptName: getConceptName(item.conceptId), mastery: item.masteryScore }));
}
