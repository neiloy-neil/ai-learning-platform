export const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "AI", href: "#ai" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const stats = [
  { label: "XP Points Earned", value: 24500, suffix: "+", tone: "from-violet-500/25 via-fuchsia-500/10 to-transparent" },
  { label: "Concepts Mastered", value: 128, suffix: "", tone: "from-sky-500/25 via-cyan-500/10 to-transparent" },
  { label: "Study Streak", value: 32, suffix: " days", tone: "from-amber-400/30 via-orange-500/10 to-transparent" },
  { label: "Accuracy", value: 94, suffix: "%", tone: "from-emerald-500/25 via-teal-500/10 to-transparent" },
] as const;

export const features = [
  { icon: "route", title: "Adaptive Learning Path", description: "Every session adjusts your next topic, challenge level, and pace so your momentum never stalls." },
  { icon: "sparkles", title: "AI Tutor", description: "Ask questions, get hints, and receive clear explanations built around the exact concept you are learning." },
  { icon: "bar-chart", title: "Mastery Tracking", description: "See what you truly understand with live mastery signals, confidence trends, and topic-by-topic clarity." },
  { icon: "refresh", title: "Smart Revision", description: "Review the right topics at the right time with revision suggestions that keep weak concepts from slipping." },
  { icon: "clipboard", title: "Assessments", description: "Practice under real test conditions, review mistakes instantly, and build exam confidence over time." },
  { icon: "target", title: "Study Goals", description: "Turn long-term improvement into daily action with streaks, milestones, weekly goals, and achievement rewards." },
] as const;

export const steps = [
  { step: "01", title: "Practice", description: "Start with focused questions, mini quizzes, and challenge sets built around your current level.", icon: "bolt" },
  { step: "02", title: "Track Mastery", description: "Watch concepts move from weak to strong with clear mastery updates, confidence markers, and streak signals.", icon: "gauge" },
  { step: "03", title: "Get Recommendations", description: "Receive tailored next steps, revision priorities, and study plan suggestions that keep you progressing.", icon: "brain" },
  { step: "04", title: "Improve", description: "Build momentum with better accuracy, stronger habits, and visible progress toward your learning goals.", icon: "trophy" },
] as const;

export const testimonials = [
  { name: "Ariana K.", role: "Grade 10 Student", quote: "The streaks and progress bars made me want to keep showing up. I stopped guessing what to study next." },
  { name: "Nafis R.", role: "High School Student", quote: "The AI Tutor explains hard topics in a way that feels personal. It is like having help on demand without feeling lost." },
  { name: "Ritu M.", role: "Exam Prep Student", quote: "I liked seeing exactly which concepts were weak. The platform made revision feel structured instead of stressful." },
] as const;

export const pricingPlans = [
  { name: "Starter", price: "Free", description: "A strong starting point for students building daily study habits.", features: ["Daily practice sets", "XP streak tracking", "Progress dashboard"], featured: false },
  { name: "Pro", price: "$12/mo", description: "For students who want full AI support, mastery insights, and guided revision.", features: ["AI Tutor access", "Smart revision plan", "Advanced mastery analytics"], featured: true },
  { name: "School", price: "Custom", description: "For institutions that want classroom rollout, reporting, and guided onboarding.", features: ["Teacher visibility", "Parent reporting", "Priority support"], featured: false },
] as const;

export const weeklyGraphBars = [
  { label: "D1", heightClassName: "h-[44%]" },
  { label: "D2", heightClassName: "h-[62%]" },
  { label: "D3", heightClassName: "h-[58%]" },
  { label: "D4", heightClassName: "h-[72%]" },
  { label: "D5", heightClassName: "h-[88%]" },
  { label: "D6", heightClassName: "h-[80%]" },
  { label: "D7", heightClassName: "h-[96%]" },
] as const;

export const masteryBreakdown = [
  { label: "Algebra", widthClassName: "w-[92%]", widthLabel: "92%" },
  { label: "Functions", widthClassName: "w-[85%]", widthLabel: "85%" },
  { label: "Geometry", widthClassName: "w-[73%]", widthLabel: "73%" },
  { label: "Statistics", widthClassName: "w-[67%]", widthLabel: "67%" },
] as const;
