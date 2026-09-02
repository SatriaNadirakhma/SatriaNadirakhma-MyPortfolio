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
// Rasio lebar:tinggi rata-rata karakter monospace, dipakai sebagai fallback
// sebelum rasio asli sempat diukur dari DOM.
const CHAR_ASPECT_FALLBACK = 0.55;

// Ukur rasio lebar karakter monospace yang SEBENARNYA dirender browser
// (font stack "monospace" bisa beda-beda lebar per browser/OS), supaya
// perhitungan font-size nanti presisi dan grid ASCII benar-benar pas
// memenuhi lebar container (tidak nyisa gap di kanan/kiri).
function measureCharAspect(): number {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return CHAR_ASPECT_FALLBACK;
  const REF = 100;
  ctx.font = `${REF}px monospace`;
  const width = ctx.measureText("0").width;
  return width > 0 ? width / REF : CHAR_ASPECT_FALLBACK;
}

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
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [metrics, setMetrics] = useState({ fontPx: 6, lineHeightPx: 6 });

  // Pantau ukuran container secara real-time (termasuk saat resize / breakpoint berubah)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!size.width || !size.height) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const charAspect = measureCharAspect();

      // Kolom mengikuti prop resolution. Baris dihitung dari RASIO CONTAINER
      // (bukan rasio gambar mentah) supaya grid ASCII sama proporsinya dengan box.
      const cols = resolution;
      const containerAspect = size.width / size.height;
      const rows = Math.max(1, Math.round((cols / containerAspect) * charAspect));

      // Crop gambar ala object-cover (potong, bukan gepengkan) supaya framing
      // sama persis dengan versi foto asli saat di-reveal.
      const imgAspect = img.width / img.height;
      const targetAspect = containerAspect;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (imgAspect > targetAspect) {
        sw = img.height * targetAspect;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / targetAspect;
        sy = (img.height - sh) / 2;
      }

      canvas.width = cols;
      canvas.height = rows;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);

      const data = ctx.getImageData(0, 0, cols, rows).data;
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          const bright = (r + g + b) / 3;
          const idx = Math.floor((bright / 255) * (CHARS.length - 1));
          out += CHARS[idx] ?? " ";
        }
        out += "\n";
      }
      // Buang newline terakhir supaya tidak ada baris kosong ekstra yang
      // menggeser konten ke atas.
      setAscii(out.replace(/\n$/, ""));
      setLoaded(true);

      // Hitung font-size & line-height dari ukuran container ASLI + rasio
      // karakter yang sudah diukur, supaya grid (cols x rows) pas memenuhi
      // seluruh box secara presisi (tanpa gap yang bikin tampilan geser).
      const fontPx = size.width / cols / charAspect;
      const lineHeightPx = size.height / rows;
      setMetrics({ fontPx, lineHeightPx });
    };
    img.onerror = () => setLoaded(true);
  }, [src, resolution, size.width, size.height]);

  const showAscii = !revealed;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      tabIndex={0}
    >
      {/* ASCII layer - full-bleed, menyesuaikan ukuran container secara dinamis */}
      <pre
        className="absolute inset-0 w-full h-full m-0 p-0 overflow-hidden whitespace-pre select-none flex items-center justify-center"
        style={{
          color,
          opacity: showAscii ? 1 : 0,
          transition: `opacity ${animationDuration}s ease`,
          fontFamily: "monospace",
          fontSize: `${metrics.fontPx}px`,
          lineHeight: `${metrics.lineHeightPx}px`,
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