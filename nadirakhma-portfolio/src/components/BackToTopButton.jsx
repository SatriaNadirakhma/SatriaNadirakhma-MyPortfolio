import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLenis } from "@context/LenisContext";

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Back-to-top button, upgraded from a plain circle-with-arrow into three
 * things that all read off state the app already tracks:
 *
 *   1. Progress ring — traces the same `progress` motion value (0 → 1)
 *      that drives the top scroll bar (see App.jsx's <ScrollProgress />),
 *      so the button doubles as a second, always-visible read of "how far
 *      through the page am I" right where you'd reach to jump back up.
 *   2. Magnetic pull — nudges toward the cursor on hover, same spring
 *      feel as SkillPill/MagneticButton elsewhere in the site.
 *   3. Arrow lift — the icon itself lifts on hover as a small "yes, this
 *      is about going up" reinforcement, on top of the color transition.
 *
 * Same blue → orange gradient as the top progress bar and loading ring,
 * so it reads as the same system rather than a one-off flourish.
 */
const BackToTopButton = () => {
  const { lenis, progress } = useLenis();
  const ref = useRef(null);

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const springTx = useSpring(tx, { stiffness: 260, damping: 20, mass: 0.3 });
  const springTy = useSpring(ty, { stiffness: 260, damping: 20, mass: 0.3 });

  const dashoffset = useTransform(progress, (p) => CIRCUMFERENCE - CIRCUMFERENCE * p);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    tx.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    ty.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const handleLeave = () => {
    tx.set(0);
    ty.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
      aria-label="Back to top"
      data-cursor="top"
      style={{ x: springTx, y: springTy }}
      className="group relative inline-flex items-center justify-center w-9 h-9 rounded-full text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          strokeWidth="1.5"
          className="stroke-gray-200 dark:stroke-white/10"
        />
        <motion.circle
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          stroke="url(#back-to-top-gradient)"
          style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: dashoffset }}
        />
        <defs>
          <linearGradient id="back-to-top-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      <ArrowUp className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </motion.button>
  );
};

export default BackToTopButton;
