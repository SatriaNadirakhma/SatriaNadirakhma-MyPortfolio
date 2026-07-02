import { useState, useEffect, useRef } from "react";
import { useTheme } from "@context/ThemeContext";
import { Trophy, ArrowUpRight, X, ZoomIn } from "lucide-react";
import { champions } from "@data/champions";
import { SECTION_IDS } from "@constants/index";
import { useScrollLock } from "@hooks/useScrollLock";
import {
  blockKeyboardShortcuts,
  renderCertificateToCanvas,
} from "@utils/certificateSecurity";
import Reveal from "@components/Reveal";

const CertificateModal = ({ src, title, onClose }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
      style={{
        background: isDark ? "rgba(8,8,8,0.92)" : "rgba(250,250,250,0.92)",
        backdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl border rounded-xl overflow-hidden shadow-2xl ${
          isDark
            ? "bg-[#0f0f0f] border-white/[0.07]"
            : "bg-white border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between px-5 py-4 border-b ${
          isDark ? "border-white/[0.06]" : "border-gray-100"
        }`}>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] tracking-[0.22em] uppercase font-modern ${
              isDark ? "text-white/35" : "text-gray-500"
            }`}>
              Certificate Preview -- Protected
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1 -mr-1 transition-colors ${
              isDark ? "text-white/25 hover:text-white" : "text-gray-400 hover:text-gray-900"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm`}
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
              className={`font-stylish italic whitespace-nowrap ${
                isDark ? "text-white" : "text-gray-900"
              }`}
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

        <div className={`px-5 py-3 border-t flex items-center justify-between ${
          isDark ? "border-white/[0.06]" : "border-gray-100"
        }`}>
          <p className={`text-[10px] font-modern truncate pr-4 ${
            isDark ? "text-white/20" : "text-gray-400"
          }`}>{title}</p>
          <p className={`text-[10px] font-modern tracking-[0.2em] uppercase flex-shrink-0 ${
            isDark ? "text-white/12" : "text-gray-300"
          }`}>
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
            : "border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/15 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover brightness-80 group-hover:brightness-60 transition-all duration-300 scale-105 group-hover:scale-100"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" />
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
          <h3 className="text-base sm:text-lg font-modern font-bold text-gray-900 dark:text-white leading-snug mb-3">
            {title}
          </h3>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-40 mb-4" : "max-h-0"
            }`}
          >
            <p className="text-xs sm:text-sm font-modern text-gray-600 dark:text-white/45 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] tracking-[0.15em] uppercase font-modern text-gray-400 dark:text-white/35 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
            >
              {expanded ? (
                <>
                  <X className="w-3 h-3" /> Close
                </>
              ) : (
                <>Details</>
              )}
            </button>

            <span className="text-gray-300 dark:text-white/10">|</span>

            <button
              onClick={() => setCertOpen(true)}
              className="text-[10px] tracking-[0.15em] uppercase font-modern text-gray-400 dark:text-white/35 hover:text-orange-400 transition-colors duration-300 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
            >
              <ZoomIn className="w-3 h-3" /> Certificate
            </button>

            <span className="text-gray-300 dark:text-white/10">|</span>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.15em] uppercase font-modern text-gray-400 dark:text-white/35 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id={SECTION_IDS.champions} className="py-20 sm:py-28 px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto">
        <div className="border-t border-gray-200 dark:border-white/[0.07] pt-16 sm:pt-20"></div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          <h2
            className="font-modern font-bold leading-[0.92] text-gray-900 dark:text-white"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            Champions
            <br />
              <span
                style={{
                  color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
                  fontStyle: "italic",
                  textShadow: isDark
                    ? "-1px -1px 0 rgba(147,197,253,0.5), 1px -1px 0 rgba(147,197,253,0.5), -1px 1px 0 rgba(147,197,253,0.5), 1px 1px 0 rgba(147,197,253,0.5)"
                    : "-1px -1px 0 rgba(37,99,235,0.5), 1px -1px 0 rgba(37,99,235,0.5), -1px 1px 0 rgba(37,99,235,0.5), 1px 1px 0 rgba(37,99,235,0.5)",
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
      </div></Reveal>
    </section>
  );
};

export default Champions;
