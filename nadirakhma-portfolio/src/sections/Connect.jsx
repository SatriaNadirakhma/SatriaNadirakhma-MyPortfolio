import { useTheme } from "@context/ThemeContext";
import { ArrowUpRight, Send, MessageCircle } from "lucide-react";
import { socialLinks } from "@data/socialLinks";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import ScrollHeading from "@components/ScrollHeading";

// ─────────────────────────────────────────────────────────────
// 📦 INSTALASI MagneticButton (Aceternity UI via shadcn):
//    bunx --bun shadcn@latest add @aceternity/magnetic-button-demo
// ─────────────────────────────────────────────────────────────
import { MagneticButton } from "@/components/ui/magnetic-button";

const Connect = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id={SECTION_IDS.connect} className="py-20 sm:py-28 px-5 sm:px-8">
      <Reveal><div className="max-w-7xl mx-auto">
        <div className="border-t border-gray-200 dark:border-white/[0.07] pt-16 sm:pt-20">

          <ScrollHeading
            className="font-modern font-bold leading-[0.92] mb-8 sm:mb-12 text-gray-900 dark:text-white"
            style={{ fontSize: "clamp(48px, 8.5vw, 96px)" }}
          >
            Let's{" "}
            <span
              style={{
                color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
                fontStyle: "italic",
                WebkitTextStroke: isDark
                  ? "1px rgba(147,197,253,0.5)"
                  : "1px rgba(37,99,235,0.5)",
              }}
            >
              work
            </span>
            <br />
            together.
          </ScrollHeading>

          <p className="text-sm sm:text-base font-modern text-gray-500 dark:text-white/35 max-w-md leading-relaxed mb-6 sm:mb-8">
            Open to internship opportunities &amp; freelance projects.
            <br />
            Available for new opportunities from August 2026.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16">
            <MagneticButton>
              <a
                href="mailto:rakhmadanisatria@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-red-500 to-red-600 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-red-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Send className="w-3.5 h-3.5" /> Send Email
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://wa.me/6285335510121"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-green-500 to-green-600 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-green-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
            {socialLinks.map((link, i) => (
              <MagneticButton key={i} strength={0.6} maxDistance={40}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-2.5 py-1.5 text-xs tracking-[0.18em] uppercase font-modern text-gray-400 dark:text-white/25 hover:text-gray-900 dark:hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
                >
                  <link.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                  {link.name}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div></Reveal>
    </section>
  );
};

export default Connect;