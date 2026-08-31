import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { allProjects, projectFilters } from "@data/projects";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";

/**
 * Quiet project card: screenshot in a 1px frame (4px radius, no device
 * chrome, no parallax), then label, title, description and a text link.
 * Hover only shifts the frame color — the work speaks, not the effect.
 */
const ProjectCard = ({ title, description, image, link, icon: Icon, category }) => {
  return (
    <article className="group flex flex-col">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${title}`}
        className="block rounded-[4px] border border-gray-200 dark:border-white/[0.07] overflow-hidden bg-white dark:bg-white/[0.02] transition-colors duration-150 group-hover:border-gray-400 dark:group-hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
      </a>

      <div className="mt-4 sm:mt-5 flex flex-col items-start">
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
          className="mt-3 inline-flex items-center gap-1 text-sm font-normal text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
        >
          Visit project
          <ChevronRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  const displayed = filtered.slice(0, 6);
  const hasMore = allProjects.length > 6;

  return (
    <section id={SECTION_IDS.projects} className="px-5 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12">
        <PlusCorners />
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
            <Link to="/projects" className="btn-base btn-ghost">
              See All Projects
              <ArrowUpRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <p className="mt-8 flex items-center gap-1.5 text-sm font-light text-gray-500 dark:text-white/60">
          <ArrowUpRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
          Every project opens its live build or case study in a new tab.
        </p>
      </div></Reveal>
    </section>
  );
};

export default Projects;
