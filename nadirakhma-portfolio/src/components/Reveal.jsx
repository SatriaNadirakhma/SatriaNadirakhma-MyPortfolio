import { motion } from "motion/react";

/**
 * One gentle reveal for the whole site: fade up 16px, once, on first
 * scroll into view. Duration-based easing (no spring bounce) so sections
 * settle like page turns rather than popping.
 */
const Reveal = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
