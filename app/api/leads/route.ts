
import { NextResponse } from 'next/server';
import { leads } from '@/lib/db/crm-data';
import { users, auditLogs } from '@/lib/db/data';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const session = cookies().get('session');
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = users.find(user => user.id === session.value);
        if (!user || user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { studentName, studentGrade, parentName, parentEmail, parentPhone, source, parentConcern } = body;

        if (!studentName || !studentGrade || !parentName || !parentEmail || !parentPhone || !source || !parentConcern) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const newLead = {
            id: `lead${leads.length + 1}`,
            studentName,
            studentGrade,
            parentName,
            parentEmail,
            parentPhone,
            source,
            parentConcern,
            status: 'new',
            pipeline: 'new',
            createdDate: new Date(),
        };

        // @ts-ignore
        leads.push(newLead);

        auditLogs.push({
            id: `log${auditLogs.length + 1}`,
            userId: user.id,
            action: 'create_lead',
            entityType: 'lead',
            entityId: newLead.id,
            timestamp: new Date(),
        });

        return NextResponse.json(newLead, { status: 201 });

    } catch (error) {
        console.error("[LEADS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
