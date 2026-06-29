import { useTheme } from "@context/ThemeContext";
import { ArrowUpRight, Send, MessageCircle } from "lucide-react";
import { socialLinks } from "@data/socialLinks";
import { SECTION_IDS } from "@constants/index";

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
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-gray-200 dark:border-white/[0.07] pt-16 sm:pt-20">
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="w-6 h-px bg-gray-300 dark:bg-white/20" />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-gray-500 dark:text-white/30">
              Get In Touch
            </p>
          </div>

          <h2
            className="font-modern font-bold leading-[0.92] mb-8 sm:mb-12 text-gray-900 dark:text-white"
            style={{ fontSize: "clamp(48px, 9vw, 144px)" }}
          >
            Let's{" "}
            <span
              style={{
                WebkitTextStroke: isDark
                  ? "1px rgba(255,255,255,0.8)"
                  : "1px rgba(17,24,39,0.65)",
                color: "transparent",
              }}
            >
              work
            </span>
            <br />
            together.
          </h2>

          <p className="text-sm sm:text-base font-modern text-gray-500 dark:text-white/35 max-w-md leading-relaxed mb-6 sm:mb-8">
            Open to internship opportunities &amp; freelance projects.
            <br />
            Available for new opportunities from August 2026.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16">
            <MagneticButton className="rounded-full">
              <a
                href="mailto:rakhmadanisatria@gmail.com"
                className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 border border-gray-300 dark:border-white/25 rounded-full font-modern text-xs sm:text-sm text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-gray-900 dark:hover:border-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <Send className="w-3.5 h-3.5" /> Send Email{" "}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </MagneticButton>
            <MagneticButton className="rounded-full">
              <a
                href="https://wa.me/6285335510121"
                target="_blank"
                rel="noopener noreferrer"
                className="wa-btn group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 border border-gray-200 dark:border-white/10 rounded-full font-modern text-xs sm:text-sm text-gray-500 dark:text-white/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp{" "}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-modern text-gray-400 dark:text-white/25 hover:text-gray-900 dark:hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
              >
                <link.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                {link.name}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .wa-btn:hover {
          background-color: #25D366;
          color: #FFFFFF;
          border-color: #25D366;
        }
      `}</style>
    </section>
  );
};

export default Connect;