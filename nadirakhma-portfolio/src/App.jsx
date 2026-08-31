import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { LenisProvider, useLenis } from "@context/LenisContext";
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

function Landing() {
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
      <LoadingScreen />
      <div className="min-h-screen relative bg-[#fafafa] text-gray-900 dark:bg-[#080808] dark:text-gray-100 transition-colors duration-300">
        <Sidebar />
        <main className="relative">
          <section id={SECTION_IDS.hero}>
            <Hero />
          </section>

          <section id={SECTION_IDS.collaborations}>
            <Collaborations />
          </section>

          <section id={SECTION_IDS.about}>
            <About />
          </section>

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

          <section id={SECTION_IDS.connect}>
            <Connect />
          </section>
          <Footer />
        </main>
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <LenisProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<AllProjectsPage />} />
      </Routes>
      <SpeedInsights />
    </LenisProvider>
  );
}

export default App;
