import React, { useState } from "react";
import { Building, ArrowRight } from "lucide-react";

// ❗ Ganti dengan data pengalaman Anda
const experiences = [
  {
    title: "Graphic Designer",
    company: "Oranji Studio",
    date: "May 2024 - Present",
    description:
      "Designing digital assets such as social media content, promotional materials, and brand visuals based on client and team collaboration.",
    image:
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=1200&q=60",
    color: "from-orange-700/80 to-orange-900/60",
  },
  {
    title: "Creative Media Division Project Coordinator",
    company: "Information Technology Department English Community (ITDEC)",
    date: "Aug 2025 - Present",
    description:
      "Establishing communication between Creative Media teams to determine ITDEC's branding image",
    image:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=60",
    color: "from-emerald-700/80 to-emerald-900/60",
  },
  {
    title: "Pemimpin Redaksi (Editor-in-Chief)",
    company: "Lembaga Pers Mahasiswa (LPM) Kompen Polinema",
    date: "Mar 2025 - Present",
    description:
      "Lead the print media and online media division in managing campus journalistic activities, including media work program, content planning, article editing, and publication design. ",
    image:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=60",
    color: "from-blue-700/80 to-blue-900/60",
  },
];

const ExperienceCard = ({
  title,
  company,
  date,
  description,
  image,
  color,
}) => {
  const [flipped, setFlipped] = useState(false);

  // buat teks panjang (sesuaikan atau ganti dengan teks panjang asli Anda)
  const longText = Array.from({ length: 1 })
    .map(() => description)
    .join(" ");

  return (
    <div className="w-[85vw] sm:w-80 md:w-96 h-[22rem] sm:h-[26rem] md:h-[28rem] perspective flex-shrink-0">
      {/* inner wrapper mengontrol rotasi */}
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
            alt={`${title} - ${company}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${color} opacity-90`}
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="absolute left-0 right-0 bottom-0 h-28 sm:h-32 md:h-36 bg-white/6 backdrop-blur-sm" />

          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Building className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>

          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white flex flex-col gap-1.5 sm:gap-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-modern font-bold drop-shadow-sm line-clamp-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 line-clamp-1">
              {company} • <span className="text-white/70">{date}</span>
            </p>
            <p className="text-xs sm:text-sm font-modern text-white/90 line-clamp-2 sm:line-clamp-3 leading-relaxed mt-1 sm:mt-2">
              {description}
            </p>

            <div className="mt-2 sm:mt-4 flex items-center gap-2">
              <button
                onClick={() => setFlipped(true)}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-modern transition hover:bg-white/20 active:bg-white/30 cursor-pointer touch-manipulation"
                aria-label={`Learn more about ${title}`}
              >
                Learn More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="cardFace cardBack absolute inset-0 rounded-2xl overflow-hidden bg-neutral-900 p-4 sm:p-6 text-white"
          aria-hidden={flipped ? "false" : "true"}
        >
          <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg md:text-xl font-modern font-bold line-clamp-2">
              {title}
            </h3>
            <button
              onClick={() => setFlipped(false)}
              className="ml-2 inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/6 border border-white/10 text-xs sm:text-sm hover:bg-white/20 transition cursor-pointer flex-shrink-0 touch-manipulation"
              aria-label="Back"
            >
              Back
            </button>
          </div>

          {/* isi hanya teks panjang */}
          <div className="text-indigo-200 leading-relaxed text-xs sm:text-sm font-modern overflow-y-auto h-[calc(100%-60px)] sm:h-[calc(100%-72px)] pr-2">
            {longText}
          </div>
        </div>
      </div>

      {/* styles khusus untuk efek 3D */}
      <style>{`
        .perspective { perspective: 1100px; }
        .cardInner { transform-style: preserve-3d; }
        .cardFace { backface-visibility: hidden; -webkit-backface-visibility: hidden; transform-style: preserve-3d; }
        .cardFront { transform: rotateY(0deg); }
        .cardBack { transform: rotateY(180deg); }
        .cardInner.is-flipped { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 bg-000000/100">
      <div className="max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-stylish italic text-white text-center mb-2 sm:mb-3">
          My Experience
        </h2>
        <p className="text-center text-gray-300 text-sm sm:text-base md:text-lg font-modern mb-6 sm:mb-8">
          Make it through for the journey to do soft skills and hard skills
          improvement.
        </p>

        <div className="scroll-container">
          <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar py-4 snap-x snap-mandatory px-2 sm:px-4">
            {experiences.map((exp, i) => (
              <div key={i} className="snap-start">
                <ExperienceCard {...exp} />
              </div>
            ))}
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

          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

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
    </section>
  );
};

export default Experience;
