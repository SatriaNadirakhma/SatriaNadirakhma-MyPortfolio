import { motion } from "motion/react";
import { useLenis } from "@context/LenisContext";
import { SECTION_IDS } from "@constants/index";
import PlusCorners from "@components/PlusCorners";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
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

const Hero = () => {
  const { lenis } = useLenis();

  const handleExploreClick = (e) => {
    e.preventDefault();
    lenis?.scrollTo(`#${SECTION_IDS.projects}`, { offset: -60, duration: 1.3 });
  };

  return (
    <section
      id={SECTION_IDS.hero}
      className="px-5 sm:px-8 pt-28 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl mx-auto w-full border border-gray-200 dark:border-white/[0.07] rounded-t-[4px] px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 flex flex-col justify-center min-h-[60vh] overflow-hidden"
      >
        <PlusCorners />
        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col"
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

          {/* LCP element — plain h1, no motion initial hidden, so it paints before JS hydrates */}
          <h1
            className="font-modern font-light text-gray-900 dark:text-white leading-[1.04] tracking-[-0.025em] max-w-5xl"
            style={{ fontSize: "clamp(44px, 6.5vw, 78px)" }}
          >
            Crafting{" "}
            <span className="font-modern italic font-semibold text-blue-600 dark:text-blue-400">
              interfaces
            </span>{" "}
            that work beautifully.
          </h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg sm:text-xl font-normal text-gray-600 dark:text-white/85 leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)]"
          >
            Bridging code and design into production.
            <br />
            Open for collaborations and freelance work.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
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
      </motion.div>
    </section>
  );
};

export default Hero;