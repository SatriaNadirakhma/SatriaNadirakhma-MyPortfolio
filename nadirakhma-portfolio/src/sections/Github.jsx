import { useMemo } from "react";
import { Github as GithubIcon } from "lucide-react";
import { useTheme } from "@context/ThemeContext";
import GithubCalendar from "@components/GithubCalendar";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";

const GITHUB_USERNAME = "SatriaNadirakhma";

const Github = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Blue -> orange heat on the calendar, same pair as the site's accents,
  // so the widget reads as part of this system rather than a bolted-on one.
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
    <section id={SECTION_IDS.github} className="px-5 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12">
        <PlusCorners />
        <SectionHeader
          title="My GitHub contributions."
          description="A year of commits, read as a heat map — the quiet record of consistent building."
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-ghost self-start"
          >
            <GithubIcon className="w-4 h-4" />
            View GitHub profile
          </a>
        </SectionHeader>

        <GithubCalendar username={GITHUB_USERNAME} theme={brandTheme} cellShape="rounded" />
      </div></Reveal>
    </section>
  );
};

export default Github;
