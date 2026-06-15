import { Element } from "react-scroll";
import Profile1 from "@assets/profile1.webp";
import { ArrowRight, Download, MapPin } from "lucide-react";
import cvATS from "@assets/pdf/cv-ats.pdf";
import { SECTION_IDS } from "@constants/index";

const Hero = () => {
  return (
    <Element name={SECTION_IDS.hero}>
      <section
        id={SECTION_IDS.hero}
        className="relative min-h-screen flex items-center px-5 sm:px-8 pt-20 pb-16 overflow-hidden"
        style={{ backgroundColor: "#080808" }}
      >
        {/* ── dot grid pattern ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* ── radial vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, #080808 100%)",
          }}
        />

        {/* ── horizontal line top ── */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.15) 30%, rgba(147,197,253,0.3) 50%, rgba(147,197,253,0.15) 70%, transparent 100%)",
          }}
        />

        {/* ── horizontal line bottom ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.08) 40%, rgba(147,197,253,0.15) 50%, rgba(147,197,253,0.08) 60%, transparent 100%)",
          }}
        />

        {/* ── glow top-right ── */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* ── glow bottom-left ── */}
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* ── vertical rule left ── */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(147,197,253,0.08) 30%, rgba(147,197,253,0.15) 50%, rgba(147,197,253,0.08) 70%, transparent 100%)",
            marginLeft: "clamp(40px, 5vw, 80px)",
          }}
        />

        {/* ── main content ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

            {/* LEFT */}
            <div className="flex flex-col">

              {/* eyebrow */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-px w-8" style={{ background: "rgba(147,197,253,0.5)" }} />
                <p
                  className="font-modern uppercase tracking-[0.28em] text-[10px] sm:text-[11px]"
                  style={{ color: "rgba(147,197,253,0.6)" }}
                >
                  Front-End Developer &amp; UI/UX Designer
                </p>
              </div>

              {/* headline */}
              <h1
                className="font-modern font-bold leading-[0.93] mb-8 sm:mb-10"
                style={{ fontSize: "clamp(52px, 8.5vw, 128px)" }}
              >
                <span className="block text-white">Crafting</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: "1.5px rgba(147,197,253,0.65)",
                    color: "transparent",
                  }}
                >
                  interfaces
                </span>
                <span className="block text-white">that work</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: "1.5px rgba(147,197,253,0.65)",
                    color: "transparent",
                  }}
                >
                  beautifully.
                </span>
              </h1>

              {/* divider */}
              <div className="w-16 h-px mb-8 sm:mb-10" style={{ background: "rgba(147,197,253,0.2)" }} />

              {/* sub-headline */}
              <p
                className="font-modern text-sm sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-md"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Based in Malang, Indonesia — bridging code and design
                into production.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href={`#${SECTION_IDS.projects}`}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-modern text-xs sm:text-sm transition-all duration-300"
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(147,197,253,0.3)",
                    color: "rgba(147,197,253,0.9)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(59,130,246,1)";
                    e.currentTarget.style.borderColor = "rgba(59,130,246,1)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(59,130,246,0.15)";
                    e.currentTarget.style.borderColor = "rgba(147,197,253,0.3)";
                    e.currentTarget.style.color = "rgba(147,197,253,0.9)";
                  }}
                >
                  Explore My Work
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                <a
                  href={`#${SECTION_IDS.projects}`}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-modern text-xs sm:text-sm transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  Design Portfolio
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                <a
                  href={cvATS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-modern text-xs sm:text-sm transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.28)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.28)";
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </a>
              </div>
            </div>

            {/* RIGHT — photo */}
            <div className="flex justify-center lg:justify-end lg:self-center">
              <div className="relative">

                {/* outer glow ring */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: "0 0 0 1px rgba(147,197,253,0.1), 0 0 60px rgba(59,130,246,0.12)",
                  }}
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
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                  />
                </div>

                {/* offset border frame */}
                <div
                  className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10"
                  style={{ border: "1px solid rgba(147,197,253,0.1)" }}
                />

                {/* ── NAME BADGE — redesigned, more prominent ── */}
                <div
                  className="absolute -bottom-6 left-3 sm:left-4 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-2xl"
                  style={{
                    backgroundColor: "#0d1526",
                    border: "1px solid rgba(147,197,253,0.18)",
                    backdropFilter: "blur(12px)",
                    minWidth: "180px",
                  }}
                >
                  {/* name — large and prominent */}
                  <p
                    className="font-stylish italic text-white leading-tight"
                    style={{ fontSize: "clamp(19px, 3vw, 24px)" }}
                  >
                    Satria Rakhmadani
                  </p>

                  {/* role */}
                  <p
                    className="font-modern mt-1"
                    style={{
                      fontSize: "10px",
                      color: "rgba(147,197,253,0.55)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Front-End Dev &amp; UI/UX Designer
                  </p>

                  {/* location row */}
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin
                      className="w-2.5 h-2.5 flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    />
                    <p
                      className="font-modern"
                      style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}
                    >
                      Malang, Indonesia
                    </p>
                  </div>
                </div>

                {/* N4D1 badge — top right, unchanged */}
                <div
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#080808",
                    border: "1px solid rgba(147,197,253,0.14)",
                  }}
                >
                  <span
                    className="font-modern text-[9px] sm:text-[10px] tracking-wider leading-tight text-center"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    N4D1
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-20">
          <div className="w-px h-10 bg-white animate-pulse-slow" />
          <span className="text-[9px] tracking-[0.3em] uppercase font-modern text-white">
            Scroll
          </span>
        </div>

        <style>{`
          @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
          .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        `}</style>
      </section>
    </Element>
  );
};

export default Hero;