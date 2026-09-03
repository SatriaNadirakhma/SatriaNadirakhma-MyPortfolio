import { lazy, Suspense, useRef } from "react";
import { motion } from "motion/react";
import { useLenis } from "@context/LenisContext";
import { SECTION_IDS } from "@constants/index";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import AsciiTextSweep from "@components/AsciiTextSweep";

const Logo3D = lazy(() => import("@components/Logo3D"));
import cvATS from "@assets/pdf/cv-ats.pdf";

const PORTFOLIO_URL = "https://drive.google.com/file/d/1fLRntV4Js0ywnQDJTb23QXyGjaBlDult/view";

// Single choreographed entrance: the whole hero arrives as one quiet
// gesture — status line, headline, subhead, CTAs — each fading up 80ms
// after the last. No loops, no parallax; this is the page's only motion.
const columnVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const INTERFACES_DELAY_MS = 2000;

/**
 * `startIntro` gates every entrance animation in this section. Hero is
 * mounted from first paint (App.jsx only toggles `visibility` while the
 * loader is up), so without this gate the whole entrance would already
 * be finished by the time the loader swipes away and the section
 * becomes visible. `startIntro` flips true the instant loading
 * completes, so the reveal plays live underneath the loader's swipe-up
 * exit instead of having already happened off-screen.
 */
const Hero = ({ startIntro = false }) => {
  const { lenis } = useLenis();
  const sweepRef = useRef(null);
  const introHandledRef = useRef(false);
  const armedForHoverRef = useRef(false);
  const introTimeoutRef = useRef(null);

  const handleExploreClick = (e) => {
    e.preventDefault();
    lenis?.scrollTo(`#${SECTION_IDS.projects}`, { offset: -60, duration: 1.3 });
  };

  // Fires once, when the last staggered child (the CTA row) finishes
  // entering. After a 2s pause, auto-plays the ascii sweep twice, then
  // arms the word for hover-replay.
  const handleIntroComplete = () => {
    if (introHandledRef.current) return;
    introHandledRef.current = true;
    introTimeoutRef.current = setTimeout(() => {
      sweepRef.current?.play(2);
    }, INTERFACES_DELAY_MS);
  };

  const handleSweepSequenceEnd = () => {
    armedForHoverRef.current = true;
  };

  const handleInterfacesEnter = () => {
    if (!armedForHoverRef.current) return;
    if (sweepRef.current?.isPlaying()) return;
    armedForHoverRef.current = false;
    sweepRef.current?.play(2);
  };

  const handleInterfacesLeave = () => {
    // Re-arm on leave — next hover starts a fresh 2x sequence, even if
    // the previous one is still mid-flight.
    armedForHoverRef.current = true;
  };

  return (
    <section
      id={SECTION_IDS.hero}
      className="px-5 sm:px-8 pt-28 transition-colors duration-300 border-b border-gray-300 dark:border-white/[0.14]"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={startIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl mx-auto w-full border-x border-t border-gray-300 dark:border-white/[0.14] rounded-t-[4px] px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14 min-h-[60vh] overflow-hidden"
      >
        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate={startIntro ? "show" : "hidden"}
          className="relative z-10 flex flex-col flex-1 min-w-0"
        >
          {/* Availability line — a ledger-style status entry, not a badge:
              the site's one live signal, and its one ambient animation. */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-blue-600 dark:bg-blue-400" />
            </span>
            <span className="section-label">
              Open for work and collaborations!
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-modern font-light text-gray-900 dark:text-white leading-[1.04] tracking-[-0.025em] max-w-5xl"
            style={{ fontSize: "clamp(44px, 6.5vw, 78px)" }}
          >
            Crafting{" "}
            <AsciiTextSweep
              ref={sweepRef}
              text="interfaces"
              className="font-modern italic font-semibold text-blue-600 dark:text-blue-400 cursor-default"
              onSequenceEnd={handleSweepSequenceEnd}
              onMouseEnter={handleInterfacesEnter}
              onMouseLeave={handleInterfacesLeave}
            />{" "}
            that work beautifully.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg sm:text-xl font-normal text-gray-600 dark:text-white/85 leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)]"
          >
            Bridging code and design into production.
            <br />
            Open for collaborations and freelance work.
          </motion.p>

          <motion.div
            variants={itemVariants}
            onAnimationComplete={handleIntroComplete}
            className="mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
          >
            <a
              href={`#${SECTION_IDS.projects}`}
              onClick={handleExploreClick}
              className="btn-base btn-primary w-full sm:w-auto justify-center"
            >
              Explore my work
              <ArrowRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
            </a>

            <a
              href={cvATS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-ghost w-full sm:w-auto justify-center"
            >
              Download CV
              <Download aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
            </a>

            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-ghost w-full sm:w-auto justify-center"
            >
              Design portfolio
              <ExternalLink aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — 1:1 box housing the extruded, theme-aware 3D mark.
            Order-first on mobile so it doesn't get buried below the CTAs. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={startIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 order-first lg:order-none w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[380px] mx-auto lg:mx-0 shrink-0"
        >
          <Suspense fallback={<div className="w-full aspect-square bg-gray-100 dark:bg-white/[0.02] rounded-[4px] animate-pulse" />}>
            <Logo3D />
          </Suspense>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;