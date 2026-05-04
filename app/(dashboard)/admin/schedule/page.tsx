import type { Metadata } from "next";
import ClassScheduleCalendar from "@/features/crm/components/class-schedule-calendar";

export const metadata: Metadata = {
  title: "Class Schedule | PCDC AI",
  description: "Weekly class schedule calendar",
};

export default function SchedulePage() {
  return <ClassScheduleCalendar />;
}
