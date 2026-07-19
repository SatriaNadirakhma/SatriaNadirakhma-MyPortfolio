import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Wraps an <img> (or any children) in a parallax container: the content
 * drifts a few percent slower/faster than the page as its own section
 * scrolls through the viewport.
 *
 * Uses Framer Motion's `useScroll`, which reads the same underlying
 * scroll position Lenis is smoothing — so the drift moves in lockstep
 * with Lenis rather than fighting it with a second RAF loop. This is the
 * same approach already used for the Hero profile card; this component
 * just makes it reusable across every section instead of writing the
 * same three hooks over and over.
 *
 * Usage:
 *   <ParallaxImage amount={40}>
 *     <img src={...} className="w-full h-full object-cover" />
 *   </ParallaxImage>
 *
 * `amount` is the max vertical drift in px as the container crosses the
 * viewport. Wrap the *outer* card in `overflow-hidden` — the child is
 * deliberately rendered ~amount px taller than its box so the drift never
 * exposes empty space at the edges.
 */
const ParallaxImage = ({ children, amount = 30, className = "", position = "relative" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-amount / 2, amount / 2]);

  return (
    <div ref={ref} className={`${position} overflow-hidden ${className}`}>
      <motion.div
        style={{ y, height: `calc(100% + ${amount}px)`, top: -amount / 2 }}
        className="absolute inset-x-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
