import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(_req: Request, context: { params: Promise<{ studentId: string }> }) {
    try {
        const { studentId } = await context.params;
        if (!studentId) {
            return new NextResponse("Student ID is required", { status: 400 });
        }

        const student = await db.user.findUnique({ where: { id: studentId } });

        if (!student) {
            return new NextResponse("Student not found", { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error("[STUDENT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
