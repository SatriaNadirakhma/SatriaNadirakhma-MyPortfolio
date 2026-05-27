import { useState, useEffect, useRef } from "react";
import { Trophy, ArrowUpRight, X, ZoomIn } from "lucide-react";
import { champions } from "@data/champions";
import { SECTION_IDS } from "@constants/index";
import { useScrollLock } from "@hooks/useScrollLock";
import {
  blockKeyboardShortcuts,
  renderCertificateToCanvas,
} from "@utils/certificateSecurity";

const CertificateModal = ({ src, title, onClose }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useScrollLock();

  useEffect(() => {
    renderCertificateToCanvas(canvasRef, src);
  }, [src]);

  useEffect(() => {
    return blockKeyboardShortcuts(overlayRef);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(8,8,8,0.92)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.22em] uppercase font-modern text-white/35">
              Certificate Preview -- Protected
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/25 hover:text-white transition-colors p-1 -mr-1"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className="relative select-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-auto block"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              pointerEvents: "none",
            }}
          />

          <div
            className="absolute inset-0"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />

          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            style={{ transform: "rotate(-25deg)" }}
          >
            <span
              className="font-stylish italic text-white whitespace-nowrap"
              style={{
                fontSize: "clamp(18px, 4.5vw, 44px)",
                opacity: 0.055,
                letterSpacing: "0.05em",
              }}
            >
              Satria Rakhmadani
            </span>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-[10px] font-modern text-white/20 truncate pr-4">{title}</p>
          <p className="text-[10px] font-modern text-white/12 tracking-[0.2em] uppercase flex-shrink-0">
            View Only
          </p>
        </div>
      </div>
    </div>
  );
};

const ChampionCard = ({ title, event, description, image, certificate, link, icon: Icon, year }) => {
  const [expanded, setExpanded] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  return (
    <>
      {certOpen && (
        <CertificateModal
          src={certificate}
          title={title}
          onClose={() => setCertOpen(false)}
        />
      )}

      <div
        className={`group relative border rounded-2xl overflow-hidden transition-all duration-300 ${
          expanded
            ? "border-orange-500/30 bg-orange-500/5"
            : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
        }`}
      >
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover brightness-40 group-hover:brightness-55 transition-all duration-500 scale-105 group-hover:scale-100"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-orange-400" />
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
            <span className="text-[9px] tracking-widest uppercase font-modern text-white/50">
              {year}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase font-modern text-orange-400/70 mb-1.5">
            {event}
          </p>
          <h3 className="text-base sm:text-lg font-modern font-bold text-white leading-snug mb-3">
            {title}
          </h3>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-40 mb-4" : "max-h-0"
            }`}
          >
            <p className="text-xs sm:text-sm font-modern text-white/45 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] tracking-[0.15em] uppercase font-modern text-white/35 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
            >
              {expanded ? (
                <>
                  <X className="w-3 h-3" /> Close
                </>
              ) : (
                <>Details</>
              )}
            </button>

            <span className="text-white/10">|</span>

            <button
              onClick={() => setCertOpen(true)}
              className="text-[10px] tracking-[0.15em] uppercase font-modern text-white/35 hover:text-orange-400 transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              <ZoomIn className="w-3 h-3" /> Certificate
            </button>

            <span className="text-white/10">|</span>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.15em] uppercase font-modern text-white/35 hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
            >
              View Post <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Champions = () => {
  return (
    <section id={SECTION_IDS.champions} className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <div className="w-6 h-px bg-white/20" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/30">
            License &amp; Awards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          <h2
            className="font-stylish italic text-white leading-[0.92]"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            Champions
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                color: "transparent",
              }}
            >
              &amp; Awards
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {champions.map((item, i) => (
              <ChampionCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Champions;
