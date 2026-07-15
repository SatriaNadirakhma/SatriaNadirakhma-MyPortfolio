import { ArrowUp } from "lucide-react";
import { SITE } from "@constants/index";
import { useLenis } from "@context/LenisContext";
import Reveal from "@components/Reveal";

const Footer = () => {
  const { lenis } = useLenis();

  const handleBackToTop = () => {
    lenis?.scrollTo(0, { duration: 1.4 });
  };

  return (
    <footer className="py-10 sm:py-12 px-5 sm:px-8 border-t border-gray-200 dark:border-white/5">
      <Reveal><div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-[10px] sm:text-xs font-modern text-gray-500 dark:text-white/25 tracking-wide">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-5 sm:gap-6">
          <p className="text-[10px] sm:text-xs font-modern text-gray-300 dark:text-white/15 tracking-wide">
            Designed &amp; Built by {SITE.shortName}
          </p>

          <button
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div></Reveal>
    </footer>
  );
};

export default Footer;