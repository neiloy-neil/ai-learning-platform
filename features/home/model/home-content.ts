export const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "AI", href: "#ai" },
  { label: "Programs", href: "#programs" },
  { label: "Book Diagnostic", href: "#booking" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
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

export const teachingApproach = [
  {
    icon: "brain",
    title: "Adaptive Learning",
    description: "Every student learns differently. Our AI continuously assesses performance and adjusts difficulty, pace, and content to match individual learning styles.",
    benefits: ["Personalized learning paths", "Real-time difficulty adjustment", "Individual pace tracking"],
  },
  {
    icon: "target",
    title: "Mastery-Based Progression",
    description: "Students don't just complete topics—they master them. Our system ensures deep understanding before moving to advanced concepts.",
    benefits: ["Concept dependency mapping", "Mastery threshold enforcement", "Automatic remediation"],
  },
  {
    icon: "sparkles",
    title: "AI-Powered Coaching",
    description: "24/7 intelligent tutoring support that provides instant explanations, personalized hints, and actionable study recommendations.",
    benefits: ["Instant concept explanations", "Step-by-step hints", "Personalized study plans"],
  },
  {
    icon: "trophy",
    title: "Gamified Motivation",
    description: "Learning should be engaging. We use streaks, XP points, badges, and levels to keep students motivated and building consistent study habits.",
    benefits: ["Daily streak tracking", "Achievement badges", "XP-based progression"],
  },
] as const;

export const faqData = [
  {
    question: "What is a diagnostic assessment?",
    answer: "A diagnostic assessment is a comprehensive evaluation that identifies a student's current knowledge level, strengths, and areas for improvement. It helps us create a personalized learning plan tailored to their specific needs.",
  },
  {
    question: "How does the AI tutoring system work?",
    answer: "Our AI tutor uses advanced GPT-4o technology to provide instant explanations, hints, and personalized guidance. It analyzes student responses, identifies misconceptions, and adapts its teaching approach to each student's learning style.",
  },
  {
    question: "What subjects and grade levels do you support?",
    answer: "Currently, we support Mathematics for Grades 7-12, including Algebra, Geometry, Functions, Trigonometry, and Calculus. We're expanding to Science and English Language Arts in the coming months.",
  },
  {
    question: "How often should students use the platform?",
    answer: "We recommend 20-30 minutes daily for optimal results. Consistent practice with our adaptive system leads to faster mastery and better long-term retention. The platform creates daily study plans to keep students on track.",
  },
  {
    question: "Can parents track their child's progress?",
    answer: "Absolutely! Parents get access to a dedicated dashboard showing their child's progress, mastery levels, completed assessments, study streaks, and AI-generated recommendations. You'll also receive weekly email summaries.",
  },
  {
    question: "What happens if my child struggles with a concept?",
    answer: "Our system automatically detects when a student is struggling and provides additional practice, simpler explanations, and targeted remediation. Teachers and parents are also notified so they can provide extra support.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a free Starter plan with daily practice sets, XP tracking, and basic progress dashboard. You can upgrade to our Pro plan anytime for full AI tutor access and advanced features.",
  },
  {
    question: "How do I book a diagnostic assessment?",
    answer: "Simply click the 'Book Diagnostic' button, select your preferred date and time, and fill in your details. You'll receive a confirmation email with assessment instructions and preparation tips.",
  },
] as const;

export const bookingTimeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
] as const;

export const successStories = [
  {
    name: "Sarah Ahmed",
    role: "Parent of Grade 9 Student",
    image: "👩‍👧",
    story: "My daughter's math grade improved from 62% to 89% in just 3 months. The AI tutor identified gaps we didn't even know existed, and the personalized learning plan made all the difference.",
    result: "27% grade improvement in 3 months",
  },
  {
    name: "Rahman Khan",
    role: "Grade 11 Student",
    image: "👨‍🎓",
    story: "I used to hate studying math, but the gamified approach made it fun. I've maintained a 45-day streak and finally understand quadratic equations thanks to the AI explanations.",
    result: "45-day study streak, mastered 23 concepts",
  },
  {
    name: "Pioneer Coaching Centre",
    role: "Educational Institution",
    image: "🏫",
    story: "We enrolled 120 students and saw a 40% improvement in test scores within one semester. The teacher dashboard helps us identify at-risk students early and intervene effectively.",
    result: "40% test score improvement across 120 students",
  },
  {
    name: "Fatima Noor",
    role: "Parent of Grade 7 Student",
    image: "👩‍👦",
    story: "The weekly progress reports are amazing. I can see exactly what my son is working on, where he's struggling, and how the AI is helping him improve. It's like having a personal tutor at home.",
    result: "Weekly insights, 85% mastery achievement",
  },
] as const;

export const programs = [
  {
    name: "Diagnostic Assessment",
    price: "Free",
    duration: "60 minutes",
    description: "Comprehensive evaluation of current knowledge level and learning gaps",
    features: [
      "Full subject assessment",
      "Detailed performance report",
      "Identified knowledge gaps",
      "Personalized learning recommendations",
      "Parent consultation session",
    ],
    featured: false,
    cta: "Book Now",
  },
  {
    name: "Individual Learning Plan",
    price: "$49/mo",
    duration: "Monthly subscription",
    description: "Personalized AI-powered learning program with full platform access",
    features: [
      "AI Tutor unlimited access",
      "Adaptive learning path",
      "Daily practice & assessments",
      "Smart revision scheduling",
      "Parent dashboard access",
      "Weekly progress reports",
      "Priority email support",
    ],
    featured: true,
    cta: "Start Learning",
  },
  {
    name: "School Partnership",
    price: "Custom Pricing",
    duration: "Annual contract",
    description: "Complete institutional solution with teacher tools and admin dashboard",
    features: [
      "Unlimited student access",
      "Teacher analytics dashboard",
      "Class management tools",
      "Bulk assessment creation",
      "Admin reporting suite",
      "Dedicated account manager",
      "Professional development training",
      "Priority phone & email support",
    ],
    featured: false,
    cta: "Request Demo",
  },
] as const;
