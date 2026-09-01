import { SECTION_IDS, STATS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import PlusCorners from "@components/PlusCorners";
import Profile1 from "@assets/profile1.webp";
import { MapPin } from "lucide-react";

const About = () => {
  return (
    <section id={SECTION_IDS.about} className="px-5 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12">
        <PlusCorners />
        <SectionHeader
          label="About"
          title={
            <>
              Building digital products,{" "}
              <span className="font-modern italic font-semibold text-blue-600 dark:text-blue-400">end-to-end.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 sm:gap-16">
          <div className="order-2 lg:order-1 flex flex-col gap-5">
            <p className="text-base sm:text-lg font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
              Front-End Developer and UI/UX &amp; Visual Designer with hands-on industry
              experience at <span className="text-gray-900 dark:text-white">PT. Petrokimia Gresik (BUMN)</span> and
              2+ years of design practice at <span className="text-gray-900 dark:text-white">Oranji Studio</span>.
            </p>
            <p className="text-base sm:text-lg font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
              I work across the full stack. React, Laravel, Inertia.js on the dev side;
              Figma, Inkscape, Affinity by Canva, and brand identity on the design side. I bridge the gap
              between strong visual aesthetics and clean, functional code.
            </p>
            <p className="text-base sm:text-lg font-light text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
              Finalist of UI/UX Competition at IT FEST Brawijaya University.
              1st Champion of Poster Mahasiswa at Entrepreneur Festival Politeknik Negeri Malang.
            </p>
          </div>

          <div className="order-1 lg:order-2 flex flex-row lg:flex-col items-start gap-6">
            <div className="w-28 h-36 sm:w-32 sm:h-40 shrink-0 rounded-[4px] border border-gray-200 dark:border-white/10 overflow-hidden">
              <img
                src={Profile1}
                alt="Satria Rakhmadani, portrait"
                width="340"
                height="460"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="section-label">Digital Designer &amp; Front-End Developer</p>
              <p className="inline-flex items-center gap-1.5 text-sm font-normal text-gray-500 dark:text-white/60">
                <MapPin aria-hidden="true" focusable="false" className="w-3.5 h-3.5 shrink-0" />
                Malang, Indonesia
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-6 sm:-mx-8 lg:-mx-12 -mb-6 sm:-mb-8 lg:-mb-12 mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 border-t border-gray-200 dark:border-white/[0.07] divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-white/[0.07]">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-6 sm:p-8 text-center">
              <p className="font-modern font-light text-gray-900 dark:text-white text-4xl sm:text-5xl leading-none mb-2.5 tabular-nums">
                {stat.value}
              </p>
              <p className="section-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div></Reveal>
    </section>
  );
};

export default About;
