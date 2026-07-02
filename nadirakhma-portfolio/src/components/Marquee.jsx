import { useMemo, useEffect, useRef, useState } from "react";

const Marquee = ({ items, speed = 30 }) => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const duplicated = useMemo(() => [...items, ...items], [items]);
  const duration = useMemo(() => items.length * (speed / 8), [items, speed]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-4 sm:py-6 border-y border-gray-200 dark:border-white/[0.05]">
      <div
        ref={containerRef}
        className="flex gap-8 sm:gap-12 whitespace-nowrap marquee-track"
        style={{
          animation: visible ? `marquee ${duration}s linear infinite` : "none",
          willChange: "transform",
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] font-modern text-gray-300 dark:text-white/20 font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
