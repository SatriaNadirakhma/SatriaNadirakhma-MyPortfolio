import { useState } from "react";
import { useTheme } from "@context/ThemeContext";
import { ArrowUpRight } from "lucide-react";
import { allProjects, projectFilters } from "@data/projects";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import ScrollHeading from "@components/ScrollHeading";
import ParallaxImage from "@components/ParallaxImage";
import TiltCard from "@components/TiltCard";

const ProjectCard = ({ title, description, image, link, icon: Icon, category }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard
      maxTilt={7}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-white/20 cursor-pointer hover:border-gray-300 dark:hover:border-white/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
    >
      <ParallaxImage amount={36} className="aspect-4/3">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            hovered ? "scale-105 brightness-60" : "scale-100 brightness-90"
          }`}
          loading="lazy"
        />
      </ParallaxImage>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-linear-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-3 h-3 text-white" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-modern text-white">
            {category}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-modern font-bold text-white leading-tight line-clamp-2">
          {title}
        </h3>

        <div
          className={`transition-all duration-300 overflow-hidden ${
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
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-modern text-white border border-white/20 rounded-full px-3 sm:px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Visit Project
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </TiltCard>
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
      <Reveal><div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          <div>
            <ScrollHeading
              className="font-modern font-bold leading-[0.92] text-gray-900 dark:text-white"
              style={{ fontSize: "clamp(36px, 4vw, 72px)" }}
            >
              <span
                style={{
                  color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
                  fontStyle: "italic",
                  WebkitTextStroke: isDark
                    ? "1px rgba(147,197,253,0.5)"
                    : "1px rgba(37,99,235,0.5)",
                }}
              >
                Featured
              </span>
              <br />
              Projects
            </ScrollHeading>
          </div>

          <div className="flex gap-2 flex-wrap">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs tracking-[0.12em] uppercase font-modern transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
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
      </div></Reveal>
    </section>
  );
};

export default Projects;