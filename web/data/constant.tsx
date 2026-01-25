import { themeToCssVars } from "./Themes";

export const suggestions = [
  {
    icon: "✈️",
    name: "Travel Planner App",
    description:
      "Plan trips with interactive maps, itineraries, budgets, and smart recommendations.",
  },
  {
    icon: "🎓",
    name: "AI Learning Platform",
    description:
      "Gamified learning experience with progress tracking, quizzes, and personalized paths.",
  },
  {
    icon: "💰",
    name: "Finance Tracker",
    description:
      "Track expenses, visualize spending with charts, and manage monthly budgets.",
  },
  {
    icon: "🛍️",
    name: "E-Commerce Dashboard",
    description:
      "Admin dashboard to manage products, orders, analytics, and customer insights.",
  },
  {
    icon: "🏋️",
    name: "Fitness Companion",
    description:
      "Workout plans, calorie tracking, progress analytics, and habit streaks.",
  },
  {
    icon: "📅",
    name: "Task & Habit Manager",
    description:
      "Organize tasks, build habits, set reminders, and track daily productivity.",
  },
  {
    icon: "🎨",
    name: "AI Image Generator",
    description:
      "Upload images and transform them into different artistic and cinematic styles.",
  },
  {
    icon: "📊",
    name: "Analytics Platform",
    description:
      "Visualize data with real-time charts, KPIs, and downloadable reports.",
  },
  {
    icon: "💬",
    name: "Customer Support Chat",
    description:
      "AI-powered chat system with ticket management and conversation history.",
  },
  {
    icon: "🧠",
    name: "Mental Wellness App",
    description:
      "Guided meditations, mood tracking, journaling, and calming exercises.",
  },
];

export const HtmlWrapper = (theme: any, htmlCode: string) => {
  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Google Font -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">


<!-- Tailwind + Iconify -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
  <style >
    ${themeToCssVars(theme)}
  </style>
</head>
<body class="bg-[var(--background)] text-[var(--foreground)] w-full">
  ${htmlCode ?? ""}
</body>
</html>
`;
};
