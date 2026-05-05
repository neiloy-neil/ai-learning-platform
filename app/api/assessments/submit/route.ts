
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { studentAttempts, updateProgress, questions, users, auditLogs } from '@/lib/db/data';
import { mockAssessments } from '@/lib/mock-data';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const session = cookies().get('session');
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = users.find(user => user.id === session.value);
        if (!user || user.role !== 'student') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { assessmentId, answers } = await req.json();

        if (!assessmentId || !answers) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const assessment = mockAssessments.find(a => a.id === assessmentId);
        if (!assessment) {
            return new NextResponse("Assessment not found", { status: 404 });
        }

        let score = 0;
        const conceptResults: any = {};
        const newAttempts: any = [];

        for (const answer of answers) {
            const question = questions.find(q => q.id === answer.questionId);
            if (question) {
                const isCorrect = answer.answerId === question.correctOptionId;
                if (isCorrect) {
                    score++;
                }
                for (const conceptId of question.conceptIds) {
                    if (!conceptResults[conceptId]) {
                        conceptResults[conceptId] = { conceptId, correct: 0, total: 0, percentage: 0 };
                    }
                    conceptResults[conceptId].total++;
                    if (isCorrect) {
                        conceptResults[conceptId].correct++;
                    }
                }
                newAttempts.push({
                    id: `att${studentAttempts.length + newAttempts.length + 1}`,
                    questionId: answer.questionId,
                    conceptIds: question.conceptIds,
                    isCorrect,
                    confidenceRating: 5, // placeholder
                    selectedOptionId: answer.answerId,
                    submittedAt: new Date().toISOString(),
                    source: 'assessment',
                    mode: 'assessment-review',
                    assessmentId,
                    studentId: user.id,
                });
            }
        }

        const percentage = (score / assessment.totalMarks) * 100;

        for (const conceptId in conceptResults) {
            const result = conceptResults[conceptId];
            result.percentage = (result.correct / result.total) * 100;
        }

        const newAttempt = {
            id: `att${studentAttempts.length + 1}`,
            assessmentId,
            studentId: user.id,
            submittedDate: new Date(),
            score,
            percentage,
            status: 'completed',
            conceptResults: Object.values(conceptResults),
            startedAt: new Date(),
            completedAt: new Date(),
        };

        updateProgress(newAttempts);

        // @ts-ignore
        studentAttempts.push(newAttempt);

        auditLogs.push({
            id: `log${auditLogs.length + 1}`,
            userId: user.id,
            action: 'submit_assessment',
            entityType: 'assessment_attempt',
            entityId: newAttempt.id,
            timestamp: new Date(),
        });

        await fetch('/api/assessments/notify-parents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ attempt: newAttempt })
        });

        return NextResponse.json(newAttempt, { status: 201 });

    } catch (error) {
        console.error("[ASSESSMENT_SUBMIT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
