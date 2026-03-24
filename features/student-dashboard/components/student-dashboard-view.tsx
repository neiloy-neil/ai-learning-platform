'use client';

import { getStudentDashboardData } from '@/lib/mocks';

import LearningPathTimeline from './learning-path-timeline';
import MasteryOverview from './mastery-overview';
import RecentActivity from './recent-activity';
import RecommendedAction from './recommended-action';
import SmartReminders from './smart-reminders';
import WelcomeHeader from './welcome-header';

export default function StudentDashboardView() {
  const { concepts, mastery, recommendation, recentActivity, reminders, user } =
    getStudentDashboardData();

  return (
    <div className="space-y-8">
      <WelcomeHeader user={user} />
      <SmartReminders reminders={reminders} />
      <MasteryOverview concepts={concepts} mastery={mastery} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LearningPathTimeline concepts={concepts} mastery={mastery} />
        </div>
        <div className="space-y-8">
          <RecommendedAction recommendation={recommendation} />
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  );
}
