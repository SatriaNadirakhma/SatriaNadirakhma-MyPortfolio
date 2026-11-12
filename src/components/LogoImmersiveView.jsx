import { lazy, Suspense, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Xmark } from "iconoir-react";
import { useScrollLock } from "@hooks/useScrollLock";
import { TropicalTideBackground } from "@components/background-gradient/TropicalTideBackground";

const Logo3D = lazy(() => import("@components/Logo3D"));

/**
 * Tampilan penuh (fullscreen) untuk logo 3D ASCII, dibuka saat logo di
 * Hero ditekan. Latar solid mengikuti tema (#fafafa / #080808) plus
 * pattern TropicalTideBackground yang dipakai situs, dengan instance
 * Logo3D kedua (lebih besar) di tengah.
 *
 * Instance Hero di-pause lewat prop `paused` selama view ini terbuka,
 * sehingga tidak ada dua AsciiEffect yang render bersamaan.
 *
 * Menutup: tombol X, tombol Esc, atau klik di area kosong di luar logo.
 * Scroll (termasuk Lenis) dikunci via useScrollLock selama terbuka.
 */
const LogoImmersiveView = ({ onClose }) => {
  const closeButtonRef = useRef(null);

  useScrollLock();

  // Focus ke tombol X saat mount (dialog modal) + listener Esc global
  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#fafafa] dark:bg-[#080808] select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Logo 3D ASCII dalam tampilan penuh"
      onClick={onClose}
      data-lenis-prevent
    >
      {/* Pattern background situs, di-scale ke area overlay.
          Komponen sudah theme-aware (blob redup + dot grid putih di dark). */}
      <TropicalTideBackground
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      />

      {/* Tombol tutup — tema-aware, di atas pattern */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Tutup tampilan penuh (Esc)"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-gray-300 dark:border-white/[0.14] bg-white/70 dark:bg-white/[0.04] backdrop-blur-sm text-gray-700 dark:text-white/70 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600/40 dark:hover:border-blue-400/40 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400"
      >
        <Xmark aria-hidden="true" focusable="false" className="w-5 h-5" />
      </button>

      {/* Logo di tengah — instance Logo3D kedua, ukuran lebih besar.
          syncSize() internal Logo3D membaca container ini, jadi grid ASCII
          otomatis menyesuaikan resolusi penuh. stopPropagation agar klik
          pada logo tidak menutup view. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-8 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[70vw] sm:max-w-[420px] lg:max-w-[520px]"
          onClick={(e) => e.stopPropagation()}
        >
          <Suspense
            fallback={
              <div className="w-full aspect-square rounded-[4px] bg-gray-100 dark:bg-white/[0.02] animate-pulse" />
            }
          >
            <Logo3D />
          </Suspense>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LogoImmersiveView;
