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
      WebkitTextStroke: isDark ? "1.5px rgba(147,197,253,0.65)" : "1.5px rgba(37,99,235,0.6)",
      color: "transparent",
    },
    divider: { background: isDark ? "rgba(147,197,253,0.2)" : "rgba(59,130,246,0.25)" },
    photoShadow: {
      boxShadow: isDark
        ? "0 0 0 1px rgba(147,197,253,0.1), 0 0 60px rgba(59,130,246,0.12)"
        : "0 0 0 1px rgba(59,130,246,0.08), 0 0 60px rgba(59,130,246,0.06)",
    },
    offsetBorder: { border: isDark ? "1px solid rgba(147,197,253,0.1)" : "1px solid rgba(59,130,246,0.1)" },
    nameBadge: {
      backgroundColor: isDark ? "#0d1526" : "#ffffff",
      border: isDark ? "1px solid rgba(147,197,253,0.18)" : "1px solid rgba(59,130,246,0.18)",
    },
    roleText: { color: isDark ? "rgba(147,197,253,0.55)" : "rgba(37,99,235,0.6)" },
    mapPin: { color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.35)" },
    location: { color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.45)" },
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

              {/* eyebrow */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div
                  className="h-px w-8 transition-colors duration-300"
                  style={s.eyebrowLine}
                />
                <p
                  className="font-modern uppercase tracking-[0.28em] text-[10px] sm:text-[11px] transition-colors duration-300"
                  style={s.eyebrowText}
                >
                  Digital Designer &amp; Front-End Developer
                </p>
              </div>

              {/* headline */}
              <h1
                className="font-modern font-bold leading-[0.93] mb-8 sm:mb-10"
                style={{ fontSize: "clamp(52px, 8.5vw, 128px)" }}
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
                className="w-16 h-px mb-8 sm:mb-10 transition-colors duration-300"
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

            {/* RIGHT — photo */}
            <div className="flex justify-center lg:justify-end lg:self-center">
              <div className="relative">

                {/* outer glow ring */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
                  style={s.photoShadow}
                />

                {/* photo */}
                <div className="w-56 h-72 sm:w-64 sm:h-80 lg:w-80 lg:h-[420px] overflow-hidden rounded-2xl">
                  <img
                    src={Profile1}
                    alt="Satria Rakhmadani — Front-End Developer &amp; UI/UX Designer"
                    width="320"
                    height="420"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
                  />
                </div>

                {/* offset border frame */}
                <div
                  className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10 transition-colors duration-300"
                  style={s.offsetBorder}
                />

                {/* ── NAME BADGE ── */}
                <div
                  className="absolute -bottom-6 left-3 sm:left-4 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-2xl transition-all duration-300"
                  style={{ ...s.nameBadge, backdropFilter: "blur(12px)", minWidth: "180px" }}
                >
                  {/* name */}
                  <p
                    className={`font-stylish italic leading-tight transition-colors duration-300 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontSize: "clamp(19px, 3vw, 24px)" }}
                  >
                    Satria Rakhmadani
                  </p>

                  {/* role */}
                  <p
                    className="font-modern mt-1 transition-colors duration-300"
                    style={{ ...s.roleText, fontSize: "10px", letterSpacing: "0.05em" }}
                  >
                    Front-End Dev &amp; UI/UX Designer
                  </p>

                  {/* location row */}
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin
                      className="w-2.5 h-2.5 flex-shrink-0 transition-colors duration-300"
                      style={s.mapPin}
                    />
                    <p
                      className="font-modern transition-colors duration-300"
                      style={{ ...s.location, fontSize: "9px", letterSpacing: "0.05em" }}
                    >
                      Malang, Indonesia
                    </p>
                  </div>
                </div>

                {/* N4D1 badge — top right */}
                <div
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
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