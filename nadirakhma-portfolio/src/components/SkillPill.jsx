import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "motion/react";
import { ExternalLink } from "lucide-react";

/**
 * Skill pill with three layered micro-interactions instead of a flat
 * border-color hover:
 *   1. Magnetic pull — the whole pill nudges a few px toward the cursor,
 *      spring-damped (same feel as MagneticButton, tuned tighter since
 *      pills are small and sit in a dense grid).
 *   2. Cursor-tracked spotlight — a radial glow follows the pointer,
 *      masked down to a 1px ring so it reads as a "living" border rather
 *      than a full glow wash. Position is set via CSS custom properties
 *      through Framer's useMotionTemplate, so it updates without
 *      triggering React re-renders.
 *   3. Icon nudge — icon rotates/scales slightly on hover via a plain
 *      group-hover CSS transition (kept off Framer Motion since it only
 *      needs to react to the *pill's* hover state, not its own pointer).
 *
 * Non-clickable pills (Soft Skills, no `url`) still get the spotlight +
 * magnetic pull — hover feedback shouldn't be gated on being a link.
 */
const SkillPill = ({ icon: Icon, name, url }) => {
  const ref = useRef(null);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const springTx = useSpring(tx, { stiffness: 260, damping: 20, mass: 0.3 });
  const springTy = useSpring(ty, { stiffness: 260, damping: 20, mass: 0.3 });

  const spotlight = useMotionTemplate`radial-gradient(140px circle at ${mx}% ${my}%, rgba(59,130,246,0.6), transparent 70%)`;

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    mx.set((relX / rect.width) * 100);
    my.set((relY / rect.height) * 100);
    tx.set((relX / rect.width - 0.5) * 8);
    ty.set((relY / rect.height - 0.5) * 8);
  };

  const handleLeave = () => {
    tx.set(0);
    ty.set(0);
  };

  const content = (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springTx, y: springTy }}
      data-cursor={url ? "open" : undefined}
      className={`group relative inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border overflow-hidden select-none transition-colors duration-300 ${
        url
          ? "border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/3 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.07] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          : "border-gray-200 dark:border-white/[0.07] bg-transparent text-gray-400 dark:text-white/30 cursor-default hover:text-gray-600 dark:hover:text-white/50"
      }`}
    >
      {/* Soft glow wash, faint */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
        style={{ background: spotlight }}
      />
      {/* 1px spotlight ring, masked to the border only */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: spotlight,
          padding: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {Icon && (
        <span className="relative z-10 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </span>
      )}
      <span className="relative z-10 text-xs sm:text-sm font-modern whitespace-nowrap">{name}</span>
      {url && (
        <ExternalLink className="relative z-10 w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity duration-300 shrink-0" />
      )}
    </motion.span>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name}`} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
};

export default SkillPill;
