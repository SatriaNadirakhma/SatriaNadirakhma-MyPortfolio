import { useState } from "react";
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
 * On top of the velocity skew, the whole headline now does a one-time
 * "mask reveal" the first time it scrolls into view: it's clipped behind
 * an overflow-hidden band and slides up into place, rather than just
 * fading in. This works on the block as a whole (not word-by-word)
 * specifically so it stays safe with the mixed italic/colored <span>
 * children already used throughout the sections — no need to parse text
 * nodes apart.
 *
 * The overflow-hidden clip is only needed *during* that reveal — several
 * headings use a tight `leading-[0.92]`, and descenders/ascenders (the
 * tail on "J", "y", "&", "g") sit outside that tightened line box. Once
 * the reveal finishes, clipping is switched off (`onAnimationComplete`)
 * so those glyph parts render normally instead of staying permanently
 * cropped by the mask container.
 *
 * Usage: identical to a plain <h2>, className/style pass straight through.
 *   <ScrollHeading className="font-modern font-bold ..." style={{ fontSize: "..." }}>
 *     My <span>Journey</span>
 *   </ScrollHeading>
 */
const ScrollHeading = ({ as = "h2", className = "", style = {}, children }) => {
  const { velocity } = useLenis();
  const Tag = motion[as] ?? motion.h2;
  const [revealed, setRevealed] = useState(false);

  const skewY = useTransform(velocity, [-40, 0, 40], [2.2, 0, -2.2], { clamp: true });
  const y = useTransform(velocity, [-40, 0, 40], [4, 0, -4], { clamp: true });

  return (
    <motion.div
      className={revealed ? "overflow-visible" : "overflow-hidden"}
      initial={{ y: "115%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setRevealed(true)}
    >
      <Tag className={className} style={{ ...style, skewY, y }}>
        {children}
      </Tag>
    </motion.div>
  );
};

export default ScrollHeading;