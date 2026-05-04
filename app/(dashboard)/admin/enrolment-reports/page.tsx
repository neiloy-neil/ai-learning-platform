import type { Metadata } from "next";
import EnrolmentReports from "@/features/crm/components/enrolment-reports";

export const metadata: Metadata = {
  title: "Enrolment Reports | PCDC AI",
  description: "Enrolment analytics and revenue reports",
};

export default function EnrolmentReportsPage() {
  return <EnrolmentReports />;
}
