import { useState } from "react";
import { Building, Users, ArrowUpRight, X } from "lucide-react";
import { experiences, accentColors } from "@data/experiences";
import { SECTION_IDS } from "@constants/index";

const ExperienceCard = ({ title, company, date, description, image, icon, link, accent }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = icon === "users" ? Users : Building;

  return (
    <div
      className={`group relative border rounded-2xl overflow-hidden transition-all duration-300 ${
        expanded
          ? accentColors[accent]
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
      }`}
    >
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src={image}
          alt={`${title} -- ${company}`}
          className="w-full h-full object-cover brightness-40 group-hover:brightness-50 transition-all duration-500 scale-105 group-hover:scale-100"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-white/80" />
        </div>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
          <span className="text-[9px] tracking-widest uppercase font-modern text-white/50">
            {date}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase font-modern text-white/30 mb-1.5">
          {company}
        </p>
        <h3 className="text-base sm:text-lg font-modern font-bold text-white leading-snug mb-3 whitespace-pre-line">
          {title}
        </h3>

        <div
          className={`overflow-hidden transition-all duration-400 ${
            expanded ? "max-h-40 mb-4" : "max-h-0"
          }`}
        >
          <p className="text-xs sm:text-sm font-modern text-white/45 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[10px] tracking-[0.15em] uppercase font-modern text-white/35 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
          >
            {expanded ? (
              <>
                <X className="w-3 h-3" /> Close
              </>
            ) : (
              <>Learn More</>
            )}
          </button>
          <span className="text-white/10">|</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.15em] uppercase font-modern text-white/35 hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
          >
            Social Media <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id={SECTION_IDS.experience} className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <div className="w-6 h-px bg-white/20" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/30">
            Experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          <h2
            className="font-modern font-bold text-white leading-[0.92]"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            My
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                color: "transparent",
              }}
            >
              Journey
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} {...exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
