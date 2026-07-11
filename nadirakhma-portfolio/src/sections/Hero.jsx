import { Element, Link } from "react-scroll";
import { useMemo } from "react";
import { useTheme } from "@context/ThemeContext";
import Profile1 from "@assets/profile1.webp";
import { ArrowRight, Download, MapPin } from "lucide-react";
import cvATS from "@assets/pdf/cv-ats.pdf";
const PORTFOLIO_URL = "https://drive.google.com/file/d/1fLRntV4Js0ywnQDJTb23QXyGjaBlDult/view";
import { SECTION_IDS } from "@constants/index";

import { MagneticButton } from "@/components/ui/magnetic-button";

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const s = useMemo(() => ({
    eyebrowLine: { background: isDark ? "rgba(147,197,253,0.5)" : "rgba(59,130,246,0.5)" },
    eyebrowText: { color: isDark ? "rgba(147,197,253,0.6)" : "rgba(37,99,235,0.7)" },
    stroke: {
      color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
      fontStyle: "italic",
      textShadow: isDark
        ? "-1px -1px 0 rgba(147,197,253,0.5), 1px -1px 0 rgba(147,197,253,0.5), -1px 1px 0 rgba(147,197,253,0.5), 1px 1px 0 rgba(147,197,253,0.5)"
        : "-1px -1px 0 rgba(37,99,235,0.5), 1px -1px 0 rgba(37,99,235,0.5), -1px 1px 0 rgba(37,99,235,0.5), 1px 1px 0 rgba(37,99,235,0.5)",
    },
    divider: { background: isDark ? "rgba(147,197,253,0.2)" : "rgba(59,130,246,0.25)" },
    n4d1Badge: {
      backgroundColor: isDark ? "#080808" : "#fafafa",
      border: isDark ? "1px solid rgba(147,197,253,0.14)" : "1px solid rgba(59,130,246,0.14)",
    },
    n4d1Text: { color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)" },
  }), [isDark]);

  return (
    <Element name={SECTION_IDS.hero}>
      <section
        id={SECTION_IDS.hero}
        className="relative min-h-screen flex items-center px-5 sm:px-8 pt-20 pb-16 overflow-hidden bg-[#fafafa] dark:bg-[#080808] transition-colors duration-300"
      >
          <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

            {/* LEFT */}
            <div className="flex flex-col">

              {/* headline */}
              <h1
                className="font-modern font-bold leading-[0.93] mb-8 sm:mb-10"
                style={{ fontSize: "clamp(48px, 8.5vw, 96px)" }}
              >
                <span className={`block transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Crafting
                </span>
                <span
                  className="block transition-all duration-300"
                  style={s.stroke}
                >
                  interfaces
                </span>
                <span className={`block transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
                  that work
                </span>
                <span
                  className="block transition-all duration-300"
                  style={s.stroke}
                >
                  beautifully.
                </span>
              </h1>

              {/* divider */}
              <div
                className="w-64 h-px mb-8 sm:mb-10 transition-colors duration-300"
                style={s.divider}
              />

              {/* sub-headline */}
              <p
                className={`font-modern text-sm sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-md transition-colors duration-300 ${
                  isDark ? "text-white/38" : "text-gray-500"
                }`}
              >
                Based in Malang, Indonesia — bridging code and design
                into production.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <MagneticButton>
                  <Link
                    to={SECTION_IDS.projects}
                    smooth
                    duration={500}
                    offset={-60}
                    className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-blue-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Explore My Work
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href={PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-orange-500 to-orange-700 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-orange-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Design Portfolio
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href={cvATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-gray-100 to-gray-300 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-gray-800 ring-1 ring-black/10 ring-offset-1 ring-offset-gray-400 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download CV
                  </a>
                </MagneticButton>
              </div>

            </div>

            {/* RIGHT — profile card */}
            <div className="flex justify-center lg:justify-end lg:self-center">
              <div
                className="flex flex-col rounded-2xl border border-gray-200 dark:border-white/8 shadow-sm dark:shadow-none bg-white dark:bg-[#080808] w-full max-w-85 transition-colors duration-300 p-3"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <div className="w-full aspect-3/4 overflow-hidden">
                    <img
                      src={Profile1}
                      alt="Satria Rakhmadani"
                      width="340"
                      height="460"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
                    />
                  </div>

                  <div
                    className="absolute top-4 right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center backdrop-blur-md transition-colors duration-300"
                    style={s.n4d1Badge}
                  >
                    <span
                      className="font-modern text-[9px] sm:text-[10px] tracking-wider leading-tight text-center transition-colors duration-300"
                      style={s.n4d1Text}
                    >
                      N4D1
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 px-1 py-3 sm:py-4">
                  <p
                    className={`font-modern font-semibold leading-tight transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontSize: "clamp(20px, 3vw, 26px)" }}
                  >
                    Satria Rakhmadani
                  </p>

                  <span
                    className="inline-flex items-center self-start rounded-lg px-3 py-1.5 font-modern text-[11px] sm:text-[12px] font-medium tracking-wide transition-colors duration-300 border border-blue-400/20 dark:border-blue-400/15"
                    style={{
                      backgroundColor: isDark ? "rgba(147,197,253,0.12)" : "rgba(37,99,235,0.08)",
                      color: isDark ? "rgba(147,197,253,0.7)" : "rgba(37,99,235,0.7)",
                    }}
                  >
                    Digital Designer &amp; Front-End Developer
                  </span>

                  <span
                    className="inline-flex items-center gap-1.5 self-start rounded-lg px-3 py-1.5 font-modern text-[11px] sm:text-[12px] font-medium tracking-wide transition-colors duration-300 border border-gray-300/40 dark:border-white/10"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                      color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
                    }}
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    Malang, Indonesia
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-20 transition-colors duration-300`}>
          <div className={`w-px h-10 animate-pulse-line ${isDark ? "bg-white" : "bg-gray-900"}`} />
          <span className={`text-[9px] tracking-[0.3em] uppercase font-modern ${isDark ? "text-white" : "text-gray-900"}`}>
            Scroll
          </span>
        </div>
      </section>
    </Element>
  );
};

export default Hero;