import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "motion/react";
import { useLenis } from "@context/LenisContext";

// Keeps a value looping inside [min, max) — e.g. wraps -63.4% back to
// -13.4% instead of letting it run off to -1000%.
const wrapValue = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Infinite marquee whose speed and direction are driven by Lenis's own
 * scroll velocity — not a fixed CSS @keyframes duration.
 *
 * At rest it drifts at `speed`. The instant the page picks up speed
 * (in either direction), the marquee visibly surges and can even reverse
 * direction to match the scroll — the same "the whole page is one moving
 * system" feel Awwwards sites get from tying every moving part to a
 * single scroll source. Freezes entirely when the visitor has
 * prefers-reduced-motion set.
 */
const Marquee = ({ items, speed = 30 }) => {
  const wrapperRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const duplicated = useMemo(() => [...items, ...items], [items]);
  const { velocity } = useLenis();

  const baseX = useMotionValue(0);
  const directionRef = useRef(-1);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // x is expressed as a percentage of the duplicated content's width, so
  // the loop point (-50%) lines up exactly with the un-duplicated set,
  // regardless of item count or viewport width.
  const x = useTransform(baseX, (v) => `${wrapValue(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!visible || reducedMotion.current) return;
    const dt = delta / 1000;

    // Baseline drift, always moving left.
    let moveBy = (speed / 12) * dt;

    const v = velocity.get();
    if (Math.abs(v) > 0.4) {
      // Scroll is actively happening — let it dictate direction and add
      // a proportional surge on top of the baseline drift.
      directionRef.current = v > 0 ? -1 : 1;
      moveBy += Math.min(Math.abs(v) * 0.18, 5) * dt;
    }

    baseX.set(baseX.get() + moveBy * directionRef.current);
  });

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden py-4 sm:py-6 border-y border-gray-200 dark:border-white/[0.05]"
    >
      <motion.div
        className="flex gap-8 sm:gap-12 whitespace-nowrap marquee-track"
        style={{ x, willChange: "transform" }}
      >
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] font-modern text-gray-300 dark:text-white/20 font-medium"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
