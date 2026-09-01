import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

const IMAGES = [
  () => import("@assets/profile1.webp"),
  () => import("@assets/logo.png"),
  () => import("@assets/sticker.png"),
];

// -- Matrix dot loader -------------------------------------------------------
// Variant delay tables — each dot gets --d (ms) into the 1200ms cycle.
// scan: col * 120, twinkle: order * 75, orbit: ring * 150, pulse: inner vs outer
const MATRIX_VARIANTS = {
  scan: Array.from({ length: 16 }, (_, i) => (i % 4) * 120),
  twinkle: (() => {
    const order = [7, 2, 11, 5, 14, 9, 0, 12, 3, 15, 6, 10, 13, 1, 8, 4];
    return order.map((_, idx) => {
      const pos = order.indexOf(idx);
      // fallback to idx if not found (should not happen)
      const p = pos === -1 ? idx : pos;
      return Math.round((p * 1200) / 16);
    });
  })(),
  orbit: (() => {
    const ring = [1, 2, 7, 11, 14, 13, 8, 4];
    return Array.from({ length: 16 }, (_, i) => {
      const r = ring.indexOf(i);
      return r === -1 ? 0 : Math.round((r * 1200) / 8);
    });
  })(),
  pulse: Array.from({ length: 16 }, (_, i) => {
    const inner = [5, 6, 9, 10].includes(i);
    return inner ? 0 : Math.round(1200 * 0.16);
  }),
};

const MatrixLoader = ({ variant = "scan", className = "" }) => {
  const delays = MATRIX_VARIANTS[variant] || MATRIX_VARIANTS.scan;
  return (
    <div className={`t-matrix ${className}`} data-variant={variant} aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <i key={i} style={{ "--d": delays[i] }} />
      ))}
    </div>
  );
};

/**
 * Blocking loader: matrix dots + percentage 0→100.
 * Preloads critical images + fonts; holds at least 1.2s for the
 * animation to be perceived. On completion the parent is notified
 * via onLoadingComplete, which triggers the swipe-up page transition.
 */
const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const preload = useCallback(async () => {
    const total = IMAGES.length + 1;
    let loaded = 0;

    const tick = () => {
      loaded++;
      // Animate progress smoothly to the next integer
      setProgress((prev) => {
        const next = Math.round((loaded / total) * 100);
        return next > prev ? next : prev;
      });
    };

    const promises = IMAGES.map((imp) =>
      imp()
        .then((mod) => {
          const url = mod.default || mod;
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => { tick(); resolve(); };
            img.onerror = () => { tick(); resolve(); };
            img.src = url;
          });
        })
        .catch(() => { tick(); })
    );

    promises.push(document.fonts.ready.then(tick));

    await Promise.all(promises);
    // Ensure we end at exactly 100 after all ticks
    setProgress(100);
  }, []);

  useEffect(() => {
    const minTime = new Promise((r) => setTimeout(r, 1400));
    Promise.all([preload(), minTime]).then(() => {
      // Small hold at 100% before swiping
      setTimeout(() => setVisible(false), 400);
    });
  }, [preload]);

  // Drive progress toward 100 with a gentle interval if preload is fast,
  // so the number feels alive rather than jumping.
  useEffect(() => {
    if (!visible) return;
    if (progress >= 100) return;
    const id = setInterval(() => {
      setProgress((p) => (p < 98 ? p + 1 : p));
    }, 22);
    return () => clearInterval(id);
  }, [progress, visible]);

  const handleExitComplete = () => {
    onLoadingComplete?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="matrix-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#080808] overflow-hidden"
          aria-label="Loading"
          aria-live="polite"
        >
          {/* Center: matrix + percentage */}
          <div className="flex flex-col items-center gap-8">
            <MatrixLoader variant="scan" />

            <div className="flex flex-col items-center gap-2">
              <span className="font-modern font-light tabular-nums text-gray-900 dark:text-white text-3xl sm:text-4xl tracking-[-0.02em]">
                {progress}%
              </span>
              <span className="section-label">Loading</span>
            </div>
          </div>

          {/* Bottom bar — subtle progress hairline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-white/[0.07]">
            <motion.div
              className="h-full bg-blue-600 dark:bg-blue-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
