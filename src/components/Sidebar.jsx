import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SunLight as Sun, HalfMoon as Moon, Menu, Xmark as X } from "iconoir-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import { useActiveSection } from "@hooks/useActiveSection";
import { cn } from "@/lib/utils";
import Logo from "@assets/logo.png";
import { SITE, SECTION_IDS } from "@constants/index";

const NAV_ITEMS = [
  { label: "About", to: SECTION_IDS.about },
  { label: "Experience", to: SECTION_IDS.experience },
  { label: "Projects", to: SECTION_IDS.projects },
  { label: "Champions", to: SECTION_IDS.champions },
  { label: "Skills", to: SECTION_IDS.skills },
  { label: "Connect", to: SECTION_IDS.connect },
];

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.to);

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { lenis } = useLenis();
  const routerNavigate = useNavigate();
  const location = useLocation();

  // Real scrollspy — only on landing; on /projects no section exists
  const rawActive = useActiveSection(NAV_SECTION_IDS);
  const activeSection = location.pathname === "/" ? rawActive : null;

  // Opening the mobile menu stops Lenis itself, not just body overflow —
  // otherwise a wheel/trackpad gesture over the menu would still scroll
  // the page underneath it.
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -64 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return true;
  }, [lenis]);

  const handleNavClick = useCallback((sectionId) => {
    setOpen(false);
    // Cross-page: from /projects back to landing
    if (location.pathname !== "/") {
      routerNavigate(`/#${sectionId}`);
      // Wait for route + lazy InView sections to mount
      let attempts = 0;
      const tryScroll = () => {
        if (scrollToId(sectionId)) return;
        if (attempts++ < 12) setTimeout(tryScroll, 200);
      };
      setTimeout(tryScroll, 150);
      return;
    }
    // Same page — handle lazy sections not yet in DOM
    if (!scrollToId(sectionId)) {
      window.location.hash = sectionId;
      let attempts = 0;
      const poll = () => {
        if (scrollToId(sectionId)) return;
        if (attempts++ < 10) setTimeout(poll, 200);
      };
      setTimeout(poll, 300);
    }
  }, [lenis, location.pathname, routerNavigate, scrollToId]);

  const linkClass = cn(
    "text-sm font-normal text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors duration-150 cursor-pointer"
  );

  // Hover toggle mem-preview ikon lawan (grammar diagonal Design Portfolio):
  // dark Idle Sun -> hover Moon, light Idle Moon -> hover Sun.
  const IdleThemeIcon = isDark ? Sun : Moon;
  const HoverThemeIcon = isDark ? Moon : Sun;

  return (
    <>
      {/* Lapis 1 — outer: floating, centered, mt-6 mulai lg.
          `xl:container xl:mx-auto` ref → `xl:max-w-7xl xl:mx-auto` project. */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full flex-col items-center transition-colors duration-300 lg:mt-6 lg:flex xl:mx-auto xl:max-w-7xl">
        {/* Lapis 2 — row: solid bar di mobile (`bg-ln-gray-900` ref →
            theme-aware), transparan mulai lg. Pill selalu center:
            `mac/xl:justify-stretch` ref sengaja tidak dipakai karena
            menimpa justify-center dan menarik pill ke kiri. */}
        <nav className="relative z-20 flex w-full items-center justify-center gap-8 bg-white/80 backdrop-blur-md dark:bg-[#080808]/80 lg:bg-transparent lg:[backdrop-filter:none] dark:lg:bg-transparent">
          {/* Lapis 3 — pill: bar full-width di mobile, floating pill
              (rounded + shadow `shadow-ln-xs` ref → `shadow-sm`,
              `bg-ln-gray-0` ref → theme-aware) mulai lg. */}
          <div className="relative z-10 flex h-16 w-full items-center justify-between gap-4 rounded-t-2xl bg-transparent px-4 lg:h-auto lg:w-auto lg:justify-start lg:gap-6 lg:rounded-xl lg:border lg:border-gray-200/60 lg:bg-white lg:p-[18px] lg:shadow-sm dark:lg:border-white/[0.07] dark:lg:bg-[#0d0d0d]">
          <a
            href={`#${SECTION_IDS.hero}`}
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== "/") {
                routerNavigate("/");
                setTimeout(() => {
                  if (lenis) lenis.scrollTo(0);
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }, 150);
              } else handleNavClick(SECTION_IDS.hero);
            }}
            className="cursor-pointer flex-shrink-0 rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Back to top"
          >
            <img src={Logo} alt="Nadi Rakhma" width="28" height="28" className="h-7 w-auto" />
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.to;
              return (
                <a
                  key={item.to}
                  href={`#${item.to}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.to); }}
                  className={cn(
                    linkClass,
                    "rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    isActive && "text-gray-900 dark:text-white"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={toggleTheme}
              className="btn-base btn-ghost group !p-0 w-8 h-8 shrink-0"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="relative w-4 h-4 inline-block shrink-0" aria-hidden="true">
                <IdleThemeIcon aria-hidden="true" focusable="false" className="absolute inset-0 w-4 h-4 transition-all duration-200 group-hover:opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <HoverThemeIcon aria-hidden="true" focusable="false" className="absolute inset-0 w-4 h-4 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="btn-base btn-primary btn-hire-alert group relative px-4 py-2 text-[13px] h-8"
            >
              <span
                aria-hidden="true"
                className="btn-hire-alert-ring pointer-events-none absolute inset-0 rounded-[4px]"
              />
              <span className="relative">Hire me</span>
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-[4px] text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/10 transition-colors lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X aria-hidden="true" focusable="false" className="w-5 h-5" /> : <Menu aria-hidden="true" focusable="false" className="w-5 h-5" />}
          </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — quiet full-screen sheet, no fancy reveal. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden bg-[#fafafa] dark:bg-[#080808]"
          >
            <div className="flex h-full w-full flex-col justify-between gap-y-4 px-6 pt-24 pb-10">
              <div className="flex flex-col gap-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.to;
                  return (
                    <a
                      key={item.to}
                      href={`#${item.to}`}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.to); }}
                      className={cn(
                        "text-2xl font-light tracking-[-0.01em] py-2.5 transition-colors duration-150 cursor-pointer rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
              <div className="flex flex-col gap-3 pb-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="btn-base btn-primary btn-hire-alert group relative w-full"
                >
                  <span
                    aria-hidden="true"
                    className="btn-hire-alert-ring pointer-events-none absolute inset-0 rounded-[4px]"
                  />
                  <span className="relative">Hire me</span>
                </a>
                <button
                  onClick={() => { toggleTheme(); setOpen(false); }}
                  className="inline-flex items-center gap-2 justify-center py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors duration-150"
                >
                  {isDark ? <Sun aria-hidden="true" focusable="false" className="w-4 h-4" /> : <Moon aria-hidden="true" focusable="false" className="w-4 h-4" />}
                  {isDark ? "Light mode" : "Dark mode"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
