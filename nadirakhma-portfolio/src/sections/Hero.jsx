import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import { useAppReady } from "@context/AppReadyContext";
import Profile1 from "@assets/profile1.webp";
// New — add these two files to @assets/ (or rename to match whatever
// filenames you actually use). Same photo session or not, doesn't matter;
// the stack looks best with one clear "front" portrait plus two candids.
import Profile2 from "@assets/profile2.webp";
import Profile3 from "@assets/profile3.webp";
import { ArrowRight, Download, MapPin } from "lucide-react";
import cvATS from "@assets/pdf/cv-ats.pdf";
const PORTFOLIO_URL = "https://drive.google.com/file/d/1fLRntV4Js0ywnQDJTb23QXyGjaBlDult/view";
import { SECTION_IDS } from "@constants/index";

import { MagneticButton } from "@/components/ui/magnetic-button";

const HEADLINE = [
  { text: "Crafting", stroke: false },
  { text: "interfaces", stroke: true },
  { text: "that work", stroke: false },
  { text: "beautifully.", stroke: true },
];

const PHOTOS = [
  { src: Profile1, alt: "Satria Rakhmadani, portrait" },
  { src: Profile2, alt: "Satria Rakhmadani, at work" },
  { src: Profile3, alt: "Satria Rakhmadani, candid" },
];

// Resting positions for the 3-photo stack, front to back. Index 0 is
// always the focused/front card; clicking any card moves it here and
// bumps the rest back a slot — a small "shuffle the photo pile" gesture
// instead of a static single portrait.
const SLOTS = [
  { x: 0, y: 0, rotate: 0, scale: 1, z: 40, shadow: "0 24px 48px -16px rgba(0,0,0,0.28)" },
  { x: 28, y: 20, rotate: 7, scale: 0.96, z: 30, shadow: "0 14px 30px -14px rgba(0,0,0,0.22)" },
  { x: -26, y: 32, rotate: -8, scale: 0.93, z: 20, shadow: "0 10px 22px -12px rgba(0,0,0,0.18)" },
];

const AUTO_CYCLE_MS = 1500;

const STACK_W = 280;
const STACK_H = 352;
const CARD_W = 208;
const CARD_H = 277;
const CARD_LEFT = (STACK_W - CARD_W) / 2;
const CARD_TOP = (STACK_H - CARD_H) / 2;

// Orchestration: parents carry stagger timing, leaf nodes just declare
// `variants` and inherit "hidden"/"show" from the nearest ancestor that
// sets `animate` — that's what lets the headline's own per-line stagger
// nest inside the left column's broader stagger below.
const columnVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};
const headlineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const lineVariants = {
  hidden: { y: "115%", rotate: 3 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const ctaRowVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
};

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const { lenis } = useLenis();
  const isReady = useAppReady();
  const isDark = resolvedTheme === "dark";
  const sectionRef = useRef(null);
  const stackRef = useRef(null);

  const [order, setOrder] = useState([0, 1, 2]);
  // Bumped on every manual click so the auto-cycle effect below restarts
  // its timer — picking a photo shouldn't get overridden a moment later.
  const [cycleKey, setCycleKey] = useState(0);
  // First reveal uses a choreographed stagger; every reorder after that
  // (auto-cycle or click) uses a snappy spring instead, so nothing feels
  // delayed once the hero has settled in.
  const [entered, setEntered] = useState(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (!isReady) return;
    const t = setTimeout(() => setEntered(true), 1300);
    return () => clearTimeout(t);
  }, [isReady]);

  const handleCardClick = (i) => {
    setOrder((prev) => (prev[0] === i ? prev : [i, ...prev.filter((idx) => idx !== i)]));
    setCycleKey((k) => k + 1);
  };

  // Auto-advance through the stack — front card retires to the back,
  // the next one steps up — so all 3 photos get their turn without
  // needing a click. Pauses while the cursor is over the stack, and
  // restarts fresh after any manual pick via `cycleKey`.
  useEffect(() => {
    if (!isReady) return;
    const id = setInterval(() => {
      if (hoveredRef.current) return;
      setOrder((prev) => [prev[1], prev[2], prev[0]]);
    }, AUTO_CYCLE_MS);
    return () => clearInterval(id);
  }, [isReady, cycleKey]);

  // Subtle depth on the profile stack as the hero scrolls out of view —
  // driven by real scroll position (smoothed by Lenis), not a CSS trick.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // Cursor-reactive tilt on the stack itself — independent of the
  // scroll-driven tilt above, composed on a nested layer so both apply.
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const springRotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

  const handlePointerMove = (e) => {
    hoveredRef.current = true;
    const rect = stackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * 14);
    rawRotateX.set(-py * 14);
  };
  const handlePointerLeave = () => {
    hoveredRef.current = false;
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  // react-scroll's <Link smooth> fights Lenis (both try to own the wheel/
  // scrollTo behavior), so the "Explore My Work" CTA now hands off to the
  // same Lenis instance driving the rest of the page.
  const handleExploreClick = (e) => {
    e.preventDefault();
    lenis?.scrollTo(`#${SECTION_IDS.projects}`, { offset: -60, duration: 1.3 });
  };

  const s = useMemo(() => ({
    stroke: {
      color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
      fontStyle: "italic",
      WebkitTextStroke: isDark
        ? "1px rgba(147,197,253,0.5)"
        : "1px rgba(37,99,235,0.5)",
    },
    divider: { background: isDark ? "rgba(147,197,253,0.2)" : "rgba(59,130,246,0.25)" },
    n4d1Badge: {
      backgroundColor: isDark ? "#080808" : "#fafafa",
      border: isDark ? "1px solid rgba(147,197,253,0.14)" : "1px solid rgba(59,130,246,0.14)",
    },
    n4d1Text: { color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)" },
  }), [isDark]);

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      className="relative min-h-screen flex items-center px-5 sm:px-8 pt-20 pb-16 overflow-hidden bg-[#fafafa] dark:bg-[#080808] transition-colors duration-300"
    >
        {/* Vercel-hero-style backdrop: a radial gradient anchored to the
            bottom-left corner, masked so it fades out toward the top of
            the section instead of sitting as a flat colored block.
            A slow breathing scale/opacity keeps it from reading as a
            static background image — same blue/orange pair as the CTAs,
            progress bar, and stack shadows, so it's this site's palette
            rather than a borrowed one. */}
        <motion.div
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "radial-gradient(80% 100% at 0% 100%, #f97316 50%, #3b82f6 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 60%)",
            maskImage: "linear-gradient(to top, black 0%, transparent 60%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
          animate={{
            opacity: isDark ? [0.7, 0.85, 0.7] : [0.35, 0.45, 0.35],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundImage: isDark
              ? "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 75%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            animate={isReady ? "show" : "hidden"}
            className="flex flex-col"
          >

            {/* headline — each line sits in its own clipped box so it can
                slide up from below on reveal instead of a flat fade */}
            <motion.h1
              variants={headlineVariants}
              className="font-modern font-bold leading-[0.93] mb-8 sm:mb-10"
              style={{ fontSize: "clamp(48px, 8.5vw, 96px)" }}
            >
              {HEADLINE.map((line) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    variants={lineVariants}
                    className={`block transition-colors duration-300 ${
                      line.stroke ? "" : isDark ? "text-white" : "text-gray-900"
                    }`}
                    style={line.stroke ? s.stroke : undefined}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* divider */}
            <motion.div
              variants={itemVariants}
              className="w-64 h-px mb-8 sm:mb-10 transition-colors duration-300"
              style={s.divider}
            />

            {/* sub-headline */}
            <motion.p
              variants={itemVariants}
              className={`font-modern text-sm sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-md transition-colors duration-300 ${
                isDark ? "text-white/38" : "text-gray-500"
              }`}
            >
            Bridging code and design into production. 
            <br />
            Open for collaborations and freelance work.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={ctaRowVariants} className="flex flex-wrap gap-3 sm:gap-4">
              <motion.div variants={itemVariants}>
                <MagneticButton>
                  <a
                    href={`#${SECTION_IDS.projects}`}
                    onClick={handleExploreClick}
                    data-cursor="scroll"
                    className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-blue-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Explore My Work
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </MagneticButton>
              </motion.div>

              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div variants={itemVariants}>
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
              </motion.div>
            </motion.div>

          </motion.div>

          {/* RIGHT — three-photo stack */}
          <motion.div
            style={{ y: cardY, opacity: cardOpacity, perspective: 1200 }}
            className="flex flex-col items-center lg:items-end gap-6 lg:self-center"
          >
            <motion.div style={{ rotateX: cardRotateX, scale: cardScale, transformStyle: "preserve-3d" }}>
              <div
                ref={stackRef}
                onMouseMove={handlePointerMove}
                onMouseLeave={handlePointerLeave}
                className="relative"
                style={{ width: STACK_W, height: STACK_H, perspective: 1000 }}
              >
                <motion.div
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {PHOTOS.map((photo, i) => {
                    const slot = SLOTS[order.indexOf(i)];
                    const isFront = order[0] === i;
                    return (
                      <motion.button
                        key={photo.src}
                        type="button"
                        onClick={() => handleCardClick(i)}
                        aria-label={`Bring ${photo.alt} to front`}
                        aria-pressed={isFront}
                        className="absolute rounded-2xl border border-gray-200 dark:border-white/8 bg-white dark:bg-[#080808] p-2 cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        style={{
                          left: CARD_LEFT,
                          top: CARD_TOP,
                          width: CARD_W,
                          zIndex: slot.z,
                          transformStyle: "preserve-3d",
                          boxShadow: isDark ? "none" : slot.shadow,
                        }}
                        initial={{ opacity: 0, y: 70, rotate: i % 2 === 0 ? -16 : 16, scale: 0.82 }}
                        animate={
                          isReady
                            ? { opacity: 1, x: slot.x, y: slot.y, rotate: slot.rotate, scale: slot.scale }
                            : { opacity: 0, y: 70, rotate: i % 2 === 0 ? -16 : 16, scale: 0.82 }
                        }
                        transition={
                          entered
                            ? { type: "spring", stiffness: 260, damping: 24 }
                            : { duration: 0.85, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }
                        }
                        whileHover={!isFront ? { scale: slot.scale + 0.025 } : {}}
                      >
                        <div className="relative rounded-xl overflow-hidden">
                          <div className="overflow-hidden" style={{ width: CARD_W - 16, height: CARD_H - 16 }}>
                            <img
                              src={photo.src}
                              alt={photo.alt}
                              width="340"
                              height="460"
                              loading={i === 0 ? "eager" : "lazy"}
                              fetchPriority={i === 0 ? "high" : "auto"}
                              decoding="async"
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
                            />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* N4D1 mark — pinned to the pile itself, not any one photo */}
                  <div
                    className="absolute w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center backdrop-blur-md transition-colors duration-300"
                    style={{ top: -12, right: -8, zIndex: 50, ...s.n4d1Badge }}
                  >
                    <span
                      className="font-modern text-[9px] sm:text-[10px] tracking-wider leading-tight text-center transition-colors duration-300"
                      style={s.n4d1Text}
                    >
                      N4D1
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* identity block — lives once below the stack instead of
                repeating on every card */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isReady ? "show" : "hidden"}
              className="flex flex-col gap-2 items-center lg:items-end text-center lg:text-right"
              style={{ width: STACK_W }}
            >
              <p
                className={`font-modern font-semibold leading-tight transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
                style={{ fontSize: "clamp(20px, 3vw, 26px)" }}
              >
                Satria Rakhmadani
              </p>

              <span
                className="inline-flex items-center self-center lg:self-end rounded-lg px-3 py-1.5 font-modern text-[11px] sm:text-[12px] font-medium tracking-wide transition-colors duration-300 border border-blue-400/20 dark:border-blue-400/15"
                style={{
                  backgroundColor: isDark ? "rgba(147,197,253,0.12)" : "rgba(37,99,235,0.08)",
                  color: isDark ? "rgba(147,197,253,0.7)" : "rgba(37,99,235,0.7)",
                }}
              >
                Digital Designer &amp; Front-End Developer
              </span>

              <span
                className="inline-flex items-center gap-1.5 self-center lg:self-end rounded-lg px-3 py-1.5 font-modern text-[11px] sm:text-[12px] font-medium tracking-wide transition-colors duration-300 border border-gray-300/40 dark:border-white/10"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
                }}
              >
                <MapPin className="w-3 h-3 shrink-0" />
                Malang, Indonesia
              </span>
            </motion.div>
          </motion.div>

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
  );
};

export default Hero;