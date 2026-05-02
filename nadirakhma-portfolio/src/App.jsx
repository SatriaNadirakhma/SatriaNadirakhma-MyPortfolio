// src/App.jsx
import { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  return (
    <>
      {/*
        PERFORMANCE FIX 1:
        LoadingScreen SELALU di-mount (tidak pakai conditional {isLoading && ...}).
        Jika conditional, React unmount sebelum fade-out selesai = glitch.
        LoadingScreen mengurus tampil/sembunyi sendiri via internal state.
      */}
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

      {/*
        PERFORMANCE FIX 2:
        Pakai visibility:hidden bukan opacity-0 + conditional render.
        - visibility:hidden = browser skip paint, tapi DOM tetap ada
        - Karena DOM tetap ada, browser bisa preload gambar hero di background
          selama loading screen tampil → LCP jauh lebih cepat setelah selesai.
      */}
      <div
        className="min-h-screen bg-[#080808] text-gray-100 relative"
        style={{
          visibility: isLoading ? "hidden" : "visible",
          transition: isLoading ? "none" : "opacity 0.4s ease",
          opacity: isLoading ? 0 : 1,
        }}
      >
        <div
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
            opacity: 0.03,
          }}
        />

        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at top right, rgba(255,140,50,0.04) 0%, transparent 70%)" }}
        />

        <Sidebar />

        <main className="relative z-[2]">
          <section id="hero"><Hero /></section>

          <Marquee items={["GRAPHIC DESIGN","FRONT-END DEVELOPMENT","UI/UX DESIGN","BRANDING","WEB APPS","CREATIVE CODING"]} speed={35} />

          <section id="about"><About /></section>
          <section id="experience"><Experience /></section>

          <Marquee items={["FEATURED PROJECTS","DEVELOPMENT","GRAPHIC DESIGN","WEB APPLICATIONS","LANDING PAGES","DESIGN SYSTEMS"]} speed={28} />

          <section id="projects"><Projects /></section>
          <section id="champions"><Champions /></section>

          <Marquee items={["REACT","TAILWIND CSS","FIGMA","PHOTOSHOP","NODE.JS","LARAVEL","MYSQL","GIT","FRAMER","INKSCAPE"]} speed={20} />

          <section id="skills"><Skills /></section>
          <section id="connect"><Connect /></section>
          <Footer />
        </main>

        <style>{`
          html, body {
            background-color: #080808;
            scroll-behavior: smooth;
            margin: 0;
            padding: 0;
          }
          * { box-sizing: border-box; }
        `}</style>
      </div>
    </>
  );
}

export default App;