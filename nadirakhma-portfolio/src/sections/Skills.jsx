import { useTheme } from "@context/ThemeContext";
import { ExternalLink } from "lucide-react";
import { skillCategories } from "@data/skills";
import { SECTION_IDS } from "@constants/index";

const SkillPill = ({ icon: Icon, name, url }) => {
  const inner = (
    <span
      className={`group inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border transition-all duration-300 select-none ${
        url
          ? "border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/[0.07] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          : "border-gray-200 dark:border-white/[0.07] bg-transparent text-gray-400 dark:text-white/30 cursor-default"
      }`}
    >
      {Icon && (
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
      )}
      <span className="text-xs sm:text-sm font-modern whitespace-nowrap">{name}</span>
      {url && (
        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex-shrink-0" />
      )}
    </span>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name}`}>
        {inner}
      </a>
    );
  }
  return inner;
};

const Skills = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id={SECTION_IDS.skills} className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          <h2
            className="font-modern font-bold leading-[0.92] text-gray-900 dark:text-white"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            My
            <br />
              <span
                style={{
                  color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
                  fontStyle: "italic",
                  textShadow: isDark
                    ? "-1px -1px 0 rgba(147,197,253,0.5), 1px -1px 0 rgba(147,197,253,0.5), -1px 1px 0 rgba(147,197,253,0.5), 1px 1px 0 rgba(147,197,253,0.5)"
                    : "-1px -1px 0 rgba(37,99,235,0.5), 1px -1px 0 rgba(37,99,235,0.5), -1px 1px 0 rgba(37,99,235,0.5), 1px 1px 0 rgba(37,99,235,0.5)",
                }}
              >
                Skills
              </span>
          </h2>

          <div className="flex flex-col gap-10 sm:gap-12">
            {skillCategories.map((cat) => (
              <div key={cat.label}>
                <p className="text-[10px] tracking-[0.25em] uppercase font-modern text-gray-400 dark:text-white/25 mb-4 sm:mb-5">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {cat.skills.map((skill) => (
                    <SkillPill key={skill.name} {...skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
