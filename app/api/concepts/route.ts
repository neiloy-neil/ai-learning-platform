
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, auditLogs, concepts } from '@/lib/db/data';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        return NextResponse.json(concepts);
    } catch (error) {
        console.error("[CONCEPTS_GET]", error);
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
        if (!user || user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, subject, level } = body;

        if (!name || !subject || !level) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const newConcept = {
            id: `concept${concepts.length + 1}`,
            name,
            subject,
            level,
        };

        // @ts-ignore
        concepts.push(newConcept);

        auditLogs.push({
            id: `log${auditLogs.length + 1}`,
            userId: user.id,
            action: 'create_concept',
            entityType: 'concept',
            entityId: newConcept.id,
            timestamp: new Date(),
        });

        return NextResponse.json(newConcept, { status: 201 });

    } catch (error) {
        console.error("[CONCEPTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
