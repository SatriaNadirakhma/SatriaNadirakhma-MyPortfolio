import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import { useActiveSection } from "@hooks/useActiveSection";
import { cn } from "@/lib/utils";
import Logo from "@assets/logo.png";
import { SECTION_IDS } from "@constants/index";
import MenuToggleIcon from "@/components/ui/menu-toggle-icon";

const NAV_ITEMS = [
  { label: "About", to: SECTION_IDS.about },
  { label: "Collab", to: SECTION_IDS.collaborations },
  { label: "Experience", to: SECTION_IDS.experience },
  { label: "Projects", to: SECTION_IDS.projects },
  { label: "Champions", to: SECTION_IDS.champions },
  { label: "Skills", to: SECTION_IDS.skills },
  { label: "Connect", to: SECTION_IDS.connect },
];

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.to);

const menuStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { lenis } = useLenis();

  // Real scrollspy — which section is currently centered in the viewport —
  // used to drive the sliding pill on desktop and the highlighted label on mobile.
  const activeSection = useActiveSection(NAV_SECTION_IDS);

  // Header shrink/blur now reacts to Lenis's own scroll event instead of a
  // second, independent `window.addEventListener('scroll', ...)` — one
  // source of truth for "how far has the page scrolled".
  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ scroll }) => setScrolled(scroll > 20);
    lenis.on("scroll", onScroll);
    return () => lenis.off?.("scroll", onScroll);
  }, [lenis]);

  // Opening the mobile menu now stops Lenis itself, not just body overflow —
  // otherwise a wheel/trackpad gesture over the menu would still scroll the
  // page underneath it.
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

  const navigate = useCallback((sectionId) => {
    setOpen(false);
    lenis?.scrollTo(`#${sectionId}`, { offset: -60 });
  }, [lenis]);

  const linkClass = cn(
    "relative text-xs tracking-[0.12em] uppercase font-modern transition-colors duration-200 rounded-md px-3 py-1.5",
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
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.to;
              return (
                <a
                  key={item.to}
                  onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                  className={cn(linkClass, isActive && "text-gray-900 dark:text-white")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-md bg-gray-100 dark:bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
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
      </header>

      {/* Mobile menu — reveals as a circle expanding from the burger icon,
          rather than the previous instant block/hidden swap. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 32px) 28px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: isDark ? "#080808" : "#fafafa" }}
          >
            <motion.div
              variants={menuStagger}
              initial="hidden"
              animate="show"
              className="flex h-full w-full flex-col justify-between gap-y-4 p-4 pt-24"
            >
              <div className="flex flex-col gap-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.to;
                  return (
                    <motion.a
                      key={item.to}
                      variants={menuItem}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      onClick={(e) => { e.preventDefault(); navigate(item.to); }}
                      className={cn(
                        "text-sm tracking-[0.15em] uppercase font-modern transition-colors duration-200 py-2 cursor-pointer",
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>
              <motion.div
                variants={menuItem}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center justify-center pb-8"
              >
                <button
                  onClick={() => { toggleTheme(); setOpen(false); }}
                  className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase font-modern text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors duration-200 py-2"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;