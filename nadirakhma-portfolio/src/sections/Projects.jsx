import { useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { useTheme } from "@context/ThemeContext";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { ArrowUpRight } from "lucide-react";
import { allProjects, projectFilters } from "@data/projects";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import ScrollHeading from "@components/ScrollHeading";
import ParallaxImage from "@components/ParallaxImage";
import TiltCard from "@components/TiltCard";

const ProjectCard = ({
  title,
  description,
  image,
  link,
  icon: Icon,
  category,
  index,
}) => {
  const [hovered, setHovered] = useState(false);

  // Same touch/mouse detection CustomCursor already uses. On a coarse
  // pointer there's no reliable hover event to gate the info panel and
  // the visit button behind — `:hover`/`group-hover` either never fires
  // or only fires as a one-tap "ghost hover" that eats the first tap
  // instead of opening the link. So on touch, just treat the card as
  // permanently revealed instead of waiting for a hover that won't come.
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isRevealed = hovered || !hasFinePointer;

  // Mouse-tracked spotlight sheen — its own motion values on an inner
  // wrapper (not on TiltCard's root) so it can't fight whatever mouse
  // listener TiltCard already attaches for the 3D tilt itself.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18), transparent 70%)`;

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <TiltCard
      maxTilt={7}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-white/20 cursor-pointer hover:border-gray-300 dark:hover:border-white/15 hover:shadow-[0_24px_60px_rgba(0,0,0,0.16)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
    >
      <div className="relative w-full h-full" onMouseMove={handlePointerMove}>
        {/* Spotlight — sits above the image, below the panel, so it reads
            as a glossy highlight sweeping across the whole card. Left as
            a pure hover extra — there's no cursor position to visualize
            on touch anyway, so it just stays dormant there. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: spotlight }}
        />

        {/* Index tag — editorial "01 / 02" marker. Hover-only reveal on
            desktop, always-on on touch so it isn't stuck invisible. */}
        <span
          className={`absolute top-4 left-4 z-20 font-modern text-[11px] tracking-[0.2em] text-white/70 transition-all duration-300 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Floating visit button — replaces the old inline text link.
            Always visible + tappable on touch, since group-hover would
            otherwise leave it invisible at opacity-0 with no way to
            trigger it. Desktop keeps the hover-in entrance. */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Visit ${title}`}
          className={`absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-white/95 text-black transition-all duration-300 hover:bg-white hover:rotate-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>

        <ParallaxImage amount={36} className="aspect-4/3">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              hovered ? "scale-110 brightness-50" : "scale-100 brightness-90"
            }`}
            loading="lazy"
          />
        </ParallaxImage>

        {/* Glass info panel */}
        <div className="absolute inset-x-0 bottom-0 z-10 backdrop-blur-xl bg-white/10 dark:bg-black/40 border-t border-white/10 px-4 sm:px-5 pt-3 pb-4 sm:pb-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-3 h-3 text-orange-400" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-modern text-white/70">
              {category}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-modern font-bold text-white leading-tight line-clamp-2">
            {title}
          </h3>

          <div
            className={`transition-all duration-300 overflow-hidden ${
              isRevealed ? "max-h-72 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-xs sm:text-sm font-modern text-white/55 leading-relaxed">
              {description}
            </p>
          </div>
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
            <ProjectCard
              key={`${project.title}-${i}`}
              {...project}
              index={i}
            />
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