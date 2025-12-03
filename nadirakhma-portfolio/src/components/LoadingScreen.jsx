import { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start fade out after reaching 100%
          setTimeout(() => {
            setFadeOut(true);
          }, 400);
          return 100;
        }
        const increment = Math.random() * 4 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Handle fade out completion
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        onLoadingComplete?.();
      }, 800); // Match the fade-out duration
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onLoadingComplete]);

  // Calculate opacity for "Rakhma" transition (35% -> 100%)
  const rakhmaOpacity = Math.max(0, (progress - 35) / 65);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2a4a] to-[#0d1a30] flex justify-center items-center z-[9999] transition-all duration-700 ease-out ${
        fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <div
        className={`text-center transition-all duration-700 ease-out ${
          fadeOut ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Name Container */}
        <div className="flex justify-center items-baseline gap-2 mb-5">
          {/* Nadi - Always solid */}
          <span
            className="text-white text-5xl md:text-7xl lg:text-8xl font-stylish italic tracking-wide"
          >
            Nadi
          </span>

          {/* Rakhma - Transition from outlined to solid */}
          <span className="relative inline-block">
            {/* Outlined text (fades out) */}
            <span
              className="text-5xl md:text-7xl lg:text-8xl font-stylish italic tracking-wide text-transparent"
              style={{
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.6)',
                opacity: 1 - rakhmaOpacity,
                transition: 'opacity 0.3s ease',
              }}
            >
              Rakhma
            </span>

            {/* Solid text (fades in) */}
            <span
              className="absolute left-0 top-0 text-white text-5xl md:text-7xl lg:text-8xl font-stylish italic tracking-wide"
              style={{
                opacity: rakhmaOpacity,
                transition: 'opacity 0.3s ease',
              }}
            >
              Rakhma
            </span>
          </span>
        </div>

        {/* Percentage */}
        <p
          className="text-white/80 text-lg md:text-xl font-modern semibold tracking-widest"
        >
          {Math.floor(progress)}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
