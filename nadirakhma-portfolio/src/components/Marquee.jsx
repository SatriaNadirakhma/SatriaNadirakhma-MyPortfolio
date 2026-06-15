import { useMemo, useRef } from "react";

const Marquee = ({ items, speed = 30 }) => {
  const duplicated = useMemo(() => [...items, ...items], [items]);
  const containerRef = useRef(null);

  return (
    <div className="relative w-full overflow-hidden py-4 sm:py-6 border-y border-gray-200 dark:border-white/[0.05] my-0">
      <div
        ref={containerRef}
        className="flex gap-8 sm:gap-12 whitespace-nowrap marquee-track"
        style={{
          animation: `marquee ${items.length * (speed / 10)}s linear infinite`,
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
