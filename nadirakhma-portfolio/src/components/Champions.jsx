// src/components/Champions.jsx
import { useState } from "react";
import EFest from "../assets/image/efest.png";
import { Trophy, ArrowUpRight, X } from "lucide-react";

const champions = [
  {
    title: "1st Champions — Poster Mahasiswa Category",
    event: "E-Fest 2025",
    description:
      "Collaboration between Oranji Studio and the Information Technology Student Association (HMTI) to design and develop HMTI merchandise products. (picture source: Instagram @hmtipolinema)",
    image: EFest,
    link: "https://www.instagram.com/p/DDTd64kSFEY/?img_index=1",
    icon: Trophy,
    year: "2025",
  },
];

const ChampionCard = ({ title, event, description, image, link, icon: Icon, year }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`group relative border rounded-2xl overflow-hidden transition-all duration-300 max-w-md ${
        expanded
          ? "border-orange-500/30 bg-orange-500/5"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
      }`}
    >
      {/* Image strip */}
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover brightness-40 group-hover:brightness-55 transition-all duration-500 scale-105 group-hover:scale-100"
          loading="lazy"
        />
        {/* Icon overlay */}
        <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-orange-400" />
        </div>
        {/* Year badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
          <span className="text-[9px] tracking-widest uppercase font-modern text-white/50">{year}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase font-modern text-orange-400/70 mb-1.5">
          {event}
        </p>
        <h3 className="text-base sm:text-lg font-modern font-bold text-white leading-snug mb-3">
          {title}
        </h3>

        {/* Description toggle */}
        <div
          className={`overflow-hidden transition-all duration-400 ${
            expanded ? "max-h-40 mb-4" : "max-h-0"
          }`}
        >
          <p className="text-xs sm:text-sm font-modern text-white/45 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[10px] tracking-[0.15em] uppercase font-modern text-white/35 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
          >
            {expanded ? (
              <><X className="w-3 h-3" /> Close</>
            ) : (
              <>Details</>
            )}
          </button>
          <span className="text-white/10">|</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.15em] uppercase font-modern text-white/35 hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
          >
            View Post <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Champions = () => {
  return (
    <section id="champions" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <div className="w-6 h-px bg-white/20" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/30">
            License &amp; Awards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          {/* Left: title */}
          <h2
            className="font-stylish italic text-white leading-[0.92]"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            Champions<br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                color: "transparent",
              }}
            >
              &amp; Awards
            </span>
          </h2>

          {/* Right: cards */}
          <div className="flex flex-wrap gap-4">
            {champions.map((item, i) => (
              <ChampionCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Champions;
