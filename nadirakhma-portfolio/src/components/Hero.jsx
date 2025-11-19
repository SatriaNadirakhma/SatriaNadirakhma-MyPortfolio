import { Element } from 'react-scroll';
import Profile1 from "../assets/profile1.jpg";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import cvATS from "../assets/pdf/cv-ats.pdf";

const Hero = () => {
  return (
    <Element name="hero">
      <section
        id="hero"
        className="relative min-h-screen flex items-center py-2 px-6 overflow-hidden"
      >
        {/* Main Container: Two Columns */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Glassmorphic Badge */}
            <div className="relative inline-block mb-8 group"> 
              <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-1 border border-white/20 shadow-2xl">
                <div className="rounded-full px-4 py-1.5 md:px-8 md:py-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  <span className="text-white text-lg md:text-xl font-stylish">
                    Nadi Rakhma
                  </span>
                </div>
              </div>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-4 font-stylish italic">
              <span>This is</span>
              <span className="block bg-gradient-to-r from-gray-400 via-gray-500 to-orange-200 bg-clip-text text-transparent animate-gradient-x">
                Satria Rakhmadani
              </span>
              <span className="block text-gray-200">
                Explore the work.
              </span>
            </h1>

            {/* Subtitle with typing effect simulation */}
            <div className="mb-8 flex items-center gap-3">
              <p className="text-sm md:text-xl text-gray-200 font-modern flex items-center gap-2">
                Graphic Designer <span className="text-orange-500 md:text-4xl text-2xl">/</span> Front-End Developer
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
              <a
                href="https://instagram.com/nadirakhma.svg"
                target='_blank'
                rel='noopener noreferrer'
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl font-modern font-medium text-sm md:text-base text-white shadow-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Design project
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>

              <a 
                href={cvATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl font-modern font-medium text-sm md:text-base text-white shadow-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <Download className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform duration-300" />
                  Download CV
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Profile Image with Glassmorphism Frame */}
          <div className="flex-1 relative group flex justify-center lg:justify-end">
            
            {/* Glass Frame */}
            <div className="relative bg-white/5 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={Profile1}
                  alt="Satria Rakhmadani"
                  className="w-80 h-96 md:w-[420px] md:h-[520px] lg:w-[450px] lg:h-[550px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
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
