
import { NextResponse } from 'next/server';
import { teacherStudentList } from '@/lib/db/data';

export async function GET() {
    try {
        return NextResponse.json(teacherStudentList);
    } catch (error) {
        console.error("[TEACHER_STUDENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
