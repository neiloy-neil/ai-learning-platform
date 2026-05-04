import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { calculateMasteryScore } from '@/lib/mastery-engine';
import { getRecommendation } from '@/lib/adaptive-engine';

export async function GET(_req: Request, context: { params: Promise<{ studentId: string }> }) {
    try {
        const { studentId } = await context.params;
        if (!studentId) {
            return new NextResponse("Student ID is required", { status: 400 });
        }

        const allConcepts = await db.concept.findMany();
        const allQuestions = await db.question.findMany();
        const allAttempts = await db.studentAttempt.findMany({ where: { studentId } });

        const masteryProfile = allConcepts.map(concept => {
            const conceptQuestions = allQuestions.filter(q => q.conceptIds.includes(concept.id));
            const conceptQuestionIds = conceptQuestions.map(q => q.id);
            const conceptAttempts = allAttempts.filter(att => conceptQuestionIds.includes(att.questionId!));
            const masteryScore = calculateMasteryScore(conceptAttempts);
            return {
                id: `mastery-${studentId}-${concept.id}`,
                studentId,
                conceptId: concept.id,
                masteryScore,
                lastUpdated: new Date(),
            };
        });

        const recommendation = await getRecommendation(masteryProfile, allConcepts);

        return NextResponse.json(recommendation);
    } catch (error) {
        console.error("[ADAPTIVE_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
