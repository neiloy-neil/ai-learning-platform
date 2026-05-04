import type { Metadata } from "next";
import ContentManagementView from "@/features/admin-dashboard/components/content-management-view";

export const metadata: Metadata = {
  title: "Content Management | PCDC AI",
  description: "Manage curriculum, concepts, and question banks",
};

export default function AdminContentPage() {
  return <ContentManagementView />;
}
