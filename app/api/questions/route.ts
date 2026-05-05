
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, auditLogs, questions } from '@/lib/db/data';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const conceptId = searchParams.get('conceptId');

        if (conceptId) {
            const filteredQuestions = questions.filter(q => q.conceptIds.includes(conceptId));
            return NextResponse.json(filteredQuestions);
        }

        return NextResponse.json(questions);
    } catch (error) {
        console.error("[QUESTIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = cookies().get('session');
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = users.find(user => user.id === session.value);
        if (!user || (user.role !== 'admin' && user.role !== 'teacher')) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { text, difficulty, conceptIds, options, correctOptionId, explanation } = body;

        if (!text || !difficulty || !conceptIds || !options || !correctOptionId || !explanation) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const newQuestion = {
            id: `q${questions.length + 1}`,
            text,
            difficulty,
            conceptIds,
            options,
            correctOptionId,
            explanation,
        };

        // @ts-ignore
        questions.push(newQuestion);

        auditLogs.push({
            id: `log${auditLogs.length + 1}`,
            userId: user.id,
            action: 'create_question',
            entityType: 'question',
            entityId: newQuestion.id,
            timestamp: new Date(),
        });

        return NextResponse.json(newQuestion, { status: 201 });

    } catch (error) {
        console.error("[QUESTIONS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
