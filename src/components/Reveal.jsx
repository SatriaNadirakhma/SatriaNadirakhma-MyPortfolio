import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Insta360-style scroll-linked reveal: instead of a boolean "in view /
 * not in view" trigger, this reads continuous scroll progress as the
 * section travels through the lower half of the viewport and maps it
 * to scale + y + opacity + border-radius. The section drops in from
 * above, shrinks into its final size, and its corners round off as it
 * settles — then reverses smoothly if the user scrolls back up.
 *
 * Trade-off (agreed with user): sections scale independently of their
 * neighbors, so the shared -mt-px collapsed borders between sections
 * will visibly separate/misalign for the duration of the transition.
 * This is intentional here in favor of the drop/shrink effect.
 *
 * `delay` is accepted for API compatibility with the previous
 * whileInView version but has no effect in scroll-linked mode — there's
 * no fixed timeline to delay against, only scroll position. Stagger
 * between sections happens naturally since they sit at different
 * scroll offsets on the page.
 */
const Reveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);

  // progress 0: section's top is at the bottom of the viewport
  // progress 1: section's top has reached 35% down the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity, borderRadius, overflow: "hidden" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;