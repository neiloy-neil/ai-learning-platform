
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const conceptId = searchParams.get('conceptId');

        const questions = await db.question.findMany({
            where: {
                conceptIds: { has: conceptId! },
            },
        });

        return NextResponse.json(questions);
    } catch (error) {
        console.error("[QUESTIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
