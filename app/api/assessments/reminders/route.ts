
import { NextResponse } from 'next/server';
import { mockAssessments } from '@/lib/mock-data';
import { studentAttempts } from '@/lib/db/data';
import { notifications } from '@/lib/db/data';

export async function POST() {
    try {
        const today = new Date();
        const overdueAssessments = mockAssessments.filter(assessment => new Date(assessment.dueDate) < today && assessment.status !== 'Completed');

        for (const assessment of overdueAssessments) {
            const studentsWhoAttempted = studentAttempts
                .filter(attempt => attempt.assessmentId === assessment.id)
                .map(attempt => (attempt as any).studentId);

            const studentsToRemind = (assessment.assignedTo as any).filter((studentId: string) => !studentsWhoAttempted.includes(studentId));

            for (const studentId of studentsToRemind) {
                notifications.push({
                    id: `notif${notifications.length + 1}`,
                    userId: studentId,
                    text: `Reminder: The assessment "${assessment.title}" is overdue.`,
                    read: false,
                    createdAt: new Date(),
                });
            }
        }

        return NextResponse.json({ message: "Reminders sent successfully." });

    } catch (error) {
        console.error("[ASSESSMENT_REMINDERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
