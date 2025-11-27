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

// Helper: Ikon Skill
const SkillIcon = ({ icon: Icon, name }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-indigo-800/50 rounded-lg transform transition-transform hover:scale-110">
    <Icon className="w-10 h-10 text-white" />
    <span className="text-sm font-medium text-white">{name}</span>
  </div>
);

// Helper: Dropdown
const SkillSection = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/10 backdrop-blur-xl p-1 border border-white/20 shadow-2xl rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-6 bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <Icon className="w-6 h-6 text-white" />
          <h3 className="text-xl font-modern font-semibold text-white">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-indigo-300 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        } overflow-hidden`}
      >
        <div className="p-6 bg-indigo-950/50">{children}</div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <h2 className="text-6xl md:text-8xl font-stylish italic text-center mb-3 text-white">
        My Skills
      </h2>
      <p className="text-center text-gray-300 text-lg font-modern mb-12">
        Skills that I have acquired through learning and experience.
      </p>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Web Development */}
        <SkillSection title="Web Development & Database" icon={Code}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {/* ❗ Tambah atau ganti ikon sesuai skill Anda */}
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            <SkillIcon icon={FaFigma} name="Figma" />
            <SkillIcon icon={SiFramer} name="Framer" />
            <SkillIcon icon={SiInkscape} name="Inkscape" />
            <SkillIcon icon={SiAdobephotoshop} name="Adobe Photoshop" />
            <SkillIcon icon={SiAffinity} name="Affinity" />
          </div>
        </SkillSection>

        {/* Soft Skills */}
        <SkillSection title="Soft Skills" icon={Brain}>
          <ul className="space-y-3">
            {/* ❗ Ganti dengan soft skill Anda */}
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-white" />
              Critical Thinking & Problem Solving
            </li>
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-white" />
              Team work & Collaboration
            </li>
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-white" />
              Adaptability
            </li>
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-white" />
              Time Management
            </li>
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-white" />
              Communication
            </li>
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-white" />
              Attention to Details
            </li>
          </ul>
        </SkillSection>
      </div>
    </section>
  );
};
export default Skills;
