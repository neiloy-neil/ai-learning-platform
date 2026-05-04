import type { Metadata } from "next";

import { HomePageView } from "@/features/home/components/home-page-view";

export const metadata: Metadata = {
  title: "PCDC AI | Gamified Learning Platform for Students",
  description:
    "A premium AI-powered learning platform for students with adaptive practice, mastery tracking, streaks, badges, and smart study guidance.",
};

export default function HomePage() {
  return <HomePageView className="w-full" />;
}
