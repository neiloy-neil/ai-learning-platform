import type { Metadata } from "next";
import LeadPipelineView from "@/features/crm/components/lead-pipeline-view";

export const metadata: Metadata = {
  title: "Lead Pipeline | PCDC AI",
  description: "Manage lead pipeline and track conversions",
};

export default function LeadPipelinePage() {
  return <LeadPipelineView />;
}
