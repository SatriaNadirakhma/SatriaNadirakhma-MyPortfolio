import { DesignNib as PenTool, Building as Building2, Trophy, Group as Users } from "iconoir-react";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";

const STACK = ["React", "Laravel", "Figma", "Tailwind CSS"];

const MINI_STATS = [
  { value: "2+", label: "Years client design" },
  { value: "3–5", label: "Concurrent projects" },
  { value: "8", label: "Person team coordinated" },
];

/**
 * Benefit bento: the short version of the CV, placed right before
 * Connect as the pre-CTA proof. Card language copies ProjectCard /
 * ChampionCard exactly — rounded-[4px], border-carried definition,
 * flat bg-white / white-[0.02], hover border-shift only. One intentional
 * exception (user request): the box scales to 1.02 on hover while the
 * inner content counter-scales (1/1.02), so visually only the box
 * grows and the text/icons stay exactly still.
 *
 * Note: design.md documents cards as rounded-2xl + bg-gray-50, but the
 * shipped Projects/Champions/Experience code all use rounded-[4px] +
 * bg-white. This file follows the shipped code for visual consistency.
 */
const CARD_OUTER =
  "group relative rounded-[4px] overflow-hidden border border-[#e5edf5] dark:border-white/[0.07] bg-white dark:bg-white/[0.02] transition-all duration-150 ease-in-out hover:border-[#b9b9f9]/60 dark:hover:border-white/15 motion-safe:hover:scale-[1.02] hover:z-10";
const CARD_INNER =
  "h-full w-full motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-in-out motion-safe:group-hover:scale-[0.9804]";

const Benefit = () => {
  return (
    <section id={SECTION_IDS.benefit} className="px-5 sm:px-8 ">
      <Reveal>
        <div className="relative max-w-7xl mx-auto border-x border-gray-300 dark:border-white/[0.14] p-6 sm:p-8 lg:p-12 bg-[#fafafa]/80 dark:bg-[#080808]/80 backdrop-blur-md">
          <SectionHeader
            title={
              <>
                What you get when we{" "}
                <span className="font-modern italic font-semibold text-blue-600 dark:text-blue-400">
                  work together.
                </span>
              </>
            }
            description="The short version of my CV — one owner from research to production, hardened by real product work and 2+ years of client deadlines."
          />

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-3 sm:gap-4">
            {/* Primary — end-to-end ownership */}
            <div className={`md:col-span-3 md:row-span-2 relative ${CARD_OUTER}`}>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(128,128,128,0.14)_0px_1px,transparent_1px_10px)] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_100%_0%,#000_60%,transparent_110%)] pointer-events-none"
              />
              <div
                className={`${CARD_INNER} relative p-8 sm:p-10 flex flex-col justify-between gap-10`}
              >
                <div>
                  <p className="section-label mb-4 flex items-center gap-2">
                    <PenTool aria-hidden="true" focusable="false" className="w-3 h-3" />
                    End-to-end delivery
                  </p>
                  <p
                    className="font-modern font-light text-gray-900 dark:text-white leading-[1.05] tracking-[-0.02em]"
                    style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
                  >
                    Design to production, one owner.
                  </p>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-light text-gray-500 dark:text-white/40 leading-relaxed max-w-sm">
                    From user research and Figma prototypes to production-ready React + Laravel. The
                    same person who sketches the UI ships it — no handoff gap, no lost intent.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {STACK.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 px-3 py-1 text-[11px] tracking-[0.12em] uppercase font-normal text-gray-500 dark:text-white/50"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary — production experience */}
            <div className={`md:col-span-3 ${CARD_OUTER}`}>
              <div className={`${CARD_INNER} p-6 sm:p-8 flex flex-col justify-between gap-6`}>
                <div>
                  <p className="section-label mb-4 flex items-center gap-2">
                    <Building2 aria-hidden="true" focusable="false" className="w-3 h-3" />
                    Production experience
                  </p>
                  <p className="text-xl sm:text-2xl font-light text-gray-900 dark:text-white leading-snug tracking-[-0.01em]">
                    Real products, real deadlines.
                  </p>
                  <p className="mt-2 text-sm font-light text-gray-500 dark:text-white/40 leading-relaxed">
                    Internal tools for an enterprise IT division that cut manual data-entry — plus
                    2+ years at Oranji Studio shipping concurrent client projects on deadline.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-gray-300 dark:border-white/[0.07] pt-5">
                  {MINI_STATS.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-modern font-light text-gray-900 dark:text-white text-2xl sm:text-3xl leading-none tabular-nums">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-[10px] tracking-[0.2em] uppercase font-normal text-gray-500 dark:text-white/40">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tertiary — awards */}
            <div className={`md:col-span-1 ${CARD_OUTER}`}>
              <div
                className={`${CARD_INNER} p-6 flex flex-col items-center justify-center text-center gap-2`}
              >
                <Trophy
                  aria-hidden="true"
                  focusable="false"
                  className="w-5 h-5 text-orange-500 dark:text-orange-400"
                />
                <p className="font-modern font-light text-gray-900 dark:text-white text-4xl leading-none tabular-nums">
                  2
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase font-normal text-gray-500 dark:text-white/40">
                  Design awards
                </p>
                <p className="text-xs font-light text-gray-500 dark:text-white/40 leading-snug">
                  IT FEST Finalist · E-FEST 1st
                </p>
              </div>
            </div>

            {/* Tertiary — collaborator */}
            <div className={`md:col-span-2 ${CARD_OUTER}`}>
              <div className={`${CARD_INNER} p-6 flex items-center gap-4`}>
                <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-gray-900 dark:text-white flex items-center justify-center shrink-0">
                  <Users aria-hidden="true" focusable="false" className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-base font-normal text-gray-900 dark:text-white leading-snug">
                    Team-ready collaborator.
                  </p>
                  <p className="mt-1 text-sm font-light text-gray-500 dark:text-white/40 leading-relaxed">
                    Led editorial at Kompen, coordinated ITDEC creatives — feedback via Notion +
                    FigJam, fewer revision cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Benefit;
