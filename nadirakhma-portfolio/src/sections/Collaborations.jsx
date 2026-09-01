import { SECTION_IDS } from "@constants/index";
import PlusCorners from "@components/PlusCorners";

import Alceena from "@assets/collaborations/alceena.webp";
import Hmti from "@assets/collaborations/hmti.webp";
import Itdec from "@assets/collaborations/itdec.webp";
import Kompen from "@assets/collaborations/kompen.webp";
import Oranji from "@assets/collaborations/oranji.webp";
import Petrokimia from "@assets/collaborations/petrokimia.webp";
import Wri from "@assets/collaborations/wri.webp";
import Atbak from "@assets/collaborations/atbak.webp";

const LOGOS = [
  { src: Atbak, alt: "Atbak", href: "https://www.instagram.com/" },
  { src: Petrokimia, alt: "Petrokimia Gresik", href: "https://petrokimia-gresik.com/" },
  { src: Oranji, alt: "Oranji Studio", href: "https://www.instagram.com/oranji.studio/" },
  { src: Itdec, alt: "ITDEC Polinema", href: "https://www.instagram.com/itdecpolinema/" },
  { src: Kompen, alt: "LPM Kompen", href: "https://lpmkompen.or.id/" },
  { src: Hmti, alt: "HMTI Polinema", href: "https://www.instagram.com/hmtipolinema/" },
  { src: Wri, alt: "WRI", href: "https://wridev.id/en/" },
  { src: Alceena, alt: "Alceena", href: "https://www.instagram.com/alceena23.polinema/" },
];

/**
 * Logo rail as marquee — Stripe's "who trusts us" rail but in motion:
 * logos scroll infinitely, each separated by a hairline that matches
 * the section's own outline height.
 */
const Collaborations = () => {
  const track = [...LOGOS, ...LOGOS];

  return (
    <section id={SECTION_IDS.collaborations} className="px-5 sm:px-8">
      <div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px">
        <PlusCorners />

        <div className="group overflow-hidden">
          <div className="flex w-max animate-marquee">
            {track.map((logo, i) => (
              <a
                key={`${logo.alt}-${i}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.alt}
                className="flex items-center justify-center shrink-0 w-36 sm:w-44 h-20 sm:h-24 border-r border-gray-200 dark:border-white/[0.07] px-6 sm:px-8"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  width="80"
                  height="32"
                  className="h-8 sm:h-10 w-auto max-w-full object-contain opacity-100 transition-opacity duration-150"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaborations;
