
import { NextResponse } from 'next/server';
import { teacherWeakConcepts } from '@/lib/db/data';

export async function GET() {
    try {
        return NextResponse.json(teacherWeakConcepts);
    } catch (error) {
        console.error("[TEACHER_WEAK_CONCEPTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
