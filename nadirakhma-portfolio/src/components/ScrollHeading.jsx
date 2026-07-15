import { motion, useTransform } from "motion/react";
import { useLenis } from "@context/LenisContext";

/**
 * Drop-in replacement for a section's <h2> (or <h1>/<h3> via `as`).
 *
 * This is the site's single scroll signature: as the page picks up speed,
 * whichever headline is on screen leans very slightly into the direction
 * of travel — skew + a few px of lift — then settles flat the instant
 * scrolling slows down. It's driven by Lenis's actual velocity reading
 * (spring-smoothed in LenisContext), which is the whole reason this reads
 * as "alive" rather than a generic scroll-into-view fade.
 *
 * Kept deliberately subtle (±2.2deg skew, ±4px) and clamped so it never
 * fights legibility — this is the one place the design spends its motion
 * budget, so every section keeps the exact same feel instead of five
 * different scroll gimmicks.
 *
 * Usage: identical to a plain <h2>, className/style pass straight through.
 *   <ScrollHeading className="font-modern font-bold ..." style={{ fontSize: "..." }}>
 *     My <span>Journey</span>
 *   </ScrollHeading>
 */
const ScrollHeading = ({ as = "h2", className = "", style = {}, children }) => {
  const { velocity } = useLenis();
  const Tag = motion[as] ?? motion.h2;

  const skewY = useTransform(velocity, [-40, 0, 40], [2.2, 0, -2.2], { clamp: true });
  const y = useTransform(velocity, [-40, 0, 40], [4, 0, -4], { clamp: true });

  return (
    <Tag className={className} style={{ ...style, skewY, y }}>
      {children}
    </Tag>
  );
};

export default ScrollHeading;