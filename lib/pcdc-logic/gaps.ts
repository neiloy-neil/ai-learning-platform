
import { ConceptMastery, Concept, ConceptDependency } from "@/lib/pcdc-types";

const MASTERY_THRESHOLD = 0.6;

/**
 * Identifies concepts where a student's mastery is below a defined threshold.
 * This is the simplest form of learning gap detection.
 *
 * @param studentMasteryProfile The student's full mastery profile.
 * @returns An array of concepts identified as weak spots.
 */
export function detectWeakConcepts(
  studentMasteryProfile: ConceptMastery[],
  allConcepts: Concept[]
): Concept[] {
  const weakConceptIds = studentMasteryProfile
    .filter((mastery) => mastery.masteryScore < MASTERY_THRESHOLD)
    .map((mastery) => mastery.conceptId);

  return allConcepts.filter((concept) => weakConceptIds.includes(concept.id));
}

/**
 * Identifies learning gaps by analyzing dependencies. A gap is detected if a student
 * is working on an advanced concept without having mastered the prerequisites.
 *
 * @param studentMasteryProfile The student's full mastery profile.
 * @param dependencies The concept dependency graph for the entire system.
 * @returns An array of prerequisite concepts that are considered learning gaps.
 */
export function detectPrerequisiteGaps(
  studentMasteryProfile: ConceptMastery[],
  dependencies: ConceptDependency[],
  allConcepts: Concept[]
): Concept[] {
  const learningGaps = new Set<string>();

  // Find concepts the student has attempted (mastery score > 0)
  const attemptedConcepts = studentMasteryProfile.filter(
    (m) => m.masteryScore > 0
  );

  for (const mastery of attemptedConcepts) {
    // Find all prerequisites for the concept the student attempted.
    const prerequisites = dependencies.filter(
      (dep) => dep.sourceConceptId === mastery.conceptId
    );

    for (const prereq of prerequisites) {
      // Check the mastery score for the prerequisite concept.
      const prereqMastery = studentMasteryProfile.find(
        (m) => m.conceptId === prereq.prerequisiteConceptId
      );

      // If the prerequisite mastery is low or non-existent, it's a gap.
      if (!prereqMastery || prereqMastery.masteryScore < MASTERY_THRESHOLD) {
        learningGaps.add(prereq.prerequisiteConceptId);
      }
    }
  }

  return allConcepts.filter((concept) => learningGaps.has(concept.id));
}
