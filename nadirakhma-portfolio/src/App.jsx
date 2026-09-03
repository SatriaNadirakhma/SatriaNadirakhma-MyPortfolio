import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { LenisProvider, useLenis } from "@context/LenisContext";
import ScrollToTop from "@components/ScrollToTop";
import Sidebar from "@components/Sidebar";
import LoadingScreen from "@components/LoadingScreen";
import InView from "@components/InView";
import Hero from "@sections/Hero";
import About from "@sections/About";
import Collaborations from "@sections/Collaborations";
import Connect from "@sections/Connect";
import Footer from "@sections/Footer";
import { SECTION_IDS } from "@constants/index";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Heavy below-fold sections — split to separate chunks and only load when near viewport
const Experience = lazy(() => import("@sections/Experience"));
const Projects = lazy(() => import("@sections/Projects"));
const Champions = lazy(() => import("@sections/Champions"));
const Skills = lazy(() => import("@sections/Skills"));
const Github = lazy(() => import("@sections/Github"));
const Playlist = lazy(() => import("@sections/Playlist"));
const AllProjectsPage = lazy(() => import("@/pages/AllProjectsPage"));

// Shared fade-in-from-top variant for eager (non-lazy) sections.
// Repeats every time the section re-enters the viewport (scroll up or down).
const fadeInFromTop = {
  initial: { opacity: 0, y: -40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function Landing({ heroReady = false }) {
  const location = useLocation();
  const { lenis } = useLenis();

  // Handle direct navigation to /#sectionId (e.g. from /projects)
  // and hash changes, with retry for lazy InView sections
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        if (lenis) lenis.scrollTo(`#${id}`, { offset: -64 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (attempts++ < 12) setTimeout(tryScroll, 200);
    };
    // Small delay to let lazy sections mount after route change
    const t = setTimeout(tryScroll, 150);
    return () => clearTimeout(t);
  }, [location.hash, lenis]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative bg-[#fafafa] text-gray-900 dark:bg-[#080808] dark:text-gray-100 transition-colors duration-300">
        <Sidebar />
        <motion.main
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <section id={SECTION_IDS.hero}>
            <Hero startIntro={heroReady} />
          </section>

          <motion.section
            id={SECTION_IDS.collaborations}
            {...fadeInFromTop}
          >
            <Collaborations />
          </motion.section>

          <motion.section
            id={SECTION_IDS.about}
            {...fadeInFromTop}
          >
            <About />
          </motion.section>

          <InView minHeight={500}>
            <Suspense fallback={null}>
              <section id={SECTION_IDS.experience}>
                <Experience />
              </section>
            </Suspense>
          </InView>

          <InView minHeight={600}>
            <Suspense fallback={null}>
              <section id={SECTION_IDS.projects}>
                <Projects />
              </section>
            </Suspense>
          </InView>

          <InView minHeight={500}>
            <Suspense fallback={null}>
              <section id={SECTION_IDS.champions}>
                <Champions />
              </section>
            </Suspense>
          </InView>

          <InView minHeight={400}>
            <Suspense fallback={null}>
              <section id={SECTION_IDS.skills}>
                <Skills />
              </section>
            </Suspense>
          </InView>

          <InView minHeight={300}>
            <Suspense fallback={null}>
              <section id={SECTION_IDS.github}>
                <Github />
              </section>
            </Suspense>
          </InView>

          <InView minHeight={300}>
            <Suspense fallback={null}>
              <section id={SECTION_IDS.playlist}>
                <Playlist />
              </section>
            </Suspense>
          </InView>

          <motion.section
            id={SECTION_IDS.connect}
            {...fadeInFromTop}
          >
            <Connect />
          </motion.section>
          <Footer />
        </motion.main>
      </div>
    </ErrorBoundary>
  );
}

function AppInner() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!ready) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => { document.body.style.overflow = ""; };
  }, [ready, lenis]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <LoadingScreen
            onLoadingComplete={() => {
              setReady(true);
              setTimeout(() => setShowLoader(false), 800);
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ visibility: ready ? "visible" : "hidden" }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing heroReady={ready} />} />
          <Route
            path="/projects"
            element={
              <Suspense fallback={null}>
                <AllProjectsPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <LenisProvider>
      <AppInner />
      <SpeedInsights />
    </LenisProvider>
  );
}

export default App;