import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@hooks/use-outside-click";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import ScrollHeading from "@components/ScrollHeading";

import OranjiIcon from "@assets/collaborations/oranji.webp";
import ItdecIcon from "@assets/collaborations/itdec.webp";
import KompenIcon from "@assets/collaborations/kompen.webp";
import PetrokimiaIcon from "@assets/collaborations/petrokimia.webp";
import OranjiLarge from "@assets/image/oranjiteam.webp";
import ItdecLarge from "@assets/image/itdecpeeps.webp";
import KompenLarge from "@assets/image/kompen.webp";
import PetrokimiaLarge from "@assets/image/petrokimia.webp";

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-black dark:text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

const CARDS = [
  {
    title: "Graphic Designer",
    description: "Oranji Studio",
    src: OranjiIcon,
    largeSrc: OranjiLarge,
    ctaText: "View",
    ctaLink: "https://www.instagram.com/oranji.studio/",
    date: "May 2024 -- Present",
    content: () => (
      <p>
        Designing digital assets such as social media content, promotional materials,
        and brand visuals based on client and team collaboration. Working closely with
        cross-functional creative teams to deliver consistent visual identity across
        multiple platforms and campaigns.
      </p>
    ),
  },
  {
    title: "Creative Media Division — Project Coordinator",
    description: "ITDEC Polinema",
    src: ItdecIcon,
    largeSrc: ItdecLarge,
    ctaText: "View",
    ctaLink: "https://www.instagram.com/itdecpolinema/",
    date: "Aug 2025 -- Present",
    content: () => (
      <p>
        Establishing communication between Creative Media teams to determine ITDEC&apos;s
        branding image. Coordinating design output across an 8-person team for campus-wide
        events and initiatives, ensuring visual consistency and timely delivery.
      </p>
    ),
  },
  {
    title: "Editor-in-Chief",
    description: "LPM Kompen Polinema",
    src: KompenIcon,
    largeSrc: KompenLarge,
    ctaText: "View",
    ctaLink: "https://www.instagram.com/lpmkompen/",
    date: "Mar 2025 -- Mar 2026",
    content: () => (
      <p>
        Led the print and online media division managing journalistic activities:
        content planning, article editing, and publication design. Coordinated a team
        of writers and designers to produce high-quality campus publications on schedule.
      </p>
    ),
  },
  {
    title: "IT Intern",
    description: "PT. Petrokimia Gresik (BUMN)",
    src: PetrokimiaIcon,
    largeSrc: PetrokimiaLarge,
    ctaText: "View",
    ctaLink: "https://www.instagram.com/petrokimiagresik_official/",
    date: "Jan 2026 -- Present",
    content: () => (
      <p>
        Conducting research and development in the field of Information Technology
        to support the company&apos;s applications and user needs. Collaborating with
        the IT team on internal tools, data analysis, and process automation.
      </p>
    ),
  },
];

const Experience = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();
  const { resolvedTheme } = useTheme();
  const { lenis } = useLenis();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(false);
    }

    // Lenis stop/start alongside the overflow toggle — overflow alone
    // doesn't stop Lenis's own transform-driven scroll, so without this
    // the page behind the modal would still glide on wheel/trackpad input.
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "auto";
      lenis?.start();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, lenis]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section id={SECTION_IDS.experience} className="py-20 sm:py-28 px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 items-start">
          <ScrollHeading
            className="font-modern font-bold leading-[0.92] text-gray-900 dark:text-white"
            style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
          >
            My
            <br />
            <span
              style={{
                color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
                fontStyle: "italic",
                textShadow: isDark
                  ? "-1px -1px 0 rgba(147,197,253,0.5), 1px -1px 0 rgba(147,197,253,0.5), -1px 1px 0 rgba(147,197,253,0.5), 1px 1px 0 rgba(147,197,253,0.5)"
                  : "-1px -1px 0 rgba(37,99,235,0.5), 1px -1px 0 rgba(37,99,235,0.5), -1px 1px 0 rgba(37,99,235,0.5), 1px 1px 0 rgba(37,99,235,0.5)",
              }}
            >
              Journey
            </span>
          </ScrollHeading>

          <div className="flex flex-col w-full">
            {/* Expandable card modal */}
            <AnimatePresence>
              {active && typeof active === "object" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 z-10 backdrop-blur-sm"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {active && typeof active === "object" ? (
                <div className="fixed inset-0 grid place-items-center z-[100]">
                  <motion.div
                    layoutId={`card-${active.title}-${id}`}
                    ref={ref}
                    className="relative w-full max-w-[500px] max-h-full md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden outline-1 outline-gray-300 dark:outline-gray-500 shadow-lg"
                  >
                    <motion.button
                      key={`close-${active.title}-${id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setActive(null)}
                      className="absolute top-3 right-3 z-10 flex items-center justify-center bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full h-8 w-8 shadow-sm hover:bg-white dark:hover:bg-neutral-700 transition-colors"
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </motion.button>
                    <motion.div layoutId={`image-${active.title}-${id}`}>
                      <img
                        width={500}
                        height={300}
                        src={active.largeSrc || active.src}
                        alt={active.title}
                        className="w-full h-48 sm:h-64 lg:h-72 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                      />
                    </motion.div>

                    <div className="flex flex-col flex-1 overflow-hidden">
                      <div className="flex justify-between items-start p-4">
                        <div className="min-w-0 flex-1 pr-3">
                          <motion.h3
                            layoutId={`title-${active.title}-${id}`}
                            className="font-bold text-neutral-700 dark:text-neutral-200"
                          >
                            {active.title}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${active.description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400 text-sm"
                          >
                            {active.description}
                          </motion.p>
                          <p className="text-[10px] tracking-wide font-modern text-neutral-400 dark:text-neutral-500 mt-1">
                            {active.date}
                          </p>
                        </div>

                        <motion.a
                          layoutId={`button-${active.title}-${id}`}
                          href={active.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 text-sm rounded-full font-bold bg-gray-900 text-white dark:bg-white dark:text-black shrink-0"
                        >
                          Visit
                        </motion.a>
                      </div>
                      <div
                        className="relative px-4 flex-1 overflow-y-auto"
                        data-lenis-prevent
                      >
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-600 text-sm leading-relaxed pb-6 dark:text-neutral-400"
                        >
                          {typeof active.content === "function" ? active.content() : active.content}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>

            {/* Card list */}
            <div className="flex flex-col gap-2">
              {CARDS.map((card) => (
                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  key={`card-${card.title}-${id}`}
                  onClick={() => setActive(card)}
                  className="p-6 flex items-center gap-4 hover:bg-gray-200/50 dark:hover:bg-neutral-800/50 rounded-xl cursor-pointer transition-colors duration-200 outline-1"
                >
                  <motion.div layoutId={`image-${card.title}-${id}`} className="shrink-0 h-20 w-20 rounded-lg overflow-hidden">
                    <img
                      src={card.src}
                      alt={card.title}
                      className="h-full w-full object-contain object-center"
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-sm sm:text-base text-neutral-800 dark:text-neutral-200"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${card.title}-${id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(card);
                    }}
                    className="px-4 py-2 text-xs sm:text-sm rounded-full font-bold bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 shrink-0"
                  >
                    {card.ctaText}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div></Reveal>
    </section>
  );
};

export default Experience;