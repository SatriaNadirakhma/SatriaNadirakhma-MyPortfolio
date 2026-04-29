// src/components/Marquee.jsx
const Marquee = ({
  items = [
    "GRAPHIC DESIGN",
    "FRONT-END DEVELOPMENT",
    "UI/UX DESIGN",
    "BRANDING",
    "WEB DEVELOPMENT",
    "CREATIVE CODING",
    "REACT",
    "FIGMA",
  ],
  speed = 30,
}) => {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-white/[0.06] py-3 sm:py-4 my-0 relative">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 sm:gap-8 mx-4 sm:mx-6 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-modern text-white/20"
          >
            {item}
            <span className="text-blue-400/60 text-sm sm:text-base">✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
