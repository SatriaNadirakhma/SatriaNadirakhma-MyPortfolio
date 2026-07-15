import { motion } from "motion/react";

const MenuToggleIcon = ({ open, className, duration = 300 }) => {
  const variant = open ? "opened" : "closed";
  const th = { strokeWidth: 2, strokeLinecap: "round", vectorEffect: "non-scaling-stroke" };

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <motion.path
        variants={{ closed: { d: "M4 6h16", rotate: 0, y: 0 }, opened: { d: "M4 6h16", rotate: 45, y: 5.5 } }}
        initial="closed" animate={variant} transition={{ duration }}
        stroke="currentColor" {...th}
      />
      <motion.path
        variants={{ closed: { d: "M4 12h16", opacity: 1 }, opened: { d: "M4 12h16", opacity: 0 } }}
        initial="closed" animate={variant} transition={{ duration: duration * 0.5, delay: open ? 0 : duration * 0.3 }}
        stroke="currentColor" {...th}
      />
      <motion.path
        variants={{ closed: { d: "M4 18h16", rotate: 0, y: 0 }, opened: { d: "M4 18h16", rotate: -45, y: -5.5 } }}
        initial="closed" animate={variant} transition={{ duration }}
        stroke="currentColor" {...th}
      />
    </svg>
  );
};

export default MenuToggleIcon;
