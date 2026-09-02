import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { allProjects, projectFilters } from "@data/projects";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";
import Reveal from "@components/Reveal";
import Sidebar from "@components/Sidebar";
import Footer from "@sections/Footer";

const Card = ({ title, description, image, link, icon: Icon, category, index = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
    className="group flex flex-col rounded-[4px] border border-[#e5edf5] dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden transition-colors duration-150 hover:border-[#b9b9f9]/60 dark:hover:border-white/15 focus-within:border-[#b9b9f9]/60 dark:focus-within:border-white/25"
  >
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
      <h3 className="mt-2 text-lg font-light text-gray-900 dark:text-white leading-snug tracking-[-0.01em]">{title}</h3>
      <p className="mt-2 text-sm font-light text-gray-500 dark:text-white/40 leading-relaxed">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-3 inline-flex items-center gap-1 text-sm font-normal text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4"
      >
        Visit project
        <span className="relative w-3.5 h-3.5 inline-block" aria-hidden="true">
          <ChevronRight className="absolute inset-0 w-3.5 h-3.5 transition-all duration-200 group-hover/link:opacity-0 group-hover/link:translate-x-0.5" />
          <ArrowRight className="absolute inset-0 w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
        </span>
      </a>
    </div>
  </motion.article>
);

const AllProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered =
    activeFilter === "All" ? allProjects : allProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 dark:bg-[#080808] dark:text-gray-100 transition-colors duration-300">
      <Sidebar />
      <div className="px-5 sm:px-8 pt-28 pb-4">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-normal text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </Reveal>
      </div>

      <section className="px-5 sm:px-8 pb-8 sm:pb-12">
        <Reveal>
          <div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] rounded-[4px] p-6 sm:p-8 lg:p-12">
            <PlusCorners />
            <SectionHeader
              title={
                <>
                  All projects<span className="text-emerald-600 dark:text-emerald-400">.</span>
                </>
              }
              description="Complete collection — every build, from landing pages to design systems, in a 2-column grid."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
              {filtered.map((project, i) => (
                <Card key={`page-${project.title}`} {...project} index={i} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>
      <Footer />
    </div>
  );
};

export default AllProjectsPage;
