import { useTheme } from "@context/ThemeContext";
import Sticker from "@assets/sticker.png";
import { SECTION_IDS, STATS } from "@constants/index";
import Reveal from "@components/Reveal";
import ScrollHeading from "@components/ScrollHeading";

const About = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id={SECTION_IDS.about} className="py-20 sm:py-28 md:py-36 px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 lg:gap-20 items-start">

          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-20 sm:h-20 flex-shrink-0 hover:rotate-12 transition-transform duration-500">
              <img
                src={Sticker}
                alt="Decorative sticker"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="lg:mt-4">
              <p className="text-[10px] tracking-[0.25em] uppercase font-modern text-gray-400 dark:text-white/20 mb-1">
                Role
              </p>
              <p className="text-sm font-modern text-gray-600 dark:text-white/50">Front-End Developer</p>
              <p className="text-sm font-modern text-gray-600 dark:text-white/50">UI/UX &amp; Visual Designer</p>
            </div>
          </div>

          <div>
            <ScrollHeading
              className="font-modern font-bold leading-[1.0] mb-6 sm:mb-8 text-gray-900 dark:text-white"
              style={{ fontSize: "clamp(26px, 4vw, 60px)" }}
            >
              Building digital products{" "}
              <span
                style={{
                  color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
                  fontStyle: "italic",
                  textShadow: isDark
                    ? "-1px -1px 0 rgba(147,197,253,0.5), 1px -1px 0 rgba(147,197,253,0.5), -1px 1px 0 rgba(147,197,253,0.5), 1px 1px 0 rgba(147,197,253,0.5)"
                    : "-1px -1px 0 rgba(37,99,235,0.5), 1px -1px 0 rgba(37,99,235,0.5), -1px 1px 0 rgba(37,99,235,0.5), 1px 1px 0 rgba(37,99,235,0.5)",
                }}
              >
                end-to-end
              </span>
              {" "}— from{" "}
              <span
                style={{
                  color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
                  fontStyle: "italic",
                  textShadow: isDark
                    ? "-1px -1px 0 rgba(147,197,253,0.5), 1px -1px 0 rgba(147,197,253,0.5), -1px 1px 0 rgba(147,197,253,0.5), 1px 1px 0 rgba(147,197,253,0.5)"
                    : "-1px -1px 0 rgba(37,99,235,0.5), 1px -1px 0 rgba(37,99,235,0.5), -1px 1px 0 rgba(37,99,235,0.5), 1px 1px 0 rgba(37,99,235,0.5)",
                }}
              >
                wireframe
              </span>
              {" "}to production.
            </ScrollHeading>

            <p className="text-sm sm:text-base font-modern text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl mb-4">
              Front-End Developer and UI/UX &amp; Visual Designer with hands-on industry
              experience at <span className="text-gray-800 dark:text-white/60">PT. Petrokimia Gresik (BUMN)</span> and
              2+ years of design practice at <span className="text-gray-800 dark:text-white/60">Oranji Studio</span>.
            </p>
            <p className="text-sm sm:text-base font-modern text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl mb-4">
              I work across the full stack — React, Laravel, Inertia.js on the dev side;
              Figma, Inkscape, and brand identity on the design side. I bridge the gap
              between strong visual aesthetics and clean, functional code.
            </p>
            <p className="text-sm sm:text-base font-modern text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl mb-10">
              Finalist, UI/UX Competition at IT FEST Brawijaya University.
              1st Champion, Poster Mahasiswa at Entrepreneur Festival Politeknik Negeri Malang.
            </p>

            <div className="flex flex-wrap gap-8 sm:gap-12 pt-8 border-t border-gray-200 dark:border-white/[0.07]">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-modern font-bold text-gray-900 dark:text-white text-3xl sm:text-4xl leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-modern text-gray-500 dark:text-white/30">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div></Reveal>
    </section>
  );
};

export default About;