import type { Metadata } from "next";
import ClassManagementView from "@/features/crm/components/class-management-view";

export const metadata: Metadata = {
  title: "Class Management | PCDC AI",
  description: "Manage classes, enrolments, and waitlists",
};

export default function ClassesPage() {
  return <ClassManagementView />;
}
