// src/App.jsx
import { useState, useEffect } from "react"; // Tambahkan useEffect
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Champions from "./components/Champions";
import Skills from "./components/Skills";
import Connect from "./components/Connect";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Marquee from "./components/Marquee";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Modern Fix: Mencegah user melakukan scroll saat loading screen aktif
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function untuk mencegah bug jika komponen unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* Tambahkan class bersyarat agar konten utama tidak transparan/glitch saat diload */}
      <div
        className={`min-h-screen bg-[#080808] text-gray-100 relative transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* Subtle grain overlay for depth */}
        <div
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
          }}
        />

        {/* Very subtle radial accent — top right */}
        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(255,140,50,0.04) 0%, transparent 70%)",
          }}
        />

        <Sidebar />

        <main className="relative z-[2]">
          <section id="hero">
            <Hero />
          </section>
          <Marquee
            items={[
              "GRAPHIC DESIGN",
              "FRONT-END DEVELOPMENT",
              "UI/UX DESIGN",
              "BRANDING",
              "WEB APPS",
              "CREATIVE CODING",
            ]}
            speed={35}
          />

          <section id="about">
            <About />
          </section>
          <section id="experience">
            <Experience />
          </section>

          <Marquee
            items={[
              "FEATURED PROJECTS",
              "DEVELOPMENT",
              "GRAPHIC DESIGN",
              "WEB APPLICATIONS",
              "LANDING PAGES",
              "DESIGN SYSTEMS",
            ]}
            speed={28}
          />

          <section id="projects">
            <Projects />
          </section>
          <section id="champions">
            <Champions />
          </section>

          <Marquee
            items={[
              "REACT",
              "TAILWIND CSS",
              "FIGMA",
              "PHOTOSHOP",
              "NODE.JS",
              "LARAVEL",
              "MYSQL",
              "GIT",
              "FRAMER",
              "INKSCAPE",
            ]}
            speed={20}
          />

          <section id="skills">
            <Skills />
          </section>
          <section id="connect">
            <Connect />
          </section>
          <Footer />
        </main>

        <style>{`
          html, body {
            background-color: #080808; /* Memastikan background dasar browser berwarna gelap */
            color: #f3f4f6; /* Opsional: set default text color ke abu-abu terang */
            scroll-behavior: smooth;
            margin: 0;
            padding: 0;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  );
}

export default App;
