import { useState } from "react";
import { ArrowUp } from "iconoir-react";
import { useLenis } from "@context/LenisContext";

const LABEL = "Back to top";
const CHAR_IN_DELAY = 22;
const CHAR_OUT_DELAY = 16;

/**
 * Back-to-top — idle hanya panah atas. Saat kursor mendekati / hover /
 * focus, teks ter-reveal huruf-per-huruf start-to-finish (kiri ke kanan).
 * Saat kursor menjauh, animasi me-reverse finish-to-start jadi panah saja.
 */
const BackToTopButton = () => {
  const { lenis } = useLenis();
  const [expanded, setExpanded] = useState(false);

  return (
    // Zona proximity: padding tak terlihat supaya reveal mulai
    // saat kursor *mendekati*, bukan pas tepat di atas button.
    <span
      className="inline-flex p-3 -m-3"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button
        onClick={() => lenis?.scrollTo(0, { duration: 1.2 })}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        aria-label="Back to top"
        aria-expanded={expanded}
        className={`inline-flex items-center overflow-hidden rounded-[4px] border border-gray-300 dark:border-white/15 py-1.5 text-xs font-normal text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:border-gray-500 dark:hover:border-white/35 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-[padding,gap,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? "gap-1.5 px-3" : "gap-0 px-2"
        }`}
      >
        <ArrowUp
          className={`w-3 h-3 shrink-0 transition-transform duration-300 ease-out ${
            expanded ? "-translate-y-[1px]" : "translate-y-0"
          }`}
        />
        {/* Teks: container ter-clip (max-width 0 -> penuh) + tiap huruf
            stagger. Masuk: delay membesar start -> finish.
            Keluar: delay dibalik finish -> start (reverse). */}
        <span
          aria-hidden={!expanded}
          className={`inline-flex overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            expanded ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          {LABEL.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className={`inline-block transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
                expanded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0"
              }`}
              style={{
                transitionDelay: expanded
                  ? `${i * CHAR_IN_DELAY}ms`
                  : `${(LABEL.length - 1 - i) * CHAR_OUT_DELAY}ms`,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      </button>
    </span>
  );
};

export default BackToTopButton;
