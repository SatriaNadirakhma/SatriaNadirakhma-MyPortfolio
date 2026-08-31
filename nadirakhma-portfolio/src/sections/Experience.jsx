import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";
import { ArrowUpRight } from "lucide-react";

import OranjiIcon from "@assets/collaborations/oranji.webp";
import ItdecIcon from "@assets/collaborations/itdec.webp";
import KompenIcon from "@assets/collaborations/kompen.webp";
import PetrokimiaIcon from "@assets/collaborations/petrokimia.webp";

const ROWS = [
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
    title: "Creative Media Division \u2014 Project Coordinator",
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
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12">
        <PlusCorners />
        <SectionHeader
          title="My journey."
          description="Four chapters across engineering, journalism, and design — each one informing the next."
        />

        <div className="flex flex-col">
          {ROWS.map((row) => (
            <div
              key={row.title}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 py-8 sm:py-10 border-t border-gray-200 dark:border-white/[0.07] first:border-t-0 first:pt-0"
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
                  className="mt-4 inline-flex items-center gap-1 text-sm font-normal text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
                >
                  Visit
                  <ArrowUpRight aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
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
