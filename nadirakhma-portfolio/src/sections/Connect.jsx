import { Send, MessageCircle } from "lucide-react";
import { socialLinks } from "@data/socialLinks";
import { SITE, SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import PlusCorners from "@components/PlusCorners";

const gradMap = {
  GitHub: "from-[#24292e] to-[#6e5494]",
  Instagram: "from-[#feda75] via-[#d62976] to-[#4f5bd5]",
  LinkedIn: "from-[#0077B5] to-[#00a0dc]",
  Dribbble: "from-[#ea4c89] to-[#c32361]",
  Behance: "from-[#1769ff] to-[#053eff]",
  WhatsApp: "from-[#25D366] to-[#128C7E]",
};

const Connect = () => {
  return (
    <section id={SECTION_IDS.connect} className="px-5 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px rounded-b-[4px] p-6 sm:p-8 lg:p-12">
        <PlusCorners />
        <h2
          className="font-modern font-light text-gray-900 dark:text-white leading-[1.04] tracking-[-0.025em]"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          Let&apos;s{" "}
          <span className="font-stylish italic text-blue-600 dark:text-blue-400">
            work
          </span>{" "}
          together.
        </h2>

        <p className="mt-6 text-base sm:text-lg font-light text-gray-500 dark:text-white/40 leading-relaxed max-w-md">
          Open to collaborations &amp; freelance projects.
          <br />
          Available for new opportunities from July 2026.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${SITE.email}`} className="btn-base btn-primary">
            <Send className="w-3.5 h-3.5" />
            Send email
          </a>

          <a
            href="https://wa.me/6285335510121"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base border border-[#25D366]/40 text-[#1dab54] hover:border-[#25D366]/70 hover:bg-[#25D366]/[0.06] dark:border-[#25D366]/30 dark:text-[#25D366] dark:hover:border-[#25D366]/60 dark:hover:bg-[#25D366]/10"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>

        <div className="-mx-6 sm:-mx-8 lg:-mx-12 -mb-6 sm:-mb-8 lg:-mb-12 mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-gray-200 dark:border-white/[0.07] divide-x divide-y sm:divide-y-0 divide-gray-200 dark:divide-white/[0.07] overflow-hidden rounded-b-[4px]">
          {socialLinks.map((link) => {
            const grad = gradMap[link.name] || "from-gray-600 to-gray-800";
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="group relative flex flex-col items-center justify-center gap-3 p-6 sm:p-8 text-center overflow-hidden bg-white dark:bg-white/[0.02] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${grad}`}
                  aria-hidden="true"
                />
                <link.icon className="relative w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-xs sm:text-sm font-medium tracking-wide">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </div></Reveal>
    </section>
  );
};

export default Connect;
