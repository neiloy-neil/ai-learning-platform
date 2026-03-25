'use client';

import LearningPathTimeline from './learning-path-timeline';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function LearningPathPageView() {
  const { dashboardData, learningPath } = useDemoData();
  const completedCount = learningPath.filter((node) => node.status === 'Completed').length;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Your Learning Path</h1>
        <p className="text-md text-muted-foreground">Your journey through the concepts, one step at a time.</p>
        <p className="text-sm text-muted-foreground">
          {completedCount} of {learningPath.length} milestones completed. Locked concepts automatically open when prerequisite mastery improves.
        </p>
      </div>
      <LearningPathTimeline concepts={dashboardData.concepts} mastery={dashboardData.mastery} />
    </div>
  );
}
