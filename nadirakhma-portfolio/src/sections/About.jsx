import { SECTION_IDS, STATS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";
import Profile1 from "@assets/profile1.webp";
import { MapPin } from "lucide-react";
import { AsciiArt } from "@/components/ui/ascii-art";
import { useTheme } from "@context/ThemeContext";

const About = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <section id={SECTION_IDS.about} className="px-5 sm:px-8 border-b border-gray-300 dark:border-white/[0.14]">
      <Reveal>
        <div className="relative max-w-7xl mx-auto border-x border-gray-300 dark:border-white/[0.14]">
          <PlusCorners />

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-[auto_auto] gap-0">
            {/* Title - row 1, col 1 di desktop; urutan pertama di HP */}
            <div className="order-1 lg:col-start-1 lg:row-start-1 p-6 sm:p-8 lg:p-12">
              <SectionHeader
                title={
                  <>
                    Building digital products,{" "}
                    <span className="font-modern italic font-semibold text-blue-600 dark:text-blue-400">end-to-end.</span>
                  </>
                }
              />
            </div>

            {/* Foto + identitas - col 2, span 2 baris (full height) di desktop; urutan kedua di HP */}
            <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 border-b lg:border-b-0 lg:border-l border-gray-300 dark:border-white/[0.07] flex flex-col sm:flex-row lg:flex-col bg-white dark:bg-[#080808] min-h-[420px] lg:min-h-full">
              <div className={`relative overflow-hidden flex-1 min-h-[240px] sm:min-h-full lg:min-h-[240px] ${isDark ? "bg-neutral-950" : "bg-white"}`}>
                <AsciiArt
                  src={Profile1}
                  resolution={90}
                  color={isDark ? "var(--color-neutral-400)" : "var(--color-neutral-700)"}
                  animationStyle="fade"
                  animationDuration={1.2}
                  animateOnView={false}
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className="grid grid-rows-3 divide-y divide-gray-300 dark:divide-white/[0.07] border-t sm:border-t-0 sm:border-l lg:border-l-0 lg:border-t border-gray-300 dark:border-white/[0.07] sm:flex-1 lg:flex-none">
                <div className="p-4 sm:p-5 flex items-center justify-center text-center bg-white dark:bg-white/[0.02]">
                  <p className="font-modern font-semibold text-gray-900 dark:text-white text-sm sm:text-base leading-tight">
                    Satria Rakhmadani
                  </p>
                </div>
                <div className="p-4 sm:p-5 flex items-center justify-center text-center bg-white dark:bg-white/[0.02]">
                  <p className="text-xs sm:text-sm font-normal text-gray-600 dark:text-white/60 leading-snug text-center">
                    Digital Designer &amp; Front-End Developer
                  </p>
                </div>
                <div className="p-4 sm:p-5 flex items-center justify-center gap-1.5 text-center bg-white dark:bg-white/[0.02]">
                  <MapPin aria-hidden="true" focusable="false" className="w-3.5 h-3.5 shrink-0 text-gray-500 dark:text-white/40" />
                  <span className="text-xs sm:text-sm font-normal text-gray-600 dark:text-white/60">Malang, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Deskripsi - row 2, col 1 di desktop; urutan ketiga di HP */}
            <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 p-6 sm:p-8 lg:p-12 flex flex-col gap-5">
              <p className="text-base sm:text-lg font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
                Front-End Developer and UI/UX &amp; Visual Designer with hands-on industry
                experience at <span className="text-gray-900 dark:text-white">PT. Petrokimia Gresik (BUMN)</span> and
                2+ years of design practice at <span className="text-gray-900 dark:text-white">Oranji Studio</span>.
              </p>
              <p className="text-base sm:text-lg font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
                I work across the full stack. React, Laravel, Inertia.js on the dev side;
                Figma, Inkscape, Affinity by Canva, and brand identity on the design side. I bridge the gap
                between strong visual aesthetics and clean, functional code.
              </p>
              <p className="text-base sm:text-lg font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
                Finalist of UI/UX Competition at IT FEST Brawijaya University.
                1st Champion of Poster Mahasiswa at Entrepreneur Festival Politeknik Negeri Malang.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-300 dark:border-white/[0.07] divide-y sm:divide-y-0 sm:divide-x divide-gray-300 dark:divide-white/[0.07]">
            {STATS.map((stat) => (
              <div key={stat.label} className="p-6 sm:p-8 text-center bg-white dark:bg-white/[0.02]">
                <p className="font-modern font-light text-gray-900 dark:text-white text-4xl sm:text-5xl leading-none mb-2.5 tabular-nums">
                  {stat.value}
                </p>
                <p className="section-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default About;