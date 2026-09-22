import { createContext, useContext, useEffect, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import Lenis from "lenis";

const LenisCtx = createContext(null);

/**
 * Owns the single Lenis instance for the whole app.
 *
 * Besides driving the smooth-scroll RAF loop, it exposes two live values
 * derived straight from Lenis's own scroll event:
 *   - progress: 0 → 1 across the full document
 *   - velocity: signed scroll speed, smoothed with a spring
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
    let instance = null;
    let rafId = 0;
    let idleId = 0;

    const init = () => {
      instance = new Lenis({
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

      function raf(time) {
        instance.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    // Defer until browser is idle / after LCP to avoid forced reflow in critical path
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(init, { timeout: 1500 });
    } else {
      // Fallback: next frame after paint
      const t = setTimeout(init, 300);
      idleId = t;
    }

    return () => {
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        try { window.cancelIdleCallback(idleId); } catch { /* ignore */ }
      } else {
        clearTimeout(idleId);
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (instance) {
        instance.destroy();
        setLenis(null);
      }
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