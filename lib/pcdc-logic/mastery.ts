
import {
  Concept,
  ConceptMastery,
  Question,
  StudentResponse,
} from "@/lib/pcdc-types";

/**
 * Calculates the mastery score for a specific concept based on a student's responses.
 *
 * This is a foundational piece of the learning intelligence model. The initial logic is a
 * simple percentage of correct answers, but it can be expanded to include factors like
 * question difficulty, attempt recency, and decay over time.
 *
 * @param concept The concept for which to calculate mastery.
 * @param allQuestions A list of all available questions.
 * @param studentResponses All of a student's responses.
 * @returns A new mastery score (a number between 0 and 1).
 */
export function calculateConceptMastery(
  concept: Concept,
  allQuestions: Question[],
  studentResponses: StudentResponse[]
): number {
  // Find all questions related to the target concept.
  const relevantQuestionIds = allQuestions
    .filter((q) => q.conceptIds.includes(concept.id))
    .map((q) => q.id);

  if (relevantQuestionIds.length === 0) {
    return 0; // No questions for this concept, so no mastery can be demonstrated.
  }

  // Filter student responses to only those that are for the relevant questions.
  const relevantResponses = studentResponses.filter((r) =>
    relevantQuestionIds.includes(r.questionId)
  );

  if (relevantResponses.length === 0) {
    return 0; // No attempts made for this concept yet.
  }

  // Calculate the number of correct responses.
  const correctResponses = relevantResponses.filter((r) => r.isCorrect).length;

  // The mastery score is the ratio of correct answers to total attempts.
  const masteryScore = correctResponses / relevantResponses.length;

  return masteryScore;
}

/**
 * Updates a student's mastery profile with a new set of responses.
 *
 * @param studentId The ID of the student.
 * @param allConcepts A list of all concepts in the system.
 * @param allQuestions A list of all questions in the system.
 * @param allStudentResponses All responses for the student.
 * @param existingMastery The student's existing mastery profile.
 * @returns An array of updated ConceptMastery objects.
 */
export function updateStudentMasteryProfile(
  studentId: string,
  allConcepts: Concept[],
  allQuestions: Question[],
  allStudentResponses: StudentResponse[],
  existingMastery: ConceptMastery[]
): ConceptMastery[] {
  const updatedMasteryProfile: ConceptMastery[] = allConcepts.map((concept) => {
    const newMasteryScore = calculateConceptMastery(
      concept,
      allQuestions,
      allStudentResponses
    );

    const existingConceptMastery = existingMastery.find(
      (m) => m.conceptId === concept.id
    );

    return {
      id: existingConceptMastery?.id || `${studentId}-${concept.id}`,
      studentId: studentId,
      conceptId: concept.id,
      masteryScore: newMasteryScore,
      lastUpdated: new Date(),
    };
  });

  return updatedMasteryProfile;
}
