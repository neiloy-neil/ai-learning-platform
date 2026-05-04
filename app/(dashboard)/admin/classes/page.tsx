import type { Metadata } from "next";
import ClassManagementAdminView from "@/features/admin-dashboard/components/class-management-admin-view";

export const metadata: Metadata = {
  title: "Class Management | PCDC AI",
  description: "Manage classes, schedules, and enrollment",
};

export default function AdminClassesPage() {
  return <ClassManagementAdminView />;
}
