import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { LenisProvider } from "@context/LenisContext";
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

function AppContent() {
  return (
    <ErrorBoundary>
      {/* Non-blocking hairline loader — the page renders immediately and
          the bar just reports image preload progress along the top. */}
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
      <AppContent />
      <SpeedInsights />
    </LenisProvider>
  );
}

export default App;
