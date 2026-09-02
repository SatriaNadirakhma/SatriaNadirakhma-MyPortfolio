import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";
import { ChevronRight, ArrowRight } from "lucide-react";

import OranjiIcon from "@assets/collaborations/oranji.webp";
import ItdecIcon from "@assets/collaborations/itdec.webp";
import KompenIcon from "@assets/collaborations/kompen.webp";
import PetrokimiaIcon from "@assets/collaborations/petrokimia.webp";
import AtbakIcon from "@assets/collaborations/atbak.webp";

const ROWS = [
  {
    title: "Full-stack Developer",
    company: "CV Bakti Anugrah Kreasi",
    src: AtbakIcon,
    link: "https://www.instagram.com/",
    date: "Jul 2026 \u2013 Present",
    summary:
      "Lead the development of web applications and internal tools, collaborating with cross-functional teams to deliver scalable solutions. Implemented new features, optimized performance, and ensured code quality through best practices and code reviews.",
  },
  {
    title: "Full-stack Developer Intern",
    company: "PT. Petrokimia Gresik (BUMN)",
    src: PetrokimiaIcon,
    link: "https://www.instagram.com/petrokimiagresik_official/",
    date: "Jan 2026 \u2013 Jul 2026",
    summary:
      "Conducting research and development in the field of Information Technology to support the company's applications and user needs. Collaborating with the IT team on internal tools, data analysis, and process automation.",
  },
  {
    title: "Editor-in-Chief",
    company: "LPM Kompen Polinema",
    src: KompenIcon,
    link: "https://www.instagram.com/lpmkompen/",
    date: "Mar 2025 \u2013 Mar 2026",
    summary:
      "Led the print and online media division managing journalistic activities: content planning, article editing, and publication design. Coordinated a team of writers and designers to produce high-quality campus publications on schedule.",
  },
  {
    title: "Graphic Designer",
    company: "Oranji Studio",
    src: OranjiIcon,
    link: "https://www.instagram.com/oranji.studio/",
    date: "May 2024 \u2013 Present",
    summary:
      "Designing digital assets such as social media content, promotional materials, and brand visuals based on client and team collaboration. Working closely with cross-functional creative teams to deliver consistent visual identity across multiple platforms and campaigns.",
  },
  {
    title: "Project Coordinator",
    company: "ITDEC Polinema",
    src: ItdecIcon,
    link: "https://www.instagram.com/itdecpolinema/",
    date: "Aug 2025 \u2013 May 2026",
    summary:
      "Establishing communication between Creative Media teams to determine ITDEC's branding image. Coordinating design output across an 8-person team for campus-wide events and initiatives, ensuring visual consistency and timely delivery.",
  },
];

/**
 * Experience as ledger entries: one hairline row per position, the
 * emerald mark orienting this section (same signal across the site).
 * Dates in tabular figures so the timeline reads like a column.
 */
const Experience = () => {
  return (
    <section id={SECTION_IDS.experience} className="px-5 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12 pb-0 overflow-hidden">
        <PlusCorners />
        <SectionHeader
          label="Experience"
          title="My journey."
          description="Four chapters across engineering, journalism, and design — each one informing the next."
        />

        <div className="-mx-6 sm:-mx-8 lg:-mx-12 -mb-6 sm:-mb-8 lg:-mb-12 mt-8 sm:mt-10 flex flex-col border-t border-gray-200 dark:border-white/[0.07] divide-y divide-gray-200 dark:divide-white/[0.07]">
          {ROWS.map((row) => (
            <div
              key={row.title}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 px-6 sm:px-8 lg:px-12 py-8 sm:py-10 bg-white dark:bg-white/[0.02]"
            >
              <img
                src={row.src}
                alt={row.company}
                loading="lazy"
                className="h-12 w-12 shrink-0 rounded-[4px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] object-contain p-1.5"
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-xl sm:text-2xl font-light text-gray-900 dark:text-white leading-snug tracking-[-0.01em]">
                    {row.title}
                  </h3>
                  <span className="text-sm font-normal text-gray-500 dark:text-white/60 tabular-nums shrink-0">
                    {row.date}
                  </span>
                </div>

                <p className="mt-1.5 flex items-center gap-2 text-sm font-normal text-gray-500 dark:text-white/40">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-[1px] bg-emerald-500/70 dark:bg-emerald-400/70 shrink-0" />
                  {row.company}
                </p>

                <p className="mt-3 text-sm sm:text-[15px] font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
                  {row.summary}
                </p>

                <a
                  href={row.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-4 inline-flex items-center gap-1 text-sm font-normal text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
                >
                  Visit
                  <span className="relative w-3.5 h-3.5 inline-block" aria-hidden="true">
                    <ChevronRight className="absolute inset-0 w-3.5 h-3.5 transition-all duration-200 group-hover/link:opacity-0 group-hover/link:translate-x-0.5" />
                    <ArrowRight className="absolute inset-0 w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div></Reveal>
    </section>
  );
};

export default Experience;
