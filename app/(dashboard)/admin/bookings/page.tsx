import type { Metadata } from "next";
import DiagnosticBookingCalendar from "@/features/crm/components/diagnostic-booking-calendar";

export const metadata: Metadata = {
  title: "Diagnostic Bookings | PCDC AI",
  description: "Manage diagnostic assessment bookings and calendar",
};

export default function DiagnosticBookingsPage() {
  return <DiagnosticBookingCalendar />;
}
