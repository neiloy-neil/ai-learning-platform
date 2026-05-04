import type { Metadata } from "next";
import AdminDashboardView from "@/features/admin-dashboard/components/admin-dashboard-view";

export const metadata: Metadata = {
  title: "Admin Dashboard | PCDC AI",
  description: "Administrative dashboard for managing users, classes, and system operations",
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
