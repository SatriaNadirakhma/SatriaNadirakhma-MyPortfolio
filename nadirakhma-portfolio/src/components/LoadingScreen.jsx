import { useState, useEffect, useCallback } from "react";
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

const BOXES = [
  { z: 99, delay: 0, size: 25, borderOpacity: 1 },
  { z: 98, delay: 0.2, size: 40, borderOpacity: 0.8 },
  { z: 97, delay: 0.4, size: 60, borderOpacity: 0.6 },
  { z: 96, delay: 0.6, size: 80, borderOpacity: 0.4 },
  { z: 95, delay: 0.8, size: 100, borderOpacity: 0.2 },
];

const LoadingScreen = ({ onLoadingComplete }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showAlmost, setShowAlmost] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === ".") return "..";
        if (prev === "..") return "...";
        return ".";
      });
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
    Promise.all([preload(), minTime]).then(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        onLoadingComplete?.();
      }, 600);
    });
  }, [preload, onLoadingComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center transition-all duration-500 ease-in-out"
      style={{
        background: isDark ? "#000" : "#fafafa",
        transform: exiting ? "scale(0.9)" : "scale(1)",
        opacity: exiting ? 0 : 1,
        borderRadius: exiting ? "50%" : 0,
      }}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{ height: 250, aspectRatio: "1" }}
        >
          {/* Center logo */}
          <div
            className="absolute flex items-center justify-center z-[999]"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 60,
              height: 60,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                animation: exiting ? "none" : "loader-icon-pulse 2s infinite ease-in-out",
              }}
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
            </div>
          </div>

          {/* Ripple boxes */}
          {BOXES.map((box) => (
            <div
              key={box.z}
              className="absolute rounded-full"
              style={{
                width: `${box.size}%`,
                aspectRatio: "1",
                zIndex: box.z,
                background: isDark
                  ? "linear-gradient(0deg, rgba(50,50,50,0.2) 0%, rgba(100,100,100,0.2) 100%)"
                  : "linear-gradient(0deg, rgba(200,200,200,0.25) 0%, rgba(150,150,150,0.25) 100%)",
                borderTop: `1px solid ${isDark ? `rgba(100,100,100,${box.borderOpacity})` : `rgba(180,180,180,${box.borderOpacity})`}`,
                boxShadow: isDark
                  ? "0 10px 10px 0 rgba(0,0,0,0.3)"
                  : "0 10px 10px 0 rgba(0,0,0,0.08)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                animation: exiting
                  ? "none"
                  : `loader-ripple 2s ${box.delay}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>

        {/* Loading text — extra top spacing */}
        <div className="relative h-8 overflow-hidden" style={{ width: 220, marginTop: 48 }}>
          {/* "Still Brewing" */}
          <span
            className="absolute inset-0 flex items-center justify-center font-modern text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-500 ease-in-out"
            style={{
              color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
              opacity: exiting ? 0 : showAlmost ? 0 : 1,
              transform: exiting
                ? "translateY(20px)"
                : showAlmost
                  ? "translateY(-24px)"
                  : "translateY(0)",
            }}
          >
            Still Brewing<span style={{ minWidth: 24, display: "inline-block", textAlign: "left" }}>{dots}</span>
          </span>

          {/* "Almost There" */}
          <span
            className="absolute inset-0 flex items-center justify-center font-modern text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-500 ease-in-out"
            style={{
              color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
              opacity: exiting ? 0 : showAlmost ? 1 : 0,
              transform: exiting
                ? "translateY(20px)"
                : showAlmost
                  ? "translateY(0)"
                  : "translateY(24px)",
            }}
          >
            Almost There<span style={{ minWidth: 24, display: "inline-block", textAlign: "left" }}>{dots}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
