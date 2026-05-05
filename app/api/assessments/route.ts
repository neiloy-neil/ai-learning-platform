
import { NextResponse } from 'next/server';
import { mockAssessments } from '@/lib/mock-data';
import { users, auditLogs } from '@/lib/db/data';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        // In a real app, this would fetch from a database.
        return NextResponse.json(mockAssessments);
    } catch (error) {
        console.error("[ASSESSMENTS_GET]", error);
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

        const { title, level, conceptIds, dueDate, assignedTo, totalMarks, passingMarks } = await req.json();

        if (!title || !level || !conceptIds || !dueDate || !assignedTo || !totalMarks || !passingMarks) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const newAssessment = {
            id: `as${mockAssessments.length + 1}`,
            title,
            level,
            conceptIds,
            dueDate,
            assignedTo,
            totalMarks,
            passingMarks,
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // @ts-ignore
        mockAssessments.push(newAssessment);

        auditLogs.push({
            id: `log${auditLogs.length + 1}`,
            userId: user.id,
            action: 'create_assessment',
            entityType: 'assessment',
            entityId: newAssessment.id,
            timestamp: new Date(),
        });

        return NextResponse.json(newAssessment, { status: 201 });

    } catch (error) {
        console.error("[ASSESSMENTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
