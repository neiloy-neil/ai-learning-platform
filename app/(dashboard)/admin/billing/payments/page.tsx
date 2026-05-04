import type { Metadata } from "next";
import PaymentsView from "@/features/billing/components/payments-view";

export const metadata: Metadata = {
  title: "Payments | PCDC AI",
  description: "Record and track payments",
};

export default function PaymentsPage() {
  return <PaymentsView />;
}
