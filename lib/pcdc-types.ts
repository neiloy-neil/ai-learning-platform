
/**
 * pcdc-types.ts
 * 
 * This file defines the core data structures and types for the PCDC adaptive learning platform,
 * based on the "inside-out" development principle. These types form the academic architecture
 * and data model for the entire system.
 */

// =================================================================
// 1. ACADEMIC ARCHITECTURE & CONCEPT MAPPING
// =================================================================

/**
 * Represents a single, structured educational concept.
 * This is the fundamental building block of the academic structure.
 */
export interface Concept {
  id: string; // Unique identifier for the concept (e.g., 'algebra-linear-equations')
  name: string; // Human-readable name (e.g., "Linear Equations")
  subject: string; // Subject the concept belongs to (e.g., 'math')
  level: string; // Educational level (e.g., 'grade-9')
}

/**
 * Defines a prerequisite relationship between two concepts.
 * This forms the basis for learning progressions and adaptive routing.
 */
export interface ConceptDependency {
  id: string;
  sourceConceptId: string; // The concept that requires a prerequisite
  prerequisiteConceptId: string; // The concept that must be mastered first
}

// =================================================================
// 2. ASSESSMENT & EVIDENCE MODEL
// =================================================================

/**
 * Enum for question difficulty levels.
 */
export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

/**
 * Represents a single assessment question.
 * Each question is explicitly linked to one or more concepts.
 */
export interface Question {
  id: string; // Unique identifier for the question
  text: string; // The content of the question itself
  difficulty: QuestionDifficulty; // Difficulty rating
  conceptIds: string[]; // An array of Concept IDs this question assesses
}

/**
 * Represents a student's single attempt at a question.
 * This is the core "evidence" of student understanding.
 */
export interface StudentResponse {
  id: string;
  studentId: string;
  questionId: string;
  isCorrect: boolean; // Was the answer correct?
  attemptTimestamp: Date; // When the attempt was made
}

// =================================================================
// 3. MASTERY & ADAPTIVE LOGIC
// =================================================================

/**
 * Represents a student's calculated mastery level for a single concept.
 * This is continuously updated based on evidence from StudentResponses.
 */
export interface ConceptMastery {
  id: string;
  studentId: string;
  conceptId: string;
  masteryScore: number; // A normalized score (e.g., 0 to 1)
  lastUpdated: Date;
}

// =================================================================
// 4. USER & DASHBOARD MODELS
// =================================================================

/**
 * Represents a student in the system.
 */
export interface Student {
  id: string;
  name: string;
}

/**
 * Represents a teacher or administrator.
 */
export interface Teacher {
  id: string;
  name: string;
}

/**
 * Represents a parent or guardian.
 */
export interface Parent {
  id: string;
  name: string;
  studentIds: string[]; // IDs of children associated with this parent
}
