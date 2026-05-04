import type { Metadata } from "next";
import FeeRulesView from "@/features/billing/components/fee-rules-view";

export const metadata: Metadata = {
  title: "Fee Rules | PCDC AI",
  description: "Configure fee rules and pricing structures",
};

export default function FeeRulesPage() {
  return <FeeRulesView />;
}
