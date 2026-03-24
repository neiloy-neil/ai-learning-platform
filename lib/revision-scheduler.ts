
// lib/revision-scheduler.ts
import type { Concept, ConceptMastery, StudentResponse } from "./pcdc-types";

const REVISION_INTERVAL_DAYS = 7; // Revise mastered concepts after 7 days
const WEAK_CONCEPT_THRESHOLD = 60; // Mastery score below this is considered weak

export function getConceptsForRevision(masteryProfile: ConceptMastery[], attempts: StudentResponse[], allConcepts: Concept[]) {
    const revisionSuggestions: { concept: Concept, reason: string }[] = [];
    const now = new Date();

    // 1. Find mastered concepts that haven't been practiced recently
    const masteredConcepts = masteryProfile.filter(m => m.masteryScore >= 80);
    for (const mastered of masteredConcepts) {
        const conceptAttempts = attempts.filter(a => {
            // This is a simplified check. A real implementation would map question to concept.
            return true; // For now, let's assume we can get attempts by conceptId
        });
        
        const lastAttempt = conceptAttempts.sort((a, b) => b.attemptTimestamp.getTime() - a.attemptTimestamp.getTime())[0];
        if (lastAttempt) {
            const daysSinceLastPractice = (now.getTime() - lastAttempt.attemptTimestamp.getTime()) / (1000 * 3600 * 24);
            if (daysSinceLastPractice > REVISION_INTERVAL_DAYS) {
                const conceptInfo = allConcepts.find(c => c.id === mastered.conceptId);
                if (conceptInfo) {
                    revisionSuggestions.push({ concept: conceptInfo, reason: "Spaced repetition" });
                }
            }
        }
    }

    // 2. Find weak concepts
    const weakConcepts = masteryProfile.filter(m => m.masteryScore < WEAK_CONCEPT_THRESHOLD);
    for (const weak of weakConcepts) {
        const conceptInfo = allConcepts.find(c => c.id === weak.conceptId);
        if (conceptInfo && !revisionSuggestions.some(s => s.concept.id === conceptInfo.id)) {
            revisionSuggestions.push({ concept: conceptInfo, reason: "Low mastery" });
        }
    }

    return revisionSuggestions;
}
