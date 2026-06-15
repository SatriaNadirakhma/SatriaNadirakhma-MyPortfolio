import { useState, useEffect } from "react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onLoadingComplete?.(), 400);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-400 bg-[#fafafa] dark:bg-[#080808]">
      <div className="text-center">
        <h1 className="font-stylish italic text-4xl sm:text-5xl md:text-6xl mb-8 text-gray-900 dark:text-white">
          Nadi Rakhma
        </h1>

        <div className="w-48 sm:w-64 h-px mx-auto rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-100 ease-linear bg-gray-900/60 dark:bg-white/60"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[10px] sm:text-xs font-modern tracking-[0.3em] uppercase text-gray-400 dark:text-white/25">
          {progress < 100 ? "Loading..." : "Ready"}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
