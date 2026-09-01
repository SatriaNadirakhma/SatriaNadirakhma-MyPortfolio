import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";

const CertificateModal = ({ src, title, onClose }) => {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Stops the actual Lenis instance while open (see useScrollLock) — a
  // wheel gesture over the backdrop must not scroll the page behind.
  useScrollLock();

  useEffect(() => {
    renderCertificateToCanvas(canvasRef, src);
  }, [src]);

  useEffect(() => {
    return blockKeyboardShortcuts(overlayRef);
  }, []);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
      style={{
        background: isDark ? "rgba(8,8,8,0.92)" : "rgba(250,250,250,0.92)",
        backdropFilter: "blur(16px)",
      }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full max-w-2xl border rounded-[4px] overflow-hidden ${
          isDark
            ? "bg-[#0f0f0f] border-white/[0.07]"
            : "bg-white border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between px-5 py-3.5 border-b ${
          isDark ? "border-white/6" : "border-gray-100"
        }`}>
          <span className={`section-label ${
            isDark ? "text-white/35" : "text-gray-500"
          }`}>
            Certificate preview — protected
          </span>
          <button
            onClick={onClose}
            className={`p-1 -mr-1 transition-colors ${
              isDark ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-gray-900"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-[4px]`}
            aria-label="Close preview"
          >
            <X aria-hidden="true" focusable="false" className="w-4 h-4" />
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
              className={`font-modern italic font-medium whitespace-nowrap ${
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
          isDark ? "border-white/6" : "border-gray-100"
        }`}>
          <p className={`text-[11px] font-normal truncate pr-4 ${
            isDark ? "text-white/60" : "text-gray-500"
          }`}>{title}</p>
          <p className={`section-label shrink-0 ${
            isDark ? "text-white/60" : "text-gray-500"
          }`}>
            View only
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ChampionCard = ({ title, event, description, image, certificate, link, year }) => {
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

      <article className="group flex flex-col rounded-[4px] border border-[#e5edf5] dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden transition-colors duration-150 hover:border-[#b9b9f9]/60 dark:hover:border-white/15 focus-within:border-[#b9b9f9]/60 dark:focus-within:border-white/25">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full aspect-[16/10] object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-[4px] border border-white/15 bg-black/50 backdrop-blur-sm px-2.5 py-1">
            <Trophy aria-hidden="true" focusable="false" className="w-3 h-3 text-white" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/70">
              {year}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col items-start">
          <p className="section-label text-orange-600 dark:text-orange-400">
            {event}
          </p>
          <h3 className="mt-2 text-lg sm:text-xl font-light text-gray-900 dark:text-white leading-snug tracking-[-0.01em]">
            {title}
          </h3>
          <p className="mt-2 text-sm font-light text-gray-500 dark:text-white/40 leading-relaxed">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCertOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-[4px] border border-gray-300 dark:border-white/15 px-3 py-1.5 text-xs font-normal text-gray-500 dark:text-white/50 hover:border-orange-400/50 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <ZoomIn aria-hidden="true" focusable="false" className="w-3 h-3" /> Certificate
            </button>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-normal text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
            >
              View post <ArrowUpRight aria-hidden="true" focusable="false" className="w-3 h-3" />
            </a>
          </div>
        </div>
      </article>
    </>
  );
};

const Champions = () => {
  return (
    <section id={SECTION_IDS.champions} className="px-5 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12">
        <PlusCorners />
        <SectionHeader
          label="Champions"
          title={
            <>
              Champions &amp;{" "}
              <span className="font-modern italic font-semibold text-orange-600 dark:text-orange-400">awards.</span>
            </>
          }
          description="Recognition that validates the process — from a national poster competition to a university UI/UX final."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
          {champions.map((item) => (
            <ChampionCard key={item.title} {...item} />
          ))}
        </div>
      </div></Reveal>
    </section>
  );
};

export default Champions;
