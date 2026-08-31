import { ArrowUpRight, Send, MessageCircle } from "lucide-react";
import { socialLinks } from "@data/socialLinks";
import { SITE, SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";

const Connect = () => {
  return (
    <section id={SECTION_IDS.connect} className="px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px rounded-b-[4px] p-6 sm:p-8 lg:p-12">
        <p className="section-label mb-4">Connect</p>

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

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-gray-200 dark:border-white/[0.07] pt-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-normal text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px]"
            >
              <link.icon className="w-3.5 h-3.5" />
              {link.name}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
            </a>
          ))}
        </div>
      </div></Reveal>
    </section>
  );
};

export default Connect;
