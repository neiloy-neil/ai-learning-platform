
// lib/adaptive-engine.ts
import { Concept, ConceptDependency, ConceptMastery } from "./pcdc-types";
import { db } from "./db";

const WEAK_THRESHOLD = 60;
const STRONG_THRESHOLD = 80;

export async function getRecommendation(masteryProfile: ConceptMastery[], allConcepts: Concept[]) {
    const weakConcepts = masteryProfile.filter(m => m.masteryScore < WEAK_THRESHOLD);

    if (weakConcepts.length > 0) {
        // Sort weak concepts by score to find the weakest
        const sortedWeak = weakConcepts.sort((a, b) => a.masteryScore - b.masteryScore);
        const weakestConceptId = sortedWeak[0].conceptId;

        // Check if this weakest concept has unmet prerequisites
        const dependencies = await db.conceptDependency.findMany({ where: { sourceConceptId: weakestConceptId } });
        for (const dep of dependencies) {
            const prereqMastery = masteryProfile.find(m => m.conceptId === dep.prerequisiteConceptId);
            if (!prereqMastery || prereqMastery.masteryScore < STRONG_THRESHOLD) {
                const conceptInfo = await db.concept.findUnique({ where: { id: dep.prerequisiteConceptId } });
                return {
                    next_concept: conceptInfo?.name,
                    reason: `Prerequisite '${conceptInfo?.name}' is not yet mastered. `,
                    action: "Review prerequisite",
                };
            }
        }

        // If no unmet prerequisites, recommend the weakest concept itself
        const conceptInfo = await db.concept.findUnique({ where: { id: weakestConceptId } });
        return {
            next_concept: conceptInfo?.name,
            reason: `Lowest mastery score (${sortedWeak[0].masteryScore}%)`,
            action: "Practice questions",
        };
    }

    // If no weak concepts, find the next unmastered concept
    const allMasteredOrStrong = masteryProfile.filter(m => m.masteryScore >= STRONG_THRESHOLD).map(m => m.conceptId);
    const allDependencies = await db.conceptDependency.findMany({ where: {} });

    for(const dep of allDependencies) {
        if (allMasteredOrStrong.includes(dep.prerequisiteConceptId) && !allMasteredOrStrong.includes(dep.sourceConceptId)) {
            const conceptInfo = await db.concept.findUnique({ where: { id: dep.sourceConceptId } });
            return {
                next_concept: conceptInfo?.name,
                reason: "You have mastered the prerequisites.",
                action: "Start new topic",
            }
        }
    }

    return {
        next_concept: "Free practice",
        reason: "You have mastered all available concepts!",
        action: "Choose any topic",
    };
}
