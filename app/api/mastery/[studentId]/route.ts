import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { calculateMasteryScore } from '@/lib/mastery-engine';

export async function GET(_req: Request, context: { params: Promise<{ studentId: string }> }) {
    try {
        const { studentId } = await context.params;
        if (!studentId) {
            return new NextResponse("Student ID is required", { status: 400 });
        }

        const allConcepts = await db.concept.findMany();
        const allQuestions = await db.question.findMany();
        const allAttempts = await db.studentAttempt.findMany({ where: { studentId } });

        for (const concept of allConcepts) {
            const conceptQuestions = allQuestions.filter(q => q.conceptIds.includes(concept.id));
            const conceptQuestionIds = conceptQuestions.map(q => q.id);
            const conceptAttempts = allAttempts.filter(att => conceptQuestionIds.includes(att.questionId!));
            const masteryScore = calculateMasteryScore(conceptAttempts);

            await db.conceptMastery.upsert({
                where: { studentId_conceptId: { studentId, conceptId: concept.id } },
                create: { studentId, conceptId: concept.id, masteryScore, lastUpdated: new Date() },
                update: { masteryScore, lastUpdated: new Date() },
            });
        }

        const finalMasteryProfile = await db.conceptMastery.findMany({ where: { studentId } });

        return NextResponse.json(finalMasteryProfile);
    } catch (error) {
        console.error("[MASTERY_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
