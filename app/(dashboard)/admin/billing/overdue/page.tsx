import type { Metadata } from "next";
import OverdueDashboard from "@/features/billing/components/overdue-dashboard";

export const metadata: Metadata = {
  title: "Overdue Invoices | PCDC AI",
  description: "Track overdue invoices and send reminders",
};

export default function OverduePage() {
  return <OverdueDashboard />;
}
