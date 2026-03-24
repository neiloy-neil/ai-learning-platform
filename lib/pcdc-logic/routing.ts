
import {
  Concept,
  ConceptDependency,
  ConceptMastery,
} from "@/lib/pcdc-types";
import { detectPrerequisiteGaps, detectWeakConcepts } from "./gaps";

const MASTERY_THRESHOLD = 0.8; // A higher threshold to be considered "mastered"

/**
 * Determines the next concept(s) a student should work on.
 *
 * The logic is as follows:
 * 1. Identify any prerequisite gaps. If any exist, recommend those first.
 * 2. If no prerequisite gaps, find the next unmastered concept in the learning progression.
 * 3. If all concepts are mastered, return an empty array.
 *
 * @param studentMasteryProfile The student's full mastery profile.
 * @param allConcepts All concepts in the system.
 * @param dependencies The full concept dependency graph.
 * @returns An array of recommended concepts for the student to practice next.
 */
export function getNextRecommendedConcepts(
  studentMasteryProfile: ConceptMastery[],
  allConcepts: Concept[],
  dependencies: ConceptDependency[]
): Concept[] {
  // 1. Prioritize prerequisite gaps first.
  const prerequisiteGaps = detectPrerequisiteGaps(
    studentMasteryProfile,
    dependencies,
    allConcepts
  );

  if (prerequisiteGaps.length > 0) {
    return prerequisiteGaps; // These must be addressed first.
  }

  // 2. If no gaps, find the next concept in the progression.

  // Find all mastered concepts.
  const masteredConceptIds = studentMasteryProfile
    .filter((m) => m.masteryScore >= MASTERY_THRESHOLD)
    .map((m) => m.conceptId);

  // Find all concepts that have the mastered concepts as prerequisites.
  const potentialNextConceptIds = dependencies
    .filter((dep) => masteredConceptIds.includes(dep.prerequisiteConceptId))
    .map((dep) => dep.sourceConceptId);

  // Find the first potential next concept that is NOT yet mastered.
  for (const conceptId of potentialNextConceptIds) {
    if (!masteredConceptIds.includes(conceptId)) {
      const nextConcept = allConcepts.find((c) => c.id === conceptId);
      if (nextConcept) {
        return [nextConcept]; // Return the first unmastered successor concept.
      }
    }
  }

  // 3. If no prerequisite gaps and no obvious next steps, find the lowest-scored concept that isn't a gap.
  const weakConcepts = detectWeakConcepts(studentMasteryProfile, allConcepts);
  if (weakConcepts.length > 0) {
    // Sort by mastery score to find the weakest one.
    const sortedWeakConcepts = weakConcepts.sort((a, b) => {
      const masteryA = studentMasteryProfile.find(m => m.conceptId === a.id)!.masteryScore;
      const masteryB = studentMasteryProfile.find(m => m.conceptId === b.id)!.masteryScore;
      return masteryA - masteryB;
    });
    return [sortedWeakConcepts[0]];
  }

  // 4. If all else fails, return an empty array, indicating completion or need for new material.
  return [];
}
