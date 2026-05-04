import type { Metadata } from "next";
import ReportsGeneratorView from "@/features/admin-dashboard/components/reports-generator-view";

export const metadata: Metadata = {
  title: "Reports | PCDC AI",
  description: "Generate and export platform reports",
};

export default function AdminReportsPage() {
  return <ReportsGeneratorView />;
}
