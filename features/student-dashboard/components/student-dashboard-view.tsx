
import MasteryOverview from "./mastery-overview";
import RecommendedAction from "./recommended-action";
import WelcomeHeader from "./welcome-header";
import LearningPathTimeline from "./learning-path-timeline";
import RecentActivity from "./recent-activity";

export default function StudentDashboardView() {
  return (
    <div className="space-y-8">
      <WelcomeHeader />
      <MasteryOverview />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LearningPathTimeline />
        </div>
        <div className="space-y-8">
          <RecommendedAction />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
