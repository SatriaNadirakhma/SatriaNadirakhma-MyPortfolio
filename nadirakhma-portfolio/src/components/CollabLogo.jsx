import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "motion/react";

/**
 * Collaboration logo chip — same magnetic-pull + cursor-spotlight
 * treatment as SkillPill, plus a per-item mask reveal (same technique as
 * ScrollHeading) staggered by `index` so the row builds in left-to-right
 * instead of every logo popping in at once.
 *
 * Two independently-animating layers, deliberately kept separate:
 *   - outer `motion.div` (overflow-hidden mask) — one-time scroll-in
 *     reveal, `initial`/`whileInView` on its own `y`/`opacity`.
 *   - inner `motion.a` — continuous pointer-driven magnetic pull +
 *     spotlight, on its own `x`/`y`/background.
 * Splitting them avoids the same style-key collision that would happen
 * animating "y" on the same element two different ways at once.
 */
const CollabLogo = ({ src, alt, href, index = 0 }) => {
  const ref = useRef(null);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const springTx = useSpring(tx, { stiffness: 240, damping: 20, mass: 0.3 });
  const springTy = useSpring(ty, { stiffness: 240, damping: 20, mass: 0.3 });

  const spotlight = useMotionTemplate`radial-gradient(120px circle at ${mx}% ${my}%, rgba(59,130,246,0.45), transparent 70%)`;

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    mx.set((relX / rect.width) * 100);
    my.set((relY / rect.height) * 100);
    tx.set((relX / rect.width - 0.5) * 10);
    ty.set((relY / rect.height - 0.5) * 10);
  };

  const handleLeave = () => {
    tx.set(0);
    ty.set(0);
  };

  return (
    <motion.div
      className="overflow-hidden rounded-xl"
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    >
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={alt}
        data-cursor="visit"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springTx, y: springTy }}
        className="group relative flex items-center justify-center rounded-xl p-3 sm:p-4"
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="relative z-10 h-12 sm:h-24 w-auto opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
        />
      </motion.a>
    </motion.div>
  );
};

export default CollabLogo;
