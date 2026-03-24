import { getStudentDashboardData } from '@/lib/mocks';

import LearningPathTimeline from './learning-path-timeline';

export default function LearningPathPageView() {
  const { concepts, mastery } = getStudentDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Learning Path</h1>
        <p className="text-md text-muted-foreground">
          Your journey through the concepts, one step at a time.
        </p>
      </div>
      <LearningPathTimeline concepts={concepts} mastery={mastery} />
    </div>
  );
}
