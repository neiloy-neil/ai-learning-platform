import type { Metadata } from "next";
import HomeworkManagementView from "@/features/crm/components/homework-management-view";

export const metadata: Metadata = {
  title: "Homework Management | PCDC AI",
  description: "Manage homework assignments, submissions, and grading",
};

export default function HomeworkPage() {
  return <HomeworkManagementView />;
}
