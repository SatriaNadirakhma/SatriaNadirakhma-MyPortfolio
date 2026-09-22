import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { ArrowUpRight, NavArrowRight as ChevronRight, ArrowRight, OpenNewWindow as ExternalLink } from "iconoir-react";
import { allProjects, projectFilters } from "@data/projects";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";

/**
 * Quiet project card: screenshot in a 1px frame (4px radius, no device
 * chrome, no parallax), then label, title, description and a text link.
 * Hover meniru Benefit ("What you get..."): outer box scale 1.02,
 * inner content counter-scale 1/1.02 sehingga yang membesar hanya
 * kotaknya, teks/icon tetap diam.
 */
const CARD_OUTER =
  "group relative flex flex-col rounded-[4px] border border-[#e5edf5] dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden transition-all duration-150 ease-in-out hover:border-[#b9b9f9]/60 dark:hover:border-white/15 focus-within:border-[#b9b9f9]/60 dark:focus-within:border-white/25 motion-safe:hover:scale-[1.02] hover:z-10";
const CARD_INNER =
  "flex flex-col h-full w-full motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-in-out motion-safe:group-hover:scale-[0.9804]";

const ProjectCard = ({ title, description, image, link, icon: Icon, category }) => {
  return (
    <article className={CARD_OUTER}>
      <div className={CARD_INNER}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${title}`}
        className="block overflow-hidden focus-visible:outline-none"
      >
        <img src={image} alt={title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
      </a>

      <div className="p-5 sm:p-6 flex flex-col items-start">
        <p className="flex items-center gap-2 section-label">
          <Icon aria-hidden="true" focusable="false" className="w-3 h-3" />
          {category}
        </p>
        <h3 className="mt-2 text-lg sm:text-xl font-light text-gray-900 dark:text-white leading-snug tracking-[-0.01em]">
          {title}
        </h3>
        <p className="mt-2 text-sm font-light text-gray-500 dark:text-white/40 leading-relaxed">
          {description}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-3 inline-flex items-center gap-1 text-sm font-normal text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
        >
          Visit project
          <span className="relative w-3.5 h-3.5 inline-block" aria-hidden="true">
            <ChevronRight className="absolute inset-0 w-3.5 h-3.5 transition-all duration-200 group-hover/link:opacity-0 group-hover/link:translate-x-0.5" />
            <ArrowRight className="absolute inset-0 w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
          </span>
        </a>
      </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Mobile (<640px, below the `sm` breakpoint) shows only the 3 latest
  // projects to keep the section compact; larger screens show up to 6.
  // `allProjects` is ordered newest-first, so slicing from the front
  // always yields the latest entries.
  const isMobile = useMediaQuery("(max-width: 639px)");

  const filtered =
    activeFilter === "All" ? allProjects : allProjects.filter((p) => p.category === activeFilter);

  const displayed = filtered.slice(0, isMobile ? 3 : 6);
  const hasMore = allProjects.length > 6;

  return (
    <section id={SECTION_IDS.projects} className="px-5 sm:px-8 ">
      <Reveal>
        <div className="relative max-w-7xl mx-auto border-x border-gray-300 dark:border-white/[0.14] p-6 sm:p-8 lg:p-12 bg-[#fafafa]/80 dark:bg-[#080808]/80 backdrop-blur-md">
          <SectionHeader
            title="Featured projects."
            description="A selection of shipped work — web applications, landing pages, and design systems."
          >
            <div className="flex gap-2 flex-wrap">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-[4px] text-xs font-normal tracking-[0.08em] uppercase transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    activeFilter === filter
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "border border-gray-300 dark:border-white/15 text-gray-500 dark:text-white/35 hover:text-gray-900 dark:hover:text-white hover:border-gray-500 dark:hover:border-white/35"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {displayed.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <Link to="/projects" className="btn-base btn-ghost group">
                See All Projects
                <span className="relative w-3.5 h-3.5 inline-block shrink-0" aria-hidden="true">
                  <ExternalLink aria-hidden="true" focusable="false" className="absolute inset-0 w-3.5 h-3.5 transition-all duration-200 group-hover:opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <ArrowUpRight aria-hidden="true" focusable="false" className="absolute inset-0 w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </Link>
            </div>
          )}

          <p className="mt-8 flex items-center gap-1.5 text-sm font-light text-gray-500 dark:text-white/60">
            <ArrowUpRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
            Every project opens its live build or case study in a new tab.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default Projects;
