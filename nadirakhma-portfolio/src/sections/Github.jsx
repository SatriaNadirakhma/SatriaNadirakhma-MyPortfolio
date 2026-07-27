import { useMemo } from "react";
import { motion } from "motion/react";
import { Github as GithubIcon, ArrowRight } from "lucide-react";
import { useTheme } from "@context/ThemeContext";
import GithubCalendar from "@components/GithubCalendar";
import { SECTION_IDS } from "@constants/index";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Replace with your actual GitHub handle — used both for the calendar
// data fetch and the "View GitHub Profile" button below.
const GITHUB_USERNAME = "SatriaNadirakhma";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Github = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Same blue -> orange heat as the rest of the site (CTAs, hero backdrop,
  // loading-screen decode) instead of the calendar's default GitHub green,
  // so it reads as part of this design system rather than a bolted-on widget.
  const brandTheme = useMemo(
    () =>
      isDark
        ? {
            level0: "#111111",
            level1: "#1e3a8a",
            level2: "#2563eb",
            level3: "#93c5fd",
            level4: "#f97316",
          }
        : {
            level0: "#f3f4f6",
            level1: "#bfdbfe",
            level2: "#60a5fa",
            level3: "#3b82f6",
            level4: "#f97316",
          },
    [isDark]
  );

  return (
    <section
      id={SECTION_IDS.github}
      className="relative px-5 sm:px-8 py-24 sm:py-32 bg-[#fafafa] dark:bg-[#080808] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <span
              className="block text-xs tracking-[0.25em] uppercase mb-3 font-modern"
              style={{ color: isDark ? "rgba(147,197,253,0.6)" : "rgba(37,99,235,0.7)" }}
            >
              Open Source
            </span>
            <h2
              className={`font-modern font-bold leading-[0.95] ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
            >
              Code, most days.
            </h2>
          </div>

          <MagneticButton>
            <a
              href={`https://github.com/SatriaNadirakhma`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-blue-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              View GitHub Profile
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <GithubCalendar username={GITHUB_USERNAME} theme={brandTheme} cellShape="rounded" />
        </motion.div>
      </div>
    </section>
  );
};

export default Github;