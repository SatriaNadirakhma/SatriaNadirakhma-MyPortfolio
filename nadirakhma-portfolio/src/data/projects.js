import Ekspedisi from "@assets/image/ekspedisi.jpg";
import Tatib from "@assets/image/tatib.jpg";
import Sipinta from "@assets/image/sipinta.jpg";
import K3SiantarTop from "@assets/image/k3.jpg";
import OranjixHMTI from "@assets/image/oranjixhmti.png";
import Alceena from "@assets/image/alceena.png";
import MitraBoost from "@assets/image/mitraboost.jpg";
import { Code, Palette } from "lucide-react";

export const allProjects = [
  {
    title: "K3 Siantar Top",
    description:
      "Landing page web-based application for K3 (Keselamatan dan Kesehatan Kerja) for PT Siantar Top.",
    image: K3SiantarTop,
    link: "https://k3-phi.vercel.app/",
    icon: Code,
    category: "Development",
  },
  {
    title: "SIPINTA -- TOEIC Registration System",
    description:
      "Web-based system to simplify TOEIC registration for Polinema students with integrated user access.",
    image: Sipinta,
    link: "https://github.com/SatriaNadirakhma/PBLSEM4",
    icon: Code,
    category: "Development",
  },
  {
    title: "Sistem Informasi Tata Tertib",
    description:
      "Digital platform for transparent campus regulation management accessible to students, lecturers, and staff.",
    image: Tatib,
    link: "https://github.com/aldofebryn/project",
    icon: Code,
    category: "Development",
  },
  {
    title: "Oranji Studio x HMTI Polinema",
    description:
      "Collaboration to design and develop HMTI merchandise products. (source: Instagram @hmtipolinema)",
    image: OranjixHMTI,
    link: "https://www.instagram.com/p/DDTd64kSFEY/?img_index=1",
    icon: Palette,
    category: "Graphic Design",
  },
  {
    title: "Sistem Ekspedisi (Terminal)",
    description:
      "Java-based expedition management system via terminal to simulate delivery workflows in Indonesia.",
    image: Ekspedisi,
    link: "https://github.com/zidnafaz/Sistem-Ekspedisi",
    icon: Code,
    category: "Development",
  },
  {
    title: "Alceena'23 Social Media Design",
    description:
      "Designing social media content for Alceena'23, class of 2023 student account for the Information Technology Department at the Malang State Polytechnic, to enhance online presence and engagement. (source: Behance - Nadi Rakhma)",
    image: Alceena,
    link: "https://www.behance.net/gallery/188506751/Social-Media-Designs-Alceena",
    icon: Palette,
    category: "Graphic Design",
  },
  {
    title: "MitraBoost - UI/UX Design",
    description:
      "Designing the user interface and experience for the MitraBoost application to improve usability and user satisfaction about making business decisions.",
    image: MitraBoost,
    link: "https://www.figma.com/deck/xrebbWvdKPfUD4AzOoO40S",
    icon: Palette,
    category: "Graphic Design",
  },
];

export const projectFilters = ["All", "Development", "Graphic Design"];
