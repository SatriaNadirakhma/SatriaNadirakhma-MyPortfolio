import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@hooks/useMediaQuery";

/**
 * Awwwards-style custom cursor: a small dot that follows the pointer with
 * a light spring lag, and morphs into a larger label pill whenever it's
 * over anything tagged `data-cursor="..."` (see Projects cards, links,
 * MagneticButton, etc).
 *
 * Deliberately skipped on touch devices (`useMediaQuery` against
 * `(hover: hover) and (pointer: fine)`) — there's no pointer to replace
 * there, and forcing `cursor: none` on a touch screen just makes taps
 * feel broken.
 */
const CustomCursor = () => {
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [label, setLabel] = useState(null);
  const [down, setDown] = useState(false);
  const rafTarget = useRef(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 340, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 340, mass: 0.4 });

  useEffect(() => {
    if (!hasFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);

      // Cheap hover-target lookup piggybacked on the existing mousemove
      // event instead of attaching a listener to every [data-cursor] node.
      const el = e.target.closest?.("[data-cursor]");
      const next = el?.getAttribute("data-cursor") || null;
      if (next !== rafTarget.current) {
        rafTarget.current = next;
        setLabel(next);
      }
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [hasFinePointer, x, y]);

  if (!hasFinePointer) return null;

  const expanded = Boolean(label);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] pointer-events-none flex items-center justify-center rounded-full mix-blend-difference bg-white"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: expanded ? 64 : down ? 10 : 14,
        height: expanded ? 64 : down ? 10 : 14,
      }}
      transition={{ type: "spring", damping: 24, stiffness: 300 }}
    >
      {expanded && (
        <span className="text-[9px] tracking-[0.15em] uppercase font-modern text-black">
          {label}
        </span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
