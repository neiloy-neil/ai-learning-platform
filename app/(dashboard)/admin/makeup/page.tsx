import type { Metadata } from "next";
import MakeupWorkflowView from "@/features/crm/components/makeup-workflow-view";

export const metadata: Metadata = {
  title: "Make-up Sessions | PCDC AI",
  description: "Manage make-up sessions for absent students",
};

export default function MakeupPage() {
  return <MakeupWorkflowView />;
}
