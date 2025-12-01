import { Element } from "react-scroll";
import Profile1 from "../assets/profile1.jpg";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import cvATS from "../assets/pdf/cv-ats.pdf";

const Hero = () => {
  return (
    <Element name="hero">
      <section
        id="hero"
        className="relative min-h-screen flex items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden"
      >
        {/* Main Container: Responsive Layout */}
        <div className="relative z-10 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* LEFT COLUMN: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Glassmorphic Badge - Responsive */}
            <div className="relative inline-block mb-6 sm:mb-7 md:mb-8 group">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-full p-0.5 sm:p-1 border border-white/20 shadow-2xl">
                <div className="rounded-full px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                  <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-stylish whitespace-nowrap">
                    Nadi Rakhma
                  </span>
                </div>
              </div>
            </div>

            {/* Main Heading with Gradient - Responsive */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-stylish italic leading-tight">
              <span className="block">This is</span>
              <span className="block bg-gradient-to-r from-gray-400 via-gray-500 to-orange-200 bg-clip-text text-transparent animate-gradient-x">
                Satria Rakhmadani
              </span>
              <span className="block text-gray-200">
                Explore the work.
              </span>
            </h1>

            {/* Subtitle - Responsive */}
            <div className="mb-6 sm:mb-7 md:mb-8 flex items-center gap-2 sm:gap-3 flex-wrap justify-center lg:justify-start">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 font-modern">
                Graphic Designer{" "}
                <span className="text-orange-500 text-lg sm:text-xl md:text-2xl lg:text-3xl mx-1.5 sm:mx-2">
                  /
                </span>{" "}
                Front-End Developer
              </p>
            </div>

            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
              <a
                href="https://instagram.com/nadirakhma.svg"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl font-modern font-medium text-xs sm:text-sm md:text-base text-white shadow-lg hover:bg-white/10 hover:border-white/30 active:bg-white/15 transition-all duration-300 hover:scale-105 touch-manipulation"
              >
                <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2 whitespace-nowrap">
                  Design project
                  <ArrowRight className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>

              <a
                href={cvATS}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl font-modern font-medium text-xs sm:text-sm md:text-base text-white shadow-lg hover:bg-white/10 hover:border-white/30 active:bg-white/15 transition-all duration-300 hover:scale-105 touch-manipulation"
              >
                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <Download className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 group-hover:scale-110 transition-transform duration-300" />
                  Download CV
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Profile Image - Responsive */}
          <div className="flex-1 relative group flex justify-center lg:justify-end w-full lg:w-auto">
            {/* Glass Frame */}
            <div className="relative bg-white/5 backdrop-blur-xl p-1.5 sm:p-2 md:p-3 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={Profile1}
                  alt="Satria Rakhmadani"
                  className="w-56 h-64 sm:w-64 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[480px] xl:w-[450px] xl:h-[550px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Decorative Corner Elements - Responsive */}
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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

          /* Mobile optimization */
          @media (max-width: 640px) {
            .animate-float {
              animation: float 6s ease-in-out infinite 0s;
            }

            .animate-float-delayed {
              animation: float 8s ease-in-out infinite 1s;
            }

            .animate-float-slow {
              animation: float 10s ease-in-out infinite 2s;
            }
          }
        `}</style>
      </section>
    </Element>
  );
};

export default Hero;
