// src/components/Skills.jsx
import { useState } from "react";
import { ChevronDown, Code, PenTool, Brain, CheckCircle } from "lucide-react";
// Impor ikon skill dari react-icons
import {
  FaReact,
  FaFigma,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa";

// Helper: Ikon Skill
const SkillIcon = ({ icon: Icon, name }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-indigo-800 rounded-lg transform transition-transform hover:scale-110">
    <Icon className="w-10 h-10 text-red-400" />
    <span className="text-sm font-medium text-white">{name}</span>
  </div>
);

// Helper: Dropdown
const SkillSection = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-indigo-800/50 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-6 bg-indigo-900 hover:bg-indigo-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <Icon className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-semibold text-white">{title}</h3>
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
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        My Skills
      </h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Web Development */}
        <SkillSection title="Web Development" icon={Code}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {/* ❗ Tambah atau ganti ikon sesuai skill Anda */}
            <SkillIcon icon={FaHtml5} name="HTML5" />
            <SkillIcon icon={FaCss3Alt} name="CSS3" />
            <SkillIcon icon={FaJs} name="JavaScript" />
            <SkillIcon icon={FaReact} name="React" />
            <SkillIcon icon={FaNodeJs} name="Node.js" />
          </div>
        </SkillSection>

        {/* UI/UX Design */}
        <SkillSection title="UI/UX Design" icon={PenTool}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            <SkillIcon icon={FaFigma} name="Figma" />
            {/* Tambahkan ikon lain di sini */}
          </div>
        </SkillSection>

        {/* Soft Skills */}
        <SkillSection title="Soft Skills" icon={Brain}>
          <ul className="space-y-3">
            {/* ❗ Ganti dengan soft skill Anda */}
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Problem Solving
            </li>
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Team Collaboration
            </li>
            <li className="flex items-center gap-3 text-indigo-200">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Communication
            </li>
          </ul>
        </SkillSection>
      </div>
    </section>
  );
};
export default Skills;
