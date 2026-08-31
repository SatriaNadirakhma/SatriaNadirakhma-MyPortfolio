import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { allProjects } from "@data/projects";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";
import Sidebar from "@components/Sidebar";
import Footer from "@sections/Footer";

const Card = ({ title, description, image, link, icon: Icon, category }) => (
  <article className="group flex flex-col">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${title}`}
      className="block rounded-[4px] border border-gray-200 dark:border-white/[0.07] overflow-hidden bg-white dark:bg-white/[0.02] transition-colors duration-150 group-hover:border-gray-400 dark:group-hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <img src={image} alt={title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
    </a>
    <div className="mt-4 flex flex-col items-start">
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
        className="mt-3 inline-flex items-center gap-1 text-sm font-normal text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4"
      >
        Visit project <ChevronRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
      </a>
    </div>
  </article>
);

const AllProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#080808] transition-colors duration-300">
      <Sidebar />
      <div className="px-5 sm:px-8 pt-28 pb-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-normal text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>

      <section className="px-5 sm:px-8 pb-8 sm:pb-12">
        <div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] rounded-[4px] p-6 sm:p-8 lg:p-12">
          <PlusCorners />
          <SectionHeader
            label="Archive"
            title={
              <>
                All projects<span className="text-emerald-600 dark:text-emerald-400">.</span>
              </>
            }
            description="Complete collection — every build, from landing pages to design systems, in a 2-column grid."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
            {allProjects.map((project) => (
              <Card key={`page-${project.title}`} {...project} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AllProjectsPage;
