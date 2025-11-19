import React, { useState } from "react";
import ProjectGenesis from "../assets/project-genesis.jpg";
import ProjectOther from "../assets/project-other.jpg";
import { Code, Palette, ArrowRight } from "lucide-react";

const projects = {
  development: [
    {
      title: "K3 Siantar Top",
      description:
        "Developing a landing page web-based application project for K3 (Keselamatan dan Kesehatan Kerja) for PT Siantar Top. ",
      image: ProjectOther,
      link: "https://k3-phi.vercel.app/",
      icon: Code,
      color: "from-emerald-700/80 to-emerald-900/60",
    },
    {
      title:
        "Sistem Informasi Pendaftaran & Integrasi TOEIC Polinema (SIPINTA)",
      description:
        "Developing a web-based system designed to simplify the TOEIC registration process for Polinema students while integrating user access across the entire academic community.",
      image: ProjectOther,
      link: "https://github.com/SatriaNadirakhma/PBLSEM4",
      icon: Code,
      color: "from-blue-700 to-blue-900/80",
    },
    {
      title: "Sistem Informasi Tata Tertib",
      description:
        "Developing a digital platform designed to simplify and improve campus regulation management. The system allows students, lecturers, and staff to access disciplinary information quickly and transparently. ",
      image: ProjectOther,
      link: "https://github.com/aldofebryn/project",
      icon: Code,
      color: "from-yellow-700/80 to-yellow-900/60",
    },
    {
      title: "Sistem Ekspedisi (Terminal)",
      description:
        "Developing a Java-based expedition management system operated via terminal to simulate the workflow of delivery services in Indonesia. ",
      image: ProjectOther,
      link: "https://github.com/zidnafaz/Sistem-Ekspedisi",
      icon: Code,
      color: "from-red-700/80 to-gray-500",
    },
  ],
  graphicDesign: [
    {
      title: "Oranji Studio x HMTI Polinema",
      description:
        "Collaboration between Oranji Studio and the Information Technology Student Association (HMTI) to design and develop HMTI merchandise products",
      image: ProjectGenesis,
      link: "https://www.instagram.com/p/DDTd64kSFEY/?img_index=1",
      icon: Palette,
      color: "from-pink-700/80 to-pink-900/60",
    },
  ],
};

const ProjectCard = ({
  title,
  description,
  image,
  link,
  icon: Icon,
  color,
}) => {
  const [flipped, setFlipped] = useState(false);

  // Teks panjang untuk bagian belakang kartu
  const longText = Array.from({ length: 1 })
    .map(() => description)
    .join(" ");

  return (
    <div className="w-[28rem] h-[26rem] perspective">
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
          <div className="absolute left-0 right-0 bottom-0 h-44 bg-white/6 backdrop-blur-sm" />

          <div className="absolute top-6 left-6">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col gap-2">
            <h3 className="text-3xl font-modern font-bold drop-shadow-sm">
              {title}
            </h3>
            <p className="text-base font-modern text-white/90 line-clamp-3 leading-relaxed mt-2">
              {description}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setFlipped(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-modern transition hover:bg-white/20 cursor-pointer"
                aria-label={`Learn more about ${title}`}
              >
                Detail Proyek <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-gray-900 text-sm font-modern font-semibold transition hover:bg-white cursor-pointer"
                aria-label={`Visit ${title}`}
              >
                Lihat Proyek
              </a>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="cardFace cardBack absolute inset-0 rounded-2xl overflow-hidden bg-neutral-900 p-8 text-white"
          aria-hidden={flipped ? "false" : "true"}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-modern font-bold mb-2">{title}</h3>
              <div className="flex items-center gap-2 text-indigo-300 text-sm">
                <Icon className="w-4 h-4" />
                <span>Project Details</span>
              </div>
            </div>
            <button
              onClick={() => setFlipped(false)}
              className="ml-4 inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/6 border border-white/10 text-sm hover:bg-white/20 transition cursor-pointer"
              aria-label="Back"
            >
              Kembali
            </button>
          </div>

          <div className="text-indigo-200 leading-relaxed text-sm font-modern overflow-y-auto h-[calc(100%-88px)] pr-2">
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

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-000000/100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-6xl md:text-8xl font-stylish italic text-white text-center mb-3">
          Featured Projects
        </h2>
        <p className="text-center text-gray-300 text-lg font-modern mb-12">
          Collections of portfolio's best projects in development and graphic
          design.
        </p>

        {/* Development Section */}
        <div className="mb-16">
          <h3 className="text-4xl font-stylish italic text-white mb-8 pl-2">
            Development
          </h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar px-2 py-4 snap-x snap-mandatory">
            {projects.development.map((project, i) => (
              <div key={`dev-${i}`} className="snap-start">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* Graphic Design Section */}
        <div>
          <h3 className="text-4xl font-stylish italic text-white mb-8 pl-2">
            Graphic Design
          </h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar px-2 py-4 snap-x snap-mandatory">
            {projects.graphicDesign.map((project, i) => (
              <div key={`gd-${i}`} className="snap-start">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
};

export default Projects;
