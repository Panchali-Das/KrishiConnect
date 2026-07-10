import { Leaf, Bug, BarChart3, Cpu, CloudSun, Bot } from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Soil Analysis & Crop Recommendation",
    description:
      "Analyze NPK values and receive AI-powered crop and fertilizer recommendations.",
    icon: Leaf,
    route: "/soil-analysis",
    color: "bg-green-100",
  },

  {
    id: 2,
    title: "Disease Prediction & Prevention",
    description: "Upload crop images and identify diseases instantly using AI.",
    icon: Bug,
    route: "/disease-prediction",
    color: "bg-red-100",
  },

  {
    id: 3,
    title: "Smart Automation",
    description:
      "Automate irrigation and receive intelligent farming suggestions.",
    icon: Cpu,
    route: "/automation",
    color: "bg-blue-100",
  },

  {
    id: 4,
    title: "Live Analytics",
    description: "Monitor crop performance and farm health in real time.",
    icon: BarChart3,
    route: "/analytics",
    color: "bg-yellow-100",
  },

  {
    id: 5,
    title: "Weather Forecast",
    description:
      "Check weather conditions before planning your farming activities.",
    icon: CloudSun,
    route: "/weather",
    color: "bg-cyan-100",
  },

  {
    id: 6,
    title: "AI Farming Assistant",
    description: "Ask farming questions and get AI-powered guidance.",
    icon: Bot,
    route: "/assistant",
    color: "bg-purple-100",
  },
];
