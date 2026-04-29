// src/components/LoadingScreen.jsx
import { useState, useEffect, useRef } from "react";

const MIN_DISPLAY_MS = 1200;
const FAKE_SPEED_MS = 60;

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const pageLoaded = useRef(false);
  const fakeProgress = useRef(0);
  const startTime = useRef(Date.now());
  const intervalRef = useRef(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;

    fakeProgress.current = 100;
    setProgress(100);

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 600);
    }, 300);
  };

  const tryFinish = () => {
    const elapsed = Date.now() - startTime.current;
    const minPassed = elapsed >= MIN_DISPLAY_MS;

    if (pageLoaded.current && minPassed) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      finish();
    }
  };

  // --- Modern Asset Tracking (Fonts + Images) ---
  useEffect(() => {
    const trackAssets = async () => {
      try {
        // 1. Tunggu semua font custom selesai dimuat
        await document.fonts.ready;

        // 2. Tunggu semua gambar yang ada di DOM dirender oleh React
        const images = Array.from(document.images);
        const imagePromises = images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Tetap lanjut meskipun 1 gambar gagal (mencegah infinite loading)
          });
        });

        await Promise.all(imagePromises);
      } catch (error) {
        console.warn("Asset tracking error:", error);
      } finally {
        pageLoaded.current = true;
        tryFinish();
      }
    };

    // Memberi sedikit jeda agar React selesai melakukan render DOM (inject <img>)
    const renderTimeout = setTimeout(() => {
      trackAssets();
    }, 150);

    return () => clearTimeout(renderTimeout);
  }, []);

  // --- Fake progress bar (simulasi) ---
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fakeProgress.current += Math.random() * 3 + 1;

      if (fakeProgress.current >= 95) {
        fakeProgress.current = 95;
        clearInterval(intervalRef.current);

        const elapsed = Date.now() - startTime.current;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

        setTimeout(() => {
          if (pageLoaded.current) {
            finish();
          } else {
            // Fallback yang lebih aman: Paksa selesai dalam 3 detik untuk menghindari dead-end
            const forceTimer = setTimeout(finish, 3000);

            // Mengecek ulang interval singkat jika asset tiba-tiba selesai
            const fallbackCheck = setInterval(() => {
              if (pageLoaded.current) {
                clearInterval(fallbackCheck);
                clearTimeout(forceTimer);
                finish();
              }
            }, 500);
          }
        }, remaining);
        return;
      }

      setProgress(Math.min(fakeProgress.current, 95));
    }, FAKE_SPEED_MS);

    return () => clearInterval(intervalRef.current);
  }, []);

  const rakhmaOpacity = Math.max(0, Math.min(1, (progress - 30) / 60));
  const displayProgress = Math.floor(progress);

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#080808",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.03)" : "scale(1)",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Container visual tetap sama persis seperti kode asli kamu */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          opacity: 0.035,
        }}
      />
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at top right, rgba(255,140,50,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          transition: "opacity 0.5s ease, transform 0.5s ease",
          opacity: fadeOut ? 0 : 1,
          transform: fadeOut ? "translateY(-12px)" : "translateY(0)",
          textAlign: "center",
        }}
      >
        <div className="flex items-baseline justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 select-none">
          <span
            className="font-stylish italic text-white"
            style={{ fontSize: "clamp(48px, 10vw, 96px)", lineHeight: 1 }}
          >
            Nadi
          </span>
          <span
            className="relative inline-block"
            style={{ fontSize: "clamp(48px, 10vw, 96px)", lineHeight: 1 }}
          >
            <span
              className="font-stylish italic absolute left-0 top-0"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                color: "transparent",
                opacity: 1 - rakhmaOpacity,
                transition: "opacity 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Rakhma
            </span>
            <span
              className="font-stylish italic text-white"
              style={{
                opacity: rakhmaOpacity,
                transition: "opacity 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Rakhma
            </span>
          </span>
        </div>
        <div
          className="mx-auto mb-4"
          style={{
            width: "clamp(160px, 30vw, 280px)",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${displayProgress}%`,
              backgroundColor:
                displayProgress === 100
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(255,140,50,0.7)",
              borderRadius: "99px",
              transition: "width 0.15s ease, background-color 0.4s ease",
            }}
          />
        </div>
        <p
          className="font-modern text-white/25 tracking-[0.3em]"
          style={{ fontSize: "clamp(11px, 1.5vw, 13px)" }}
        >
          {displayProgress < 100 ? `${displayProgress}%` : "READY"}
        </p>
      </div>
      <p
        className="absolute bottom-8 font-modern text-white/15 tracking-[0.3em] uppercase select-none"
        style={{ fontSize: "10px" }}
      >
        Malang, Indonesia
      </p>
    </div>
  );
};

export default LoadingScreen;
