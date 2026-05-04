import type { Metadata } from "next";
import PracticeQuestionView from "@/features/practice/components/practice-question-view";

export const metadata: Metadata = {
  title: "Practice | PCDC AI",
  description: "Practice questions and exercises",
};

export default function PracticePage() {
  return <PracticeQuestionView />;
}
