'use client';

import MasteryOverview from '@/features/student-dashboard/components/mastery-overview';
import RecentActivity from '@/features/student-dashboard/components/recent-activity';
import { getProgressData, mockConcepts, mockRecentActivity, mockUsers } from '@/lib/mocks';

export default function StudentDetailView({ studentId }: { studentId: string }) {
  const student = { ...mockUsers.student, id: studentId };
  const mastery = getProgressData().map((item, index) => ({
    id: `detail-${index}`,
    studentId,
    conceptId: item.conceptId,
    masteryScore: item.mastery,
    lastUpdated: new Date(),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{student.name}&apos;s Progress</h1>
        <p className="text-md text-muted-foreground">
          A detailed overview of this student&apos;s performance.
        </p>
      </div>
      <MasteryOverview concepts={mockConcepts} mastery={mastery} />
      <RecentActivity activities={mockRecentActivity} />
    </div>
  );
}
