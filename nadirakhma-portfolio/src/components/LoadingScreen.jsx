import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

const IMAGES = [
  () => import("@assets/profile1.webp"),
  () => import("@assets/logo.png"),
  () => import("@assets/sticker.png"),
];

/**
 * Stripe-style load indicator: a single 1px hairline across the top of
 * the canvas that fills as images and fonts finish preloading, then
 * quietly fades out. Non-blocking — the page renders underneath from the
 * first frame and the bar never captures pointer events.
 */
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

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
    const minTime = new Promise((r) => setTimeout(r, 1200));
    Promise.all([preload(), minTime]).then(() => setVisible(false));
  }, [preload]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-bar"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-[999] pointer-events-none"
          aria-hidden="true"
        >
          <div className="h-px w-full bg-gray-200 dark:bg-white/[0.07]">
            <motion.div
              className="h-full bg-blue-600 dark:bg-blue-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
