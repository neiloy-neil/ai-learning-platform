import type { Metadata } from "next";
import EmailManagementView from "@/features/admin-dashboard/components/email-management-view";

export const metadata: Metadata = {
  title: "Email Management | PCDC AI",
  description: "Send bulk emails and manage communications",
};

export default function AdminEmailsPage() {
  return <EmailManagementView />;
}
