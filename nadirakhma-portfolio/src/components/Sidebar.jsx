import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import { cn } from "@/lib/utils";
import Logo from "@assets/logo.png";
import { SECTION_IDS } from "@constants/index";
import MenuToggleIcon from "@/components/ui/menu-toggle-icon";

const NAV_ITEMS = [
  { label: "About", to: SECTION_IDS.about },
  { label: "Collab", to: SECTION_IDS.collaborations },
  { label: "Experience", to: SECTION_IDS.experience },
  { label: "Projects", to: SECTION_IDS.projects },
  { label: "Skills", to: SECTION_IDS.skills },
  { label: "Connect", to: SECTION_IDS.connect },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { lenis } = useLenis();

  useEffect(() => {
    const past = { current: false };
    const handleScroll = () => {
      const val = window.scrollY > 20;
      if (val !== past.current) { past.current = val; setScrolled(val); }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navigate = useCallback((sectionId) => {
    setOpen(false);
    lenis?.scrollTo(`#${sectionId}`, { offset: -60 });
  }, [lenis]);

  const linkClass = cn(
    "text-xs tracking-[0.12em] uppercase font-modern transition-colors duration-200 rounded-md px-3 py-1.5",
    "text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white cursor-pointer"
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-5xl border-b transition-all duration-300",
          {
            "bg-white/95 backdrop-blur-lg dark:bg-[#080808]/90 border-gray-200 dark:border-white/[0.08] shadow-sm md:top-3 md:rounded-xl md:border md:shadow":
              scrolled && !open,
            "bg-white/90 dark:bg-[#080808]/90 border-transparent": !scrolled && !open,
            "bg-white dark:bg-[#080808] border-transparent": open,
          }
        )}
      >
        <nav className="flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all">
          <a
            onClick={(e) => { e.preventDefault(); lenis?.scrollTo(`#${SECTION_IDS.hero}`); }}
            className="cursor-pointer flex-shrink-0"
            aria-label="Back to top"
          >
            <img src={Logo} alt="Nadi Rakhma" className="h-7 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.to}
                onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                className={linkClass}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-2 p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
              aria-label={isDark ? "Switch to light" : "Switch to dark"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="w-5 h-5" duration={300} />
          </button>
        </nav>

        <div className={cn("fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden md:hidden", open ? "block" : "hidden")}>
          <div className="flex h-full w-full flex-col justify-between gap-y-4 p-4 bg-white/95 dark:bg-[#080808]/95 backdrop-blur-xl">
            <div className="flex flex-col gap-y-2 pt-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.to}
                  onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                  className="text-sm tracking-[0.15em] uppercase font-modern text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors duration-200 py-2 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-center pb-8">
              <button
                onClick={() => { toggleTheme(); setOpen(false); }}
                className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase font-modern text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors duration-200 py-2"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Sidebar;
