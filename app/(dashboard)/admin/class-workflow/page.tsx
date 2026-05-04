import type { Metadata } from "next";
import WeeklyClassWorkflow from "@/features/crm/components/weekly-class-workflow";

export const metadata: Metadata = {
  title: "Class Workflow | PCDC AI",
  description: "Automated weekly class workflow",
};

export default function WorkflowPage() {
  return <WeeklyClassWorkflow />;
}
