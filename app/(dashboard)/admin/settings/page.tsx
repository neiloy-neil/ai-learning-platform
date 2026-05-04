import type { Metadata } from "next";
import SettingsView from "@/features/admin-dashboard/components/settings-view";

export const metadata: Metadata = {
  title: "Settings | PCDC AI",
  description: "Platform configuration and settings",
};

export default function AdminSettingsPage() {
  return <SettingsView />;
}
