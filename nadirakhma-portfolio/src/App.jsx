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
      {/* Aurora Background - Optimized for mobile */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900"></div>

        {/* Aurora Layers - Responsive */}
        <div className="absolute top-0 left-0 right-0 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-b from-purple-600/15 sm:from-purple-600/20 via-pink-600/8 sm:via-pink-600/10 to-transparent blur-2xl sm:blur-3xl animate-aurora"></div>

        <div className="absolute bottom-0 left-0 right-0 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-t from-blue-600/15 sm:from-blue-600/20 via-cyan-600/8 sm:via-cyan-600/10 to-transparent blur-2xl sm:blur-3xl animate-aurora-reverse"></div>

        {/* Radial Gradients - Responsive */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/15 sm:bg-purple-500/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/15 sm:bg-blue-500/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] animate-pulse-slow animation-delay-3000"></div>

        {/* Stars/Particles - Reduced opacity on mobile */}
        <div
          className="absolute inset-0 sm:opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                              radial-gradient(2px 2px at 60% 70%, white, transparent),
                              radial-gradient(1px 1px at 50% 50%, white, transparent),
                              radial-gradient(1px 1px at 80% 10%, white, transparent),
                              radial-gradient(2px 2px at 90% 60%, white, transparent),
                              radial-gradient(1px 1px at 33% 50%, white, transparent),
                              radial-gradient(1px 1px at 75% 80%, white, transparent)`,
            backgroundSize: "200% 200%",
            opacity: 0.05,
          }}
        />
      </div>

      {/* Sidebar: hidden on small screens, visible on lg+ */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-10">
        <Sidebar />
      </div>

      {/* Mobile bottom nav - Responsive & scrollable */}
      <nav className="fixed bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 lg:hidden bg-black/70 backdrop-blur-md rounded-full px-2 sm:px-4 py-2 flex gap-1 sm:gap-2 items-center shadow-lg max-w-[95vw] overflow-x-auto no-scrollbar">
        <a
          href="#hero"
          className="text-xs sm:text-sm text-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-white/10 active:bg-white/20 font-modern whitespace-nowrap transition-colors"
          aria-label="Home"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-xs sm:text-sm text-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-white/10 active:bg-white/20 font-modern whitespace-nowrap transition-colors"
          aria-label="About"
        >
          About
        </a>
        <a
          href="#experience"
          className="text-xs sm:text-sm text-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-white/10 active:bg-white/20 font-modern whitespace-nowrap transition-colors"
          aria-label="Experience"
        >
          Experience
        </a>
        <a
          href="#projects"
          className="text-xs sm:text-sm text-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-white/10 active:bg-white/20 font-modern whitespace-nowrap transition-colors"
          aria-label="Projects"
        >
          Projects
        </a>
        <a
          href="#connect"
          className="text-xs sm:text-sm text-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-white/10 active:bg-white/20 font-modern whitespace-nowrap transition-colors"
          aria-label="Contact"
        >
          Contact
        </a>
      </nav>

      {/* Main content - Responsive padding */}
      <main className="relative z-0 flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-0 ml-0 lg:ml-0 pb-20 lg:pb-8">
        <section id="hero" className="pt-8 sm:pt-12 md:pt-16 lg:pt-0 pb-4 sm:pb-6 md:pb-8">
          <Hero />
        </section>

        <section id="about" className="pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-8">
          <About />
        </section>

        <section id="experience" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8">
          <Experience />
        </section>

        <section id="projects" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8">
          <Projects />
        </section>

        <section id="skills" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8">
          <Skills />
        </section>

        <section id="connect" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8">
          <Connect />
        </section>

        <footer className="pt-8 sm:pt-10 md:pt-12">
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
            transform: translateY(-30px);
          }
        }

        @media (min-width: 768px) {
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
        }

        @keyframes aurora-reverse {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0px);
          }
          50% {
            opacity: 0.6;
            transform: translateY(30px);
          }
        }

        @media (min-width: 768px) {
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
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        @media (min-width: 640px) {
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

        /* Hide scrollbar for mobile nav */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

export default App;
