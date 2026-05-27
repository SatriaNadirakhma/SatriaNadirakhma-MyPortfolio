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
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#080808] transition-opacity duration-400"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="text-center">
        <h1 className="font-stylish italic text-white text-4xl sm:text-5xl md:text-6xl mb-8">
          Nadi Rakhma
        </h1>

        <div className="w-48 sm:w-64 h-px bg-white/10 mx-auto rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-white/60 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[10px] sm:text-xs font-modern text-white/25 tracking-[0.3em] uppercase">
          {progress < 100 ? "Loading..." : "Ready"}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
