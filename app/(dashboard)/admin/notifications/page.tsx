import type { Metadata } from "next";
import ParentNotificationSystem from "@/features/crm/components/parent-notification-system";

export const metadata: Metadata = {
  title: "Parent Notifications | PCDC AI",
  description: "Send absence notifications to parents",
};

export default function NotificationsPage() {
  return <ParentNotificationSystem />;
}
