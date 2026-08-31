import { skillCategories } from "@data/skills";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import SkillPill from "@components/SkillPill";

const Skills = () => {
  return (
    <section id={SECTION_IDS.skills} className="px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12">
        <SectionHeader
          title="My skills."
          description="The working set — every linked tool goes to its official home."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {skillCategories.map((cat) => (
            <div key={cat.label}>
              <p className="section-label mb-4">{cat.label}</p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <SkillPill key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div></Reveal>
    </section>
  );
};

export default Skills;
