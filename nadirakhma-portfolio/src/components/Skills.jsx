// src/components/Skills.jsx
import { useState } from "react";
import { ChevronDown, Code, PenTool, Brain, CheckCircle } from "lucide-react";
// Impor ikon skill dari react-icons
import {
  FaReact,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaBootstrap,
  FaLaravel,
} from "react-icons/fa";

import { RiTailwindCssFill } from "react-icons/ri";

import {
  SiMysql,
  SiFramer,
  SiInkscape,
  SiAdobephotoshop,
  SiAffinity,
} from "react-icons/si";

import { FaGitAlt } from "react-icons/fa6";

// Helper: Ikon Skill - Responsive
const SkillIcon = ({ icon: Icon, name }) => (
  <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 md:p-4 bg-indigo-800/50 rounded-lg transform transition-transform hover:scale-105 sm:hover:scale-110">
    <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
    <span className="text-xs sm:text-sm font-medium text-white text-center leading-tight">
      {name}
    </span>
  </div>
);

// Helper: Dropdown - Responsive
const SkillSection = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/10 backdrop-blur-xl p-0.5 sm:p-1 border border-white/20 shadow-2xl rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 sm:p-5 md:p-6 bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 hover:border-white/30 active:bg-white/15 transition-all cursor-pointer rounded-lg touch-manipulation"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} section`}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
          <h3 className="text-base sm:text-lg md:text-xl font-modern font-semibold text-white text-left">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 sm:w-6 sm:h-6 text-indigo-300 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-4 sm:p-5 md:p-6 bg-indigo-950/50">{children}</div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-stylish italic text-center mb-2 sm:mb-3 text-white px-4">
        My Skills
      </h2>
      <p className="text-center text-gray-300 text-sm sm:text-base md:text-lg font-modern mb-8 sm:mb-10 md:mb-12 px-4">
        Skills that I have acquired through learning and experience.
      </p>
      <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-4 sm:gap-5 md:gap-6 px-4">
        {/* Web Development */}
        <SkillSection title="Web Development & Database" icon={Code}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
            <SkillIcon icon={FaHtml5} name="HTML5" />
            <SkillIcon icon={FaCss3Alt} name="CSS3" />
            <SkillIcon icon={FaJs} name="JavaScript" />
            <SkillIcon icon={FaReact} name="React" />
            <SkillIcon icon={FaNodeJs} name="Node.js" />
            <SkillIcon icon={FaBootstrap} name="Bootstrap" />
            <SkillIcon icon={FaLaravel} name="Laravel" />
            <SkillIcon icon={RiTailwindCssFill} name="Tailwind CSS" />
            <SkillIcon icon={SiMysql} name="MySQL" />
            <SkillIcon icon={FaGitAlt} name="Git" />
          </div>
        </SkillSection>

        {/* UI/UX Design */}
        <SkillSection title="Graphic & UI/UX Design" icon={PenTool}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
            <SkillIcon icon={FaFigma} name="Figma" />
            <SkillIcon icon={SiFramer} name="Framer" />
            <SkillIcon icon={SiInkscape} name="Inkscape" />
            <SkillIcon icon={SiAdobephotoshop} name="Adobe Photoshop" />
            <SkillIcon icon={SiAffinity} name="Affinity" />
          </div>
        </SkillSection>

        {/* Soft Skills */}
        <SkillSection title="Soft Skills" icon={Brain}>
          <ul className="space-y-2.5 sm:space-y-3">
            <li className="flex items-start gap-2.5 sm:gap-3 text-indigo-200 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Critical Thinking & Problem Solving</span>
            </li>
            <li className="flex items-start gap-2.5 sm:gap-3 text-indigo-200 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Team work & Collaboration</span>
            </li>
            <li className="flex items-start gap-2.5 sm:gap-3 text-indigo-200 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Adaptability</span>
            </li>
            <li className="flex items-start gap-2.5 sm:gap-3 text-indigo-200 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Time Management</span>
            </li>
            <li className="flex items-start gap-2.5 sm:gap-3 text-indigo-200 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Communication</span>
            </li>
            <li className="flex items-start gap-2.5 sm:gap-3 text-indigo-200 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0 mt-0.5" />
              <span>Attention to Details</span>
            </li>
          </ul>
        </SkillSection>
      </div>
    </section>
  );
};

export default Skills;
