import type { Metadata } from "next";
import StudentDashboardView from "@/features/student-dashboard/components/student-dashboard-view";

export const metadata: Metadata = {
  title: "Student Dashboard | PCDC AI",
  description: "Your personalized learning dashboard",
};

export default function StudentDashboardPage() {
  return <StudentDashboardView />;
}
