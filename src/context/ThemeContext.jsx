import { createContext, useContext, useEffect, useLayoutEffect, useState, useCallback, useMemo } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(undefined);

const THEME_KEY = "portfolio-theme";

function getSystemDark() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getStoredTheme() {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "system";
}

/* Ganti tema dalam SATU frame yang sinkron.
   Masalah sebelumnya: komponen yang membaca `resolvedTheme` (NotchNav) berubah
   saat commit React, sedangkan class `.dark` baru dipasang di useEffect (setelah
   paint) — navbar dan halaman berganti di waktu berbeda, ditambah puluhan
   `transition-colors` dengan durasi berlainan. Sekarang:
   1. `.theme-switching` mematikan semua transisi CSS (lihat index.css),
   2. state + class `.dark` diperbarui sinkron (flushSync + useLayoutEffect),
   3. View Transitions meng-crossfade seluruh halaman sekali (300ms) — satu
      timeline untuk semua elemen. Tanpa dukungan / reduced-motion: flip instan. */
function runThemeChange(update) {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("theme-switching");
  const finish = () => root.classList.remove("theme-switching");

  if (!reduceMotion && typeof document.startViewTransition === "function") {
    const transition = document.startViewTransition(() => {
      flushSync(update);
    });
    transition.finished.then(finish, finish);
    return;
  }

  flushSync(update);
  // Paksa style recalc dengan transisi masih mati, baru aktifkan lagi.
  void root.offsetHeight;
  setTimeout(finish, 50);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme);
  const [systemDark, setSystemDark] = useState(getSystemDark);

  const resolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  const applyTheme = useCallback((t) => {
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = t === "dark" ? "#080808" : "#fafafa";
    }
  }, []);

  // Layout effect: class `.dark` terpasang SEBELUM paint, di commit yang sama
  // dengan re-render NotchNav — bukan satu frame sesudahnya.
  useLayoutEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme, applyTheme]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((next) => {
    runThemeChange(() => setThemeState(next));
  }, []);

  const toggleTheme = useCallback(() => {
    runThemeChange(() => {
      setThemeState((prev) => {
        const current = prev === "system" ? (getSystemDark() ? "dark" : "light") : prev;
        return current === "dark" ? "light" : "dark";
      });
    });
  }, []);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme, toggleTheme }), [theme, resolvedTheme, setTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}