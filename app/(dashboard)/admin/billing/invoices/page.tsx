import type { Metadata } from "next";
import InvoicesView from "@/features/billing/components/invoices-view";

export const metadata: Metadata = {
  title: "Invoices | PCDC AI",
  description: "Manage and track invoices",
};

export default function InvoicesPage() {
  return <InvoicesView />;
}
