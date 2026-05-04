
import { NextResponse } from 'next/server';
import { mockAssessments } from '@/lib/mock-data';

export async function GET() {
    try {
        // In a real app, this would fetch from a database.
        return NextResponse.json(mockAssessments);
    } catch (error) {
        console.error("[ASSESSMENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
