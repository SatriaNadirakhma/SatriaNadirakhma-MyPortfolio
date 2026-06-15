import { useState } from "react";
import { useTheme } from "@context/ThemeContext";
import { ArrowUpRight } from "lucide-react";
import { allProjects, projectFilters } from "@data/projects";
import { SECTION_IDS } from "@constants/index";

const ProjectCard = ({ title, description, image, link, icon: Icon, category }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.02] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            hovered ? "scale-105 brightness-75" : "scale-100 brightness-50"
          }`}
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-3 h-3 text-orange-400/80" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-modern text-white/40">
            {category}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-modern font-bold text-white leading-tight line-clamp-2">
          {title}
        </h3>

        <div
          className={`transition-all duration-400 overflow-hidden ${
            hovered ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-xs sm:text-sm font-modern text-white/50 line-clamp-2 leading-relaxed mb-3">
            {description}
          </p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-modern text-white border border-white/20 rounded-full px-3 sm:px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300"
          >
            Visit Project
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const filtered =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section id={SECTION_IDS.projects} className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-gray-300 dark:bg-white/20" />
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-gray-500 dark:text-white/30">
                Selected Work
              </p>
            </div>
            <h2
              className="font-modern font-bold leading-[0.92] text-gray-900 dark:text-white"
              style={{ fontSize: "clamp(36px, 6vw, 96px)" }}
            >
              <span
                style={{
                  WebkitTextStroke: isDark
                    ? "1px rgba(255,255,255,0.8)"
                    : "1px rgba(17,24,39,0.65)",
                  color: "transparent",
                }}
              >
                Featured
              </span>
              <br />
              Projects
            </h2>
          </div>

          <div className="flex gap-2 flex-wrap">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs tracking-[0.12em] uppercase font-modern transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                    : "border border-gray-300 dark:border-white/15 text-gray-500 dark:text-white/35 hover:text-gray-900 dark:hover:text-white hover:border-gray-500 dark:hover:border-white/35"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={`${project.title}-${i}`} {...project} />
          ))}
        </div>

        <style>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Projects;
