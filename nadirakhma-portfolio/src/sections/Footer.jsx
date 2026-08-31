import { SITE, SECTION_IDS } from "@constants/index";
import { useLenis } from "@context/LenisContext";
import Reveal from "@components/Reveal";
import BackToTopButton from "@components/BackToTopButton";
import { socialLinks } from "@data/socialLinks";

const NAV_LINKS = [
  { label: "About", to: SECTION_IDS.about },
  { label: "Experience", to: SECTION_IDS.experience },
  { label: "Projects", to: SECTION_IDS.projects },
  { label: "Skills", to: SECTION_IDS.skills },
  { label: "Connect", to: SECTION_IDS.connect },
];

const Footer = () => {
  const { lenis } = useLenis();

  return (
    <footer className="px-5 sm:px-8 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/[0.07] transition-colors duration-300">
      <Reveal><div className="max-w-7xl mx-auto py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-xs">
            <p className="font-modern font-light text-gray-900 dark:text-white text-lg tracking-[-0.01em]">
              {SITE.shortName}
            </p>
            <p className="mt-2 text-sm font-light text-gray-500 dark:text-white/40 leading-relaxed">
              Digital designer &amp; front-end developer based in Malang,
              Indonesia. Building the gap between aesthetics and code.
            </p>
          </div>

          <div className="flex gap-16 sm:gap-24">
            <div className="flex flex-col gap-2.5">
              <p className="section-label mb-1">Sitemap</p>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.to}
                  href={`#${link.to}`}
                  onClick={(e) => { e.preventDefault(); lenis?.scrollTo(`#${link.to}`, { offset: -60 }); }}
                  className="text-sm font-normal text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 cursor-pointer rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="section-label mb-1">Elsewhere</p>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-normal text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 border-t border-gray-200 dark:border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-normal text-gray-500 dark:text-white/60 tabular-nums">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-xs font-normal text-gray-500 dark:text-white/60">
              Designed &amp; built by {SITE.shortName}
            </p>
            <BackToTopButton />
          </div>
        </div>
      </div></Reveal>
    </footer>
  );
};

export default Footer;
