import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";

import Alceena from "@assets/collaborations/alceena.webp";
import Hmti from "@assets/collaborations/hmti.webp";
import Itdec from "@assets/collaborations/itdec.webp";
import Kompen from "@assets/collaborations/kompen.webp";
import Oranji from "@assets/collaborations/oranji.webp";
import Petrokimia from "@assets/collaborations/petrokimia.webp";
import Wri from "@assets/collaborations/wri.webp";

const LOGOS = [
  { src: Petrokimia, alt: "Petrokimia Gresik", href: "https://petrokimia-gresik.com/" },
  { src: Oranji, alt: "Oranji Studio", href: "https://www.instagram.com/oranji.studio/" },
  { src: Itdec, alt: "ITDEC Polinema", href: "https://www.instagram.com/itdecpolinema/" },
  { src: Kompen, alt: "LPM Kompen", href: "https://lpmkompen.or.id/" },
  { src: Hmti, alt: "HMTI Polinema", href: "https://www.instagram.com/hmtipolinema/" },
  { src: Wri, alt: "WRI", href: "https://wridev.id/en/" },
  { src: Alceena, alt: "Alceena", href: "https://www.instagram.com/alceena23.polinema/" },
];

const Collaborations = () => {
  return (
    <section id={SECTION_IDS.collaborations} className="py-16 sm:py-24 px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto">
        <div className="border-t border-gray-200 dark:border-white/[0.07] pt-14 sm:pt-18">
          <p className="text-center text-[10px] tracking-[0.25em] uppercase font-modern text-gray-400 dark:text-white/25 mb-8 sm:mb-10">
            Collaborations &amp; Building Experiences
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-12">
            {LOGOS.map((logo) => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-12 sm:h-24 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div></Reveal>
    </section>
  );
};

export default Collaborations;
