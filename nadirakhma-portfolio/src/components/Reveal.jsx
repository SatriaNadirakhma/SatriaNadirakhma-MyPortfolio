import { motion } from "motion/react";

const Reveal = ({
  children,
  className,
  delay = 0,
  y = 50,
  scale,
  stiffness = 120,
  damping = 18,
  once = true,
}) => {
  const initial = { opacity: 0, y };
  const animate = { opacity: 1, y: 0 };
  if (scale != null) {
    initial.scale = scale;
    animate.scale = 1;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount: 0.3 }}
      transition={{ type: "spring", stiffness, damping, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
