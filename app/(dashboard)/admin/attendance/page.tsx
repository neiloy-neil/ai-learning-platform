import type { Metadata } from "next";
import AttendanceTrackingView from "@/features/crm/components/attendance-tracking-view";

export const metadata: Metadata = {
  title: "Attendance Tracking | PCDC AI",
  description: "Track student attendance and check-in/check-out times",
};

export default function AttendancePage() {
  return <AttendanceTrackingView />;
}
