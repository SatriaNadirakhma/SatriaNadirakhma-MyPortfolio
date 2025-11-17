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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950"></div>
        
        {/* Aurora Layers */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-3xl animate-aurora"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-blue-600/20 via-cyan-600/10 to-transparent blur-3xl animate-aurora-reverse"></div>
        
        {/* Radial Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-3000"></div>
        
        {/* Stars/Particles */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                                radial-gradient(2px 2px at 60% 70%, white, transparent),
                                radial-gradient(1px 1px at 50% 50%, white, transparent),
                                radial-gradient(1px 1px at 80% 10%, white, transparent),
                                radial-gradient(2px 2px at 90% 60%, white, transparent),
                                radial-gradient(1px 1px at 33% 50%, white, transparent),
                                radial-gradient(1px 1px at 75% 80%, white, transparent)`,
               backgroundSize: '200% 200%',
               opacity: 0.1
             }}>
        </div>
      </div>

      <Sidebar />
      <main className="relative z-10 flex-1 overflow-y-auto p-8 md:p-12 ml-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Connect />
        <Footer />
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
