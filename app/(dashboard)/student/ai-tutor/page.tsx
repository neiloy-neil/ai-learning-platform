import type { Metadata } from "next";
import AiTutorView from '@/features/ai-tutor/components/ai-tutor-view';

export const metadata: Metadata = {
  title: "AI Tutor | PCDC AI",
  description: "Get personalized help from your AI tutor",
};

export default function StudentAiTutorPage() {
  return <AiTutorView />;
}
