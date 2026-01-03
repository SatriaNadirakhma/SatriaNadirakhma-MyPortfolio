import { useState } from "react";
import EFest from "../assets/image/efest.png";
import { BadgeCheck, Trophy, ArrowRight } from "lucide-react";

const champions = {
  champions: [
    {
      title: "1st Champions Poster Mahasiswa Category - E-Fest 2025",
      description:
        "Collaboration between Oranji Studio and the Information Technology Student Association (HMTI) to design and develop HMTI merchandise products. (picture source: Instagram @hmtipolinema)",
      image: EFest,
      link: "https://www.instagram.com/p/DDTd64kSFEY/?img_index=1",
      icon: Trophy,
      color: "from-black/80 to-gray-900/60",
    },
  ],
};

const ChampionsCard = ({
  title,
  description,
  image,
  link,
  icon: Icon,
  color,
}) => {
  const [flipped, setFlipped] = useState(false);

  const longText = Array.from({ length: 1 })
    .map(() => description)
    .join(" ");

  return (
    <div className="w-[85vw] sm:w-96 md:w-[28rem] h-[22rem] sm:h-[24rem] md:h-[26rem] perspective">
      <div
        className={`cardInner relative w-full h-full rounded-2xl transition-transform duration-700 ${
          flipped ? "is-flipped" : ""
        }`}
        aria-hidden={flipped ? "false" : "true"}
      >
        {/* FRONT */}
        <div
          className="cardFace cardFront absolute inset-0 rounded-2xl overflow-hidden"
          aria-hidden={flipped ? "true" : "false"}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${color} opacity-90`}
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="absolute left-0 right-0 bottom-0 h-36 sm:h-40 md:h-44 bg-white/6 backdrop-blur-sm" />

          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white flex flex-col gap-1 sm:gap-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-modern font-bold drop-shadow-sm line-clamp-2">
              {title}
            </h3>
            <p className="text-sm sm:text-base font-modern text-white/90 line-clamp-2 sm:line-clamp-3 leading-relaxed mt-1 sm:mt-2">
              {description}
            </p>

            <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                onClick={() => setFlipped(true)}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-modern transition hover:bg-white/20 cursor-pointer"
                aria-label={`Learn more about ${title}`}
              >
                Project Details <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              {/* <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/90 text-gray-900 text-xs sm:text-sm font-modern font-semibold transition hover:bg-white cursor-pointer"
                aria-label={`Visit ${title}`}
              >
                Visit Project
              </a> */}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="cardFace cardBack absolute inset-0 rounded-2xl overflow-hidden bg-neutral-900 p-6 sm:p-8 text-white"
          aria-hidden={flipped ? "false" : "true"}
        >
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-modern font-bold mb-2 line-clamp-2">{title}</h3>
              <div className="flex items-center gap-2 text-indigo-300 text-xs sm:text-sm">
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Project Details</span>
              </div>
            </div>
            <button
              onClick={() => setFlipped(false)}
              className="ml-2 sm:ml-4 inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/6 border border-white/10 text-xs sm:text-sm hover:bg-white/20 transition cursor-pointer flex-shrink-0"
              aria-label="Back"
            >
              Kembali
            </button>
          </div>

          <div className="text-indigo-200 leading-relaxed text-xs sm:text-sm font-modern overflow-y-auto h-[calc(100%-72px)] sm:h-[calc(100%-88px)] pr-2">
            {longText}
          </div>
        </div>
      </div>

      <style>{`
        .perspective { perspective: 1100px; }
        .cardInner { transform-style: preserve-3d; }
        .cardFace { 
          backface-visibility: hidden; 
          -webkit-backface-visibility: hidden; 
          transform-style: preserve-3d; 
        }
        .cardFront { transform: rotateY(0deg); }
        .cardBack { transform: rotateY(180deg); }
        .cardInner.is-flipped { transform: rotateY(180deg); }
        .line-clamp-2 { 
          display: -webkit-box; 
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        }
        .line-clamp-3 { 
          display: -webkit-box; 
          -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        }
      `}</style>
    </div>
  );
};

const Champions = () => {
  return (
    <section id="champions" className="py-12 sm:py-16 md:py-20 bg-000000/100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-stylish italic text-white text-center mb-2 sm:mb-3">
          License & Champions
        </h2>
        <p className="text-center text-gray-300 text-base sm:text-lg font-modern mb-8 sm:mb-12 px-4">
          Collections of Certificate & Champions I have achieved
        </p>

        {/* Graphic Design Section */}
        <div>
          <div className="scroll-container">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-2 sm:px-4 py-4 snap-x snap-mandatory">
              {champions.champions.map((champions, i) => (
                <div key={`gd-${i}`} className="snap-start flex-shrink-0">
                  <ChampionsCard {...champions} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          .scroll-container {
            position: relative;
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            );
          }
          
          @media (max-width: 640px) {
            .scroll-container {
              -webkit-mask-image: linear-gradient(
                to right,
                transparent 0%,
                black 3%,
                black 97%,
                transparent 100%
              );
              mask-image: linear-gradient(
                to right,
                transparent 0%,
                black 3%,
                black 97%,
                transparent 100%
              );
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Champions;
