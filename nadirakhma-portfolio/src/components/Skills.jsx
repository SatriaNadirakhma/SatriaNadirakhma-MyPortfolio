// src/components/Skills.jsx
import { useState } from "react";
import { ExternalLink } from "lucide-react";
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

const categories = [
  {
    label: "Web Development",
    skills: [
      {
        icon: FaHtml5,
        name: "HTML5",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        icon: FaCss3Alt,
        name: "CSS3",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        icon: FaJs,
        name: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { icon: FaReact, name: "React", url: "https://react.dev/" },
      { icon: FaNodeJs, name: "Node.js", url: "https://nodejs.org/" },
      {
        icon: FaBootstrap,
        name: "Bootstrap",
        url: "https://getbootstrap.com/",
      },
      { icon: FaLaravel, name: "Laravel", url: "https://laravel.com/" },
      {
        icon: RiTailwindCssFill,
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
      },
      { icon: SiMysql, name: "MySQL", url: "https://www.mysql.com/" },
      { icon: FaGitAlt, name: "Git", url: "https://git-scm.com/" },
    ],
  },
  {
    label: "Design",
    skills: [
      { icon: FaFigma, name: "Figma", url: "https://www.figma.com/" },
      { icon: SiFramer, name: "Framer", url: "https://www.framer.com/" },
      { icon: SiInkscape, name: "Inkscape", url: "https://inkscape.org/" },
      {
        icon: SiAdobephotoshop,
        name: "Photoshop",
        url: "https://www.adobe.com/products/photoshop.html",
      },
      {
        icon: SiAffinity,
        name: "Affinity",
        url: "https://affinity.serif.com/",
      },
    ],
  },
  {
    label: "Soft Skills",
    skills: [
      { name: "Critical Thinking", url: null },
      { name: "Problem Solving", url: null },
      { name: "Team Collaboration", url: null },
      { name: "Adaptability", url: null },
      { name: "Time Management", url: null },
      { name: "Communication", url: null },
      { name: "Attention to Detail", url: null },
    ],
  },
];

const SkillPill = ({ icon: Icon, name, url }) => {
  const inner = (
    <span
      className={`group inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border transition-all duration-300 select-none ${
        url
          ? "border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.07] cursor-pointer"
          : "border-white/[0.07] bg-transparent text-white/30 cursor-default"
      }`}
    >
      {Icon && (
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
      )}
      <span className="text-xs sm:text-sm font-modern whitespace-nowrap">
        {name}
      </span>
      {url && (
        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex-shrink-0" />
      )}
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${name}`}
      >
        {inner}
      </a>
    );
  }
  return inner;
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <div className="w-6 h-px bg-white/20" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/30">
            Capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          {/* Left: title */}
          <h2
            className="font-stylish italic text-white leading-[0.92]"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            My
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                color: "transparent",
              }}
            >
              Skills
            </span>
          </h2>

          {/* Right: skill categories */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {categories.map((cat) => (
              <div key={cat.label}>
                {/* Category label */}
                <p className="text-[10px] tracking-[0.25em] uppercase font-modern text-white/25 mb-4 sm:mb-5">
                  {cat.label}
                </p>

                {/* Pills */}
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
