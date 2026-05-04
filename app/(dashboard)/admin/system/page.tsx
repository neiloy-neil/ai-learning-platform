import type { Metadata } from "next";
import SystemHealthView from "@/features/admin-dashboard/components/system-health-view";

export const metadata: Metadata = {
  title: "System Health | PCDC AI",
  description: "Monitor system performance and health metrics",
};

export default function AdminSystemPage() {
  return <SystemHealthView />;
}
