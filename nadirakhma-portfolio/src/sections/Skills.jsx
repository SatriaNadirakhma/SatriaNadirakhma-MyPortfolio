import { useTheme } from "@context/ThemeContext";
import { skillCategories } from "@data/skills";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import ScrollHeading from "@components/ScrollHeading";
import SkillPill from "@components/SkillPill";

const Skills = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id={SECTION_IDS.skills} className="py-20 sm:py-28 px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          <ScrollHeading
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
          </ScrollHeading>

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
      </div></Reveal>
    </section>
  );
};

export default Skills;