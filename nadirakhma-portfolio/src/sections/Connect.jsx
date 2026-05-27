import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "@data/socialLinks";
import { SECTION_IDS } from "@constants/index";

const Connect = () => {
  return (
    <section id={SECTION_IDS.connect} className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-white/[0.07] pt-16 sm:pt-20">
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="w-6 h-px bg-white/20" />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/30">
              Get In Touch
            </p>
          </div>

          <h2
            className="font-stylish italic text-white leading-[0.92] mb-8 sm:mb-12"
            style={{ fontSize: "clamp(48px, 9vw, 144px)" }}
          >
            Let's{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                color: "transparent",
              }}
            >
              work
            </span>
            <br />
            together.
          </h2>

          <p className="text-sm sm:text-base font-modern text-white/35 max-w-md leading-relaxed mb-12 sm:mb-16">
            Looking for new opportunities and project collaborations. Feel free to reach out -- I'd
            love to hear from you.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-modern text-white/25 hover:text-white transition-all duration-300"
              >
                <link.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                {link.name}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
