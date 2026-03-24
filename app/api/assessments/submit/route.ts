
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { studentAttempts } from '@/lib/db/data';

export async function POST(req: Request) {
    try {
        const { studentId, questionId, isCorrect, confidenceRating } = await req.json();

        if (!studentId || !questionId || isCorrect === undefined) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const newAttempt = {
            id: `att${studentAttempts.length + 1}`,
            studentId,
            questionId,
            isCorrect,
            attemptTimestamp: new Date(),
            confidenceRating: confidenceRating || null,
        };

        studentAttempts.push(newAttempt);

        return NextResponse.json(newAttempt, { status: 201 });

    } catch (error) {
        console.error("[ASSESSMENT_SUBMIT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
