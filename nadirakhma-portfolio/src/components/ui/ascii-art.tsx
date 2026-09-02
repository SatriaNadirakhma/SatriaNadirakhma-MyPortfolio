"use client";
import { useEffect, useRef, useState } from "react";

interface AsciiArtProps {
  src: string;
  resolution?: number;
  color?: string;
  animationStyle?: string;
  animationDuration?: number;
  animateOnView?: boolean;
  className?: string;
}

const CHARS = " .:-=+*#%@";

export function AsciiArt({
  src,
  resolution = 100,
  color = "var(--color-neutral-500)",
  animationStyle = "fade",
  animationDuration = 1.5,
  animateOnView = false,
  className = "",
}: AsciiArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ascii, setAscii] = useState<string>("");
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = resolution;
      const h = Math.round((img.height / img.width) * resolution * 0.55);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let out = "";
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          const bright = (r + g + b) / 3;
          const idx = Math.floor((bright / 255) * (CHARS.length - 1));
          out += CHARS[idx] ?? " ";
        }
        out += "\n";
      }
      setAscii(out);
      setLoaded(true);
    };
    img.onerror = () => setLoaded(true);
  }, [src, resolution]);

  const showAscii = !revealed;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      tabIndex={0}
    >
      {/* ASCII layer - full-bleed, responsive */}
      <pre
        className="absolute inset-0 w-full h-full m-0 p-0 overflow-hidden leading-none whitespace-pre select-none flex items-center justify-center"
        style={{
          color,
          opacity: showAscii ? 1 : 0,
          transition: `opacity ${animationDuration}s ease`,
          fontFamily: "monospace",
          fontSize: "clamp(3px, 0.7vw, 7px)",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {loaded ? ascii : "Loading ASCII..."}
      </pre>
      {/* Image layer - same cover, responsive */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: showAscii ? 0 : 1,
          transition: `opacity ${animationDuration}s ease`,
        }}
        loading="lazy"
        decoding="async"
      />
      {/* Reveal button - click to permanently reveal */}
      {!revealed && (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white text-xs tracking-wide px-4 py-2 hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
        >
          Reveal photo
        </button>
      )}
    </div>
  );
}
