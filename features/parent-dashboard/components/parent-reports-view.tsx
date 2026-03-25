'use client';

import PageHeader from '@/components/layout/page-header';
import PrintableSummaryCard from './printable-summary-card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { mockConcepts } from '@/lib/mocks';

export default function ParentReportsView() {
  const { parentProfiles, selectedParentStudentId } = useDemoData();
  const selectedProfile = parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];

  return (
    <div className="space-y-8">
      <PageHeader />
      <PrintableSummaryCard
        alerts={selectedProfile.alerts}
        concepts={mockConcepts}
        goals={selectedProfile.goals.map((goal) => ({ id: goal.id, progress: goal.progress, text: goal.text }))}
        mastery={selectedProfile.mastery}
        student={selectedProfile.student}
        weeklyActivity={selectedProfile.weeklyActivity}
      />
    </div>
  );
}
