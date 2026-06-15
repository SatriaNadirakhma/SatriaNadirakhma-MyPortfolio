import { useState, useEffect } from "react";
import { useTheme } from "@context/ThemeContext";
import { ErrorBoundary } from "@components/ErrorBoundary";
import Sidebar from "@components/Sidebar";
import LoadingScreen from "@components/LoadingScreen";
import Marquee from "@components/Marquee";
import Hero from "@sections/Hero";
import About from "@sections/About";
import Experience from "@sections/Experience";
import Projects from "@sections/Projects";
import Champions from "@sections/Champions";
import Skills from "@sections/Skills";
import Connect from "@sections/Connect";
import Footer from "@sections/Footer";
import { SECTION_IDS, MARQUEE_ITEMS } from "@constants/index";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <ErrorBoundary>
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

      <div
        className="min-h-screen relative bg-[#fafafa] text-gray-900 dark:bg-[#080808] dark:text-gray-100 transition-colors duration-300"
        style={{
          visibility: isLoading ? "hidden" : "visible",
          transition: isLoading ? "none" : "opacity 0.4s ease, background-color 0.3s ease",
          opacity: isLoading ? 0 : 1,
        }}
      >
        {/* Noise texture overlay — dark only */}
        <div
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: isDark
              ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
              : "none",
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
            opacity: isDark ? 0.03 : 0,
          }}
        />

        {/* Warm glow top-right */}
        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at top right, rgba(255,140,50,0.04) 0%, transparent 70%)"
              : "radial-gradient(ellipse at top right, rgba(59,130,246,0.03) 0%, transparent 70%)",
          }}
        />

        <Sidebar />

        <main className="relative z-[2]">
          <section id={SECTION_IDS.hero}>
            <Hero />
          </section>

          <Marquee items={MARQUEE_ITEMS.primary} speed={35} />

          <section id={SECTION_IDS.about}>
            <About />
          </section>
          <section id={SECTION_IDS.experience}>
            <Experience />
          </section>

          <Marquee items={MARQUEE_ITEMS.secondary} speed={28} />

          <section id={SECTION_IDS.projects}>
            <Projects />
          </section>
          <section id={SECTION_IDS.champions}>
            <Champions />
          </section>

          <Marquee items={MARQUEE_ITEMS.tech} speed={20} />

          <section id={SECTION_IDS.skills}>
            <Skills />
          </section>
          <section id={SECTION_IDS.connect}>
            <Connect />
          </section>
          <Footer />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
