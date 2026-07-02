import { SITE } from "@constants/index";
import Reveal from "@components/Reveal";

const Footer = () => {
  return (
    <footer className="py-10 sm:py-12 px-5 sm:px-8 border-t border-gray-200 dark:border-white/[0.05]">
      <Reveal><div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-[10px] sm:text-xs font-modern text-gray-500 dark:text-white/25 tracking-wide">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>

        <p className="text-[10px] sm:text-xs font-modern text-gray-300 dark:text-white/15 tracking-wide">
          Designed &amp; Built by {SITE.shortName}
        </p>
      </div></Reveal>
    </footer>
  );
};

export default Footer;
