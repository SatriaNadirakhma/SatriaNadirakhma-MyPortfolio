// src/App.jsx
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Connect from "./components/Connect";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative flex min-h-screen bg-black text-gray-100 overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900"></div>

        {/* Aurora Layers (responsive heights) */}
        <div className="absolute top-0 left-0 right-0 h-[300px] md:h-[500px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-3xl animate-aurora"></div>

        <div className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[500px] bg-gradient-to-t from-blue-600/20 via-cyan-600/10 to-transparent blur-3xl animate-aurora-reverse"></div>

        {/* Radial Gradients (responsive sizes) */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse-slow animation-delay-3000"></div>

        {/* Stars/Particles */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                              radial-gradient(2px 2px at 60% 70%, white, transparent),
                              radial-gradient(1px 1px at 50% 50%, white, transparent),
                              radial-gradient(1px 1px at 80% 10%, white, transparent),
                              radial-gradient(2px 2px at 90% 60%, white, transparent),
                              radial-gradient(1px 1px at 33% 50%, white, transparent),
                              radial-gradient(1px 1px at 75% 80%, white, transparent)`,
            backgroundSize: "200% 200%",
            opacity: 0.08,
          }}
        />
      </div>

      {/* Sidebar: hidden on small screens, visible on md+ */}
      <div className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:z-10">
        <Sidebar />
      </div>

      {/* Mobile bottom nav (simple, accessible) */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 md:hidden bg-black/60 backdrop-blur rounded-full px-3 py-2 flex gap-4 items-center">
        <a
          href="#hero"
          className="text-sm text-gray-200 px-3 py-2 rounded-full hover:bg-white/5 font-modern"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-sm text-gray-200 px-3 py-2 rounded-full hover:bg-white/5 font-modern"
        >
          About
        </a>
        <a
          href="#experience"
          className="text-sm text-gray-200 px-3 py-2 rounded-full hover:bg-white/5 font-modern"
        >
          Experience
        </a>
        <a
          href="#projects"
          className="text-sm text-gray-200 px-3 py-2 rounded-full hover:bg-white/5 font-modern"
        >
          Projects
        </a>
        <a
          href="#connect"
          className="text-sm text-gray-200 px-3 py-2 rounded-full hover:bg-white/5 font-modern"
        >
          Contact
        </a>
      </nav>

      <main className="relative z-0 flex-1 overflow-y-auto px-20 py-0 ml-0 md:ml-0">
        <section id="hero" className="pt- md:pt-0 lg:pt-0 pb-8">
          <Hero />
        </section>

        <section id="about" className="pt-8 md:pt-12 pb-8">
          <About />
        </section>

        <section id="experience" className="pt-16 md:pt-24 pb-8">
          <Experience />
        </section>

        <section id="projects" className="pt-16 md:pt-24 pb-8">
          <Projects />
        </section>

        <section id="skills" className="pt-16 md:pt-24 pb-8">
          <Skills />
        </section>

        <section id="connect" className="pt-16 md:pt-24 pb-8">
          <Connect />
        </section>

        <footer className="pt-8 md:pt-12">
          <Footer />
        </footer>
      </main>

      <style>{`
        @keyframes aurora {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0px);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-50px);
          }
        }

        @keyframes aurora-reverse {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0px);
          }
          50% {
            opacity: 0.6;
            transform: translateY(50px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        .animate-aurora {
          animation: aurora 15s ease-in-out infinite;
        }

        .animate-aurora-reverse {
          animation: aurora-reverse 20s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}

export default App;
