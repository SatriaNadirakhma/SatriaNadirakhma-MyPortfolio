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
  SiPostgresql,
} from "react-icons/si";
import { FaGitAlt } from "react-icons/fa6";
import { BsRobot } from "react-icons/bs";
import { SiOpenai, SiGooglegemini } from "react-icons/si";

export const skillCategories = [
  {
    label: "Web Development",
    skills: [
      { icon: FaHtml5, name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { icon: FaCss3Alt, name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { icon: FaJs, name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { icon: FaReact, name: "React", url: "https://react.dev/" },
      { icon: FaNodeJs, name: "Node.js", url: "https://nodejs.org/" },
      { icon: FaBootstrap, name: "Bootstrap", url: "https://getbootstrap.com/" },
      { icon: FaLaravel, name: "Laravel", url: "https://laravel.com/" },
      { icon: RiTailwindCssFill, name: "Tailwind CSS", url: "https://tailwindcss.com/" },
      { icon: SiMysql, name: "MySQL", url: "https://www.mysql.com/" },
      { icon: SiPostgresql, name: "PostgreSQL", url: "https://www.postgresql.org/" },
      { icon: FaGitAlt, name: "Git", url: "https://git-scm.com/" },
    ],
  },
  {
    label: "Design",
    skills: [
      { icon: FaFigma, name: "Figma", url: "https://www.figma.com/" },
      { icon: SiFramer, name: "Framer", url: "https://www.framer.com/" },
      { icon: SiInkscape, name: "Inkscape", url: "https://inkscape.org/" },
      { icon: SiAdobephotoshop, name: "Photoshop", url: "https://www.adobe.com/products/photoshop.html" },
      { icon: SiAffinity, name: "Affinity", url: "https://affinity.serif.com/" },
    ],
  },
  {
    label: "AI Tools",
    skills: [
      { icon: SiOpenai,      name: "OpenAI",      url: "https://openai.com/" },
      { icon: SiGooglegemini, name: "Gemini",     url: "https://gemini.google.com/" },
      { icon: BsRobot,       name: "Claude",      url: "https://claude.ai/" },
      { icon: BsRobot,       name: "Claude Code", url: "https://claude.ai/code" },
      { icon: BsRobot,       name: "DeepSeek",    url: "https://www.deepseek.com/" },
      { icon: BsRobot,       name: "Manus AI",    url: "https://manus.im/" },
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
