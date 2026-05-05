
import { NextResponse } from 'next/server';
import { users, notifications } from '@/lib/db/data';

export async function POST(req: Request) {
    try {
        const { attempt } = await req.json();

        if (!attempt) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const student = users.find(user => user.id === attempt.studentId);
        if (!student) {
            return new NextResponse("Student not found", { status: 404 });
        }

        const parents = users.filter(user => user.role === 'parent' && user.studentIds?.includes(student.id));

        for (const parent of parents) {
            notifications.push({
                id: `notif${notifications.length + 1}`,
                userId: parent.id,
                text: `${student.name} has completed the assessment "${(attempt as any).assessmentTitle}" with a score of ${attempt.percentage}%.`,
                read: false,
                createdAt: new Date(),
            });
        }

        return NextResponse.json({ message: "Parents notified successfully." });

    } catch (error) {
        console.error("[ASSESSMENT_NOTIFY_PARENTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
