import type { Metadata } from "next";
import EnrolmentWorkflow from "@/features/crm/components/enrolment-workflow";

export const metadata: Metadata = {
  title: "Enrolment Workflow | PCDC AI",
  description: "Enrol, transfer, or withdraw students",
};

export default function WorkflowPage() {
  return <EnrolmentWorkflow />;
}
