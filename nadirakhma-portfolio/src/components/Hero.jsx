import { Element } from 'react-scroll';
import Profile1 from "../assets/profile1.jpg";
import { ArrowRight, Sparkles, Download } from "lucide-react";

const Hero = () => {
  return (
    <Element name="hero">
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center text-center py-20 px-6 overflow-hidden"
      >
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-float-slow"></div>

        {/* Glassmorphic Badge */}
        <div className="relative inline-block mb-12 group">
          
          <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-1 border border-white/20 shadow-2xl">
            <div className="rounded-full px-8 py-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white text-xl font-stylish">
                Nadi Rakhma
              </span>
            </div>
          </div>
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-white mb-6 font-stylish italic">
          <span>This is</span>
          <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            Satria Rakhmadani
          </span>
          <span className="block text-indigo-300/80">
            Explore the work.
          </span>
        </h1>

        {/* Subtitle with typing effect simulation */}
        <div className="mb-12 flex items-center gap-3">
          <p className="text-lg md:text-xl text-indigo-300 font-modern center flex items-center gap-2">
            Graphic Designer <span className="text-orange-500 md:text-4xl text-2xl">/</span> Front-End Developer
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 md:mb-16 px-4">
          <a
            href="#projects"
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl font-semibold text-sm md:text-base text-white shadow-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </a>

          <button className="group px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl font-semibold text-sm md:text-base text-white shadow-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              <Download className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-y-1 transition-transform duration-300" />
              Download CV
            </span>
          </button>
        </div>

        {/* Profile Image with Glassmorphism Frame */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          
          {/* Glass Frame */}
          <div className="relative bg-white/5 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={Profile1}
                alt="Satria Rakhmadani"
                className="w-80 h-96 md:w-[500px] md:h-[600px] object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110">
            <p className="text-3xl font-bold text-orange-500">5+</p>
            <p className="text-sm text-indigo-300">Projects</p>
          </div>

          <div className="absolute -right-8 bottom-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110">
            <p className="text-3xl font-bold text-purple-500">3+</p>
            <p className="text-sm text-indigo-300">Years Exp</p>
          </div>
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes scroll {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(12px);
              opacity: 0;
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float 8s ease-in-out infinite 2s;
          }

          .animate-float-slow {
            animation: float 10s ease-in-out infinite 4s;
          }

          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }

          .animate-scroll {
            animation: scroll 2s ease-in-out infinite;
          }
        `}</style>
      </section>
    </Element>
  );
};

export default Hero;
