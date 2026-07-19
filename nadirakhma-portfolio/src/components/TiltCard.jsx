import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Wraps a card in a pointer-driven 3D tilt with a soft radial glare that
 * tracks the cursor — the Aceternity "3D Card" / "Spotlight Card" pattern
 * from 21st.dev, adapted to plain Framer Motion so it stays dependency-free
 * (no new packages) and composes cleanly with each card's own hover state.
 *
 * The tilt itself is intentionally cursor-driven, not scroll-driven — it's
 * a *complement* to the page's Lenis scroll signature (marquee speed,
 * heading skew, parallax images), not a replacement for it. Pointer-move
 * micro-interaction and scroll-velocity macro-interaction are different
 * signals; conflating them would make hovering a still card visually lie
 * about how fast the page is moving.
 *
 * Any extra props (onMouseEnter, onClick, data-cursor, etc.) pass straight
 * through to the root element, so existing card hover logic keeps working.
 */
const TiltCard = ({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 220,
    damping: 22,
    mass: 0.4,
  });

  const glareBackground = useTransform([px, py], ([gx, gy]) =>
    `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.16), transparent 55%)`
  );

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = (e) => {
    px.set(0.5);
    py.set(0.5);
    onMouseLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
