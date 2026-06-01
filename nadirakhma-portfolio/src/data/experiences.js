import Kompen from "@assets/image/kompen.jpg";
import ITDEC from "@assets/image/itdecpeeps.jpeg";
import Oranji from "@assets/image/oranjiteam.jpg";
import Petrokimia from "@assets/image/petrokimia.jpg";

export const experiences = [
  {
    title: "Graphic Designer",
    company: "Oranji Studio",
    date: "May 2024 -- Present",
    description:
      "Designing digital assets such as social media content, promotional materials, and brand visuals based on client and team collaboration.",
    image: Oranji,
    icon: "building",
    link: "https://www.instagram.com/oranji.studio/",
    accent: "orange",
  },
  {
    title: "Creative Media Division\nProject Coordinator",
    company: "ITDEC Polinema",
    date: "Aug 2025 -- Present",
    description:
      "Establishing communication between Creative Media teams to determine ITDEC's branding image.",
    image: ITDEC,
    icon: "users",
    link: "https://www.instagram.com/itdecpolinema/",
    accent: "emerald",
  },
  {
    title: "Editor-in-Chief",
    company: "LPM Kompen Polinema",
    date: "Mar 2025 -- Mar 2026",
    description:
      "Lead the print and online media division managing journalistic activities: content planning, article editing, and publication design.",
    image: Kompen,
    icon: "users",
    link: "https://www.instagram.com/lpmkompen/",
    accent: "blue",
  },
  {
    title: "IT Intern",
    company: "PT. Petrokimia Gresik",
    date: "Jan 2026 -- Present",
    description:
      "Conducting research and development in the field of Information Technology to support the company's apps and user's needs.",
    image: Petrokimia,
    icon: "building",
    link: "https://www.instagram.com/petrokimiagresik_official/",
    accent: "blue",
  },
];

export const accentColors = {
  orange: "border-orange-500/30 bg-orange-500/5",
  emerald: "border-emerald-500/30 bg-emerald-500/5",
  blue: "border-blue-500/30 bg-blue-500/5",
};
