
import { NextResponse } from 'next/server';
import { classStats } from '@/lib/db/data';

export async function GET() {
    try {
        return NextResponse.json(classStats);
    } catch (error) {
        console.error("[TEACHER_STATS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
