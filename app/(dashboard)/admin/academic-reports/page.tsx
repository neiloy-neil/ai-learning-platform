import type { Metadata } from "next";
import AcademicReportsView from "@/features/crm/components/academic-reports-view";

export const metadata: Metadata = {
  title: "Academic Reports | PCDC AI",
  description: "Attendance and homework analytics and reports",
};

export default function AcademicReportsPage() {
  return <AcademicReportsView />;
}
