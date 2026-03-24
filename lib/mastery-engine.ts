
// lib/mastery-engine.ts
import { StudentResponse } from "./pcdc-types";

const RECENCY_ATTEMPTS = 5;
const CONSISTENCY_ATTEMPTS = 3;

function calculateAccuracy(attempts: any[]) {
    if (attempts.length === 0) return 0;
    const correct = attempts.filter(a => a.isCorrect).length;
    return correct / attempts.length;
}

function calculateRecency(attempts: any[]) {
    const recentAttempts = attempts.slice(-RECENCY_ATTEMPTS);
    return calculateAccuracy(recentAttempts); // Simple recency: accuracy of last N attempts
}

function calculateConsistency(attempts: any[]) {
    if (attempts.length < CONSISTENCY_ATTEMPTS) return 0.5; // Not enough data for a consistency score
    const lastN = attempts.slice(-CONSISTENCY_ATTEMPTS);
    const allSame = lastN.every(a => a.isCorrect) || lastN.every(a => !a.isCorrect);
    return allSame ? 1.0 : 0.5;
}

export function calculateMasteryScore(attempts: any[]) {
    if (attempts.length === 0) {
        return 0;
    }

    const accuracy = calculateAccuracy(attempts);
    const recency = calculateRecency(attempts);
    const consistency = calculateConsistency(attempts);

    const masteryScore = (accuracy * 0.6) + (recency * 0.3) + (consistency * 0.1);
    
    // Ensure score is between 0 and 1, then scale to 100
    return Math.round(Math.max(0, Math.min(1, masteryScore)) * 100);
}
