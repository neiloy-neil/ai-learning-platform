import type { Metadata } from "next";
import StudentCRMView from "@/features/crm/components/student-crm-view";

export const metadata: Metadata = {
  title: "Student CRM | PCDC AI",
  description: "Manage students, families, and enquiries",
};

export default function StudentsPage() {
  return <StudentCRMView />;
}
