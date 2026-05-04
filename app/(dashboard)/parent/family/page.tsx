import type { Metadata } from "next";
import FamilyDashboardView from "@/features/parent-dashboard/components/family-dashboard-view";

export const metadata: Metadata = {
  title: "Family Dashboard | PCDC AI",
  description: "Manage your family account and track children's progress",
};

export default function FamilyDashboardPage() {
  return <FamilyDashboardView />;
}
