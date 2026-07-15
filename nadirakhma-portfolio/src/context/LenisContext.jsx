import { createContext, useContext, useEffect, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import Lenis from "lenis";

const LenisCtx = createContext(null);

/**
 * Owns the single Lenis instance for the whole app.
 *
 * Besides driving the smooth-scroll RAF loop, it exposes two live values
 * derived straight from Lenis's own scroll event:
 *   - progress: 0 → 1 across the full document (used for the top progress bar)
 *   - velocity: signed scroll speed, smoothed with a spring (used for the
 *     subtle heading skew — see `ScrollHeading`)
 *
 * Both are framer-motion MotionValues, not React state — they update on
 * every scroll frame without triggering re-renders anywhere in the tree.
 * Any component can subscribe to them via useTransform without paying for
 * the update itself.
 */
export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const progress = useMotionValue(0);
  const rawVelocity = useMotionValue(0);
  const velocity = useSpring(rawVelocity, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });

    setLenis(instance);

    instance.on("scroll", ({ progress: p, velocity: v }) => {
      progress.set(p);
      rawVelocity.set(v);
    });

    let rafId;
    function raf(time) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LenisCtx.Provider value={{ lenis, progress, velocity }}>
      {children}
    </LenisCtx.Provider>
  );
};

/**
 * Usage:
 *   const { lenis, progress, velocity } = useLenis();
 *   lenis?.scrollTo('#projects', { offset: -60 });
 *
 * `lenis` is null for one tick on mount (before the effect above runs) and
 * whenever a component unmounts alongside the provider — always optional-chain it.
 */
export const useLenis = () => {
  const ctx = useContext(LenisCtx);
  if (!ctx) {
    throw new Error("useLenis must be used within a <LenisProvider>");
  }
  return ctx;
};