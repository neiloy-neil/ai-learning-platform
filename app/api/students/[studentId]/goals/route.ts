import { NextResponse } from 'next/server';
import { studentGoals } from '@/lib/db/data';

export async function GET(_req: Request, context: { params: Promise<{ studentId: string }> }) {
    try {
        const { studentId } = await context.params;
        if (!studentId) {
            return new NextResponse("Student ID is required", { status: 400 });
        }

        const goals = studentGoals.filter(goal => goal.studentId === studentId);
        return NextResponse.json(goals);
    } catch (error) {
        console.error("[STUDENT_GOALS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request, context: { params: Promise<{ studentId: string }> }) {
    try {
        const { studentId } = await context.params;
        if (!studentId) {
            return new NextResponse("Student ID is required", { status: 400 });
        }

        const { text } = await req.json();
        if (!text) {
            return new NextResponse("Goal text is required", { status: 400 });
        }

        const newGoal = {
            id: `g${studentGoals.length + 1}`,
            studentId,
            text,
            progress: 0,
        };
        studentGoals.push(newGoal);

        return NextResponse.json(newGoal, { status: 201 });
    } catch (error) {
        console.error("[STUDENT_GOALS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
