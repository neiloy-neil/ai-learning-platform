import type { Metadata } from "next";

import { HomePageView } from "@/features/home/components/home-page-view";

export const metadata: Metadata = {
  title: "AI Learning Platform for Students, Teachers, and Parents",
  description:
    "A role-based learning platform with assessments, progress tracking, teacher oversight, parent visibility, and AI-powered study support.",
};

export default function HomePage() {
  return <HomePageView className="w-full" />;
}
