// src/components/Hero.jsx
import { Element } from "react-scroll";
import Profile1 from "../assets/profile1.jpg";
import { ArrowRight, Download } from "lucide-react";
import cvATS from "../assets/pdf/cv-ats.pdf";

const Hero = () => {
  return (
    <Element name="hero">
      <section
        id="hero"
        className="relative min-h-screen flex items-end pb-16 sm:pb-20 md:pb-24 px-5 sm:px-8 pt-28 sm:pt-32 overflow-hidden"
      >
        {/* Ghost background text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span
            className="font-stylish italic text-white leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(80px, 22vw, 340px)", opacity: 0.030 }}
          >
            Portfolio
          </span>
        </div>

        {/* Subtle gradient accent */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 sm:gap-14 lg:gap-16 items-end">
            {/* LEFT: Editorial text */}
            <div>
              {/* Small label */}
              <div className="flex items-center gap-3 mb-8 sm:mb-10">
                <div className="w-6 h-px bg-blue-400/60" />
                <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/35">
                  Front-End Developer &amp; Graphic Designer
                </p>
              </div>

              {/* Big headline */}
              <h1
                className="font-stylish italic text-white leading-[0.92] mb-8 sm:mb-10"
                style={{ fontSize: "clamp(42px, 7vw, 112px)" }}
              >
                <span className="block">Crafting</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                    color: "transparent",
                  }}
                >
                  digital
                </span>
                <span className="block">experiences</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                    color: "transparent",
                  }}
                >
                  that speak.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base font-modern text-white/35 max-w-xs sm:max-w-sm leading-relaxed mb-10 sm:mb-12">
                Based in Malang, Indonesia — building user-centered digital
                solutions through code and design for forward-thinking teams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 border border-white/25 rounded-full font-modern text-xs sm:text-sm text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  View Work
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href={cvATS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 border border-white/10 rounded-full font-modern text-xs sm:text-sm text-white/40 hover:text-white hover:border-white/25 transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </a>
              </div>
            </div>

            {/* RIGHT: Profile photo — editorial */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Photo */}
                <div className="w-52 h-64 sm:w-64 sm:h-80 lg:w-72 lg:h-[360px] overflow-hidden rounded-2xl">
                  <img
                    src={Profile1}
                    alt="Satria Rakhmadani"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                    loading="lazy"
                  />
                </div>

                {/* Ghost border frame */}
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-white/10 rounded-2xl -z-10" />

                {/* Info tag */}
                <div className="absolute -bottom-5 left-4 sm:left-5 bg-[#0d0d0d] border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 shadow-2xl">
                  <p className="font-stylish italic text-white text-sm">
                    Satria Rakhmadani
                  </p>
                  <p className="text-[10px] font-modern text-white/35 mt-0.5 tracking-wide">
                    Malang, Indonesia
                  </p>
                </div>

                {/* Year badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0d0d0d] border border-white/10 flex items-center justify-center">
                  <span className="font-modern text-white/50 text-[9px] sm:text-[10px] tracking-wider leading-tight text-center">
                    N4D1
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-20">
            <div className="w-px h-10 bg-white animate-pulse-slow" />
            <span className="text-[9px] tracking-[0.3em] uppercase font-modern text-white">
              Scroll
            </span>
          </div>
        </div>

        <style>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        `}</style>
      </section>
    </Element>
  );
};

export default Hero;
