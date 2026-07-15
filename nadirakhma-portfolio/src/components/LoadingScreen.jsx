import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@context/ThemeContext";
import Logo from "@assets/logo.png";

const IMAGES = [
  () => import("@assets/profile1.webp"),
  () => import("@assets/logo.png"),
  () => import("@assets/sticker.png"),
  () => import("@assets/image/efest.webp"),
  () => import("@assets/image/itfest.webp"),
  () => import("@assets/image/ekspedisi.webp"),
  () => import("@assets/image/tatib.webp"),
  () => import("@assets/image/sipinta.webp"),
  () => import("@assets/image/k3.webp"),
  () => import("@assets/image/oranjixhmti.webp"),
  () => import("@assets/image/alceena.webp"),
  () => import("@assets/image/mitraboost.webp"),
  () => import("@assets/image/kompen.webp"),
  () => import("@assets/image/itdecpeeps.webp"),
  () => import("@assets/image/oranjiteam.webp"),
  () => import("@assets/image/petrokimia.webp"),
];

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const LoadingScreen = ({ onLoadingComplete }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showAlmost, setShowAlmost] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "." ? ".." : prev === ".." ? "..." : "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlmost(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const preload = useCallback(async () => {
    const total = IMAGES.length + 1;
    let loaded = 0;

    const tick = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
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
  }, []);

  useEffect(() => {
    const minTime = new Promise((r) => setTimeout(r, 5000));
    // No more manual setTimeout(600) to fake the exit duration — visible
    // just flips to false, and AnimatePresence's onExitComplete below fires
    // onLoadingComplete the instant the real exit animation actually finishes.
    Promise.all([preload(), minTime]).then(() => setVisible(false));
  }, [preload]);

  const textColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)";

  return (
    <AnimatePresence onExitComplete={() => onLoadingComplete?.()}>
      {visible && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: isDark ? "#080808" : "#fafafa" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Progress ring + breathing logo mark */}
            <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
              <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                <circle
                  cx="70"
                  cy="70"
                  r={RADIUS}
                  fill="none"
                  strokeWidth="1.5"
                  className={isDark ? "stroke-white/8" : "stroke-gray-200"}
                />
                <motion.circle
                  cx="70"
                  cy="70"
                  r={RADIUS}
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  stroke="url(#loading-gradient)"
                  style={{ strokeDasharray: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100 }}
                  transition={{ ease: "easeOut", duration: 0.35 }}
                />
                <defs>
                  <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDark ? "#93c5fd" : "#3b82f6"} />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                className="absolute flex items-center justify-center"
                style={{ width: 44, height: 44 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={Logo}
                  alt="Nadi Rakhma"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: isDark ? "brightness(0) invert(1)" : "none",
                  }}
                />
              </motion.div>
            </div>

            {/* Live percentage — the actual `progress` state, finally shown */}
            <motion.span
              key={progress}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="font-modern font-bold tabular-nums leading-none"
              style={{
                fontSize: "clamp(32px, 5vw, 44px)",
                color: isDark ? "rgba(255,255,255,0.9)" : "rgba(17,24,39,0.9)",
              }}
            >
              {progress}%
            </motion.span>

            {/* Status label crossfade */}
            <div className="relative h-5 flex items-center justify-center overflow-hidden" style={{ width: 220 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={showAlmost ? "almost" : "brewing"}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute font-modern text-xs sm:text-sm tracking-[0.25em] uppercase"
                  style={{ color: textColor }}
                >
                  {showAlmost ? "Almost There" : "Still Brewing"}
                  <span style={{ minWidth: 24, display: "inline-block", textAlign: "left" }}>{dots}</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;