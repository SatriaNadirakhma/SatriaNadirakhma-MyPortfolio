import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SunLight as Sun, HalfMoon as Moon, Menu, Xmark as X, User, Suitcase, Folder, Trophy, Tools, Mail } from "iconoir-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import { useActiveSection } from "@hooks/useActiveSection";
import { cn } from "@/lib/utils";
import Logo from "@assets/logo.png";
import { SITE, SECTION_IDS } from "@constants/index";

const NAV_ITEMS = [
  { label: "About", to: SECTION_IDS.about, Icon: User },
  { label: "Experience", to: SECTION_IDS.experience, Icon: Suitcase },
  { label: "Projects", to: SECTION_IDS.projects, Icon: Folder },
  { label: "Champions", to: SECTION_IDS.champions, Icon: Trophy },
  { label: "Skills", to: SECTION_IDS.skills, Icon: Tools },
  { label: "Connect", to: SECTION_IDS.connect, Icon: Mail },
];

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.to);

const NAV_LABEL_IN_DELAY = 22;
const NAV_LABEL_OUT_DELAY = 16;

/**
 * Button ikon nav — idle hanya ikon. Hover/focus me-reveal teks
 * huruf-per-huruf persis seperti BackToTopButton di footer (transisi CSS
 * murni, tanpa framer-motion). Active (scrollspy) = kotak biru gradient +
 * ikon putih; teks tetap hanya muncul saat hover/focus.
 */
const NavIconButton = ({ item, isActive, onNav }) => {
  const [hovered, setHovered] = useState(false);
  // Teks tampil saat hover/focus ATAU saat section-nya aktif (scrollspy).
  const expanded = isActive || hovered;
  const ItemIcon = item.Icon;
  const label = item.label;
  return (
    <a
      href={`#${item.to}`}
      onClick={(e) => { e.preventDefault(); onNav(item.to); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={label}
      aria-expanded={expanded}
      title={label}
      className={cn(
        "inline-flex h-11 cursor-pointer items-center overflow-hidden rounded-[4px] transition-[padding,gap,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        expanded ? "gap-2 px-4" : "gap-0 px-[12px]",
        isActive
          ? "bg-[linear-gradient(0deg,#0055d4,#002f76)] text-white"
          : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
      )}
    >
      <ItemIcon aria-hidden="true" focusable="false" className="h-5 w-5 shrink-0" />
      <span
        aria-hidden={!expanded}
        className={cn(
          "inline-flex overflow-hidden whitespace-nowrap text-sm font-normal transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          expanded ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"
        )}
      >
        {label.split("").map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className={cn(
              "inline-block transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
              expanded ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
            )}
            style={{
              transitionDelay: expanded
                ? `${i * NAV_LABEL_IN_DELAY}ms`
                : `${(label.length - 1 - i) * NAV_LABEL_OUT_DELAY}ms`,
            }}
          >
            {ch}
          </span>
        ))}
      </span>
    </a>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Dynamic sticky navbar — tidak pernah sembunyi:
  // - di atas (y <= 24): floating pill, ada jarak dari viewport (lg:mt-6),
  //   rounded penuh + tinggi penuh (lg:p-[18px] / mobile h-16).
  // - saat scroll: menempel ke atas (lg:mt-0), sisi kiri-kanan atas jadi
  //   tegak lurus (rounded-t-none, border-t-0), tinggi menyusut sedikit
  //   (lg:py-[12px] / mobile h-14) biar terasa menyesuaikan medan.
  useEffect(() => {
    const update = (y) => setScrolled(y > 24);

    update(window.scrollY || 0);

    let ticking = false;
    const onWindowScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update(window.scrollY || 0);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });

    let off = null;
    if (lenis && typeof lenis.on === "function") {
      const onLenis = (e) => {
        const y =
          typeof e?.scroll === "number"
            ? e.scroll
            : typeof e?.anchor === "number"
              ? e.anchor
              : window.scrollY || 0;
        update(y);
      };
      lenis.on("scroll", onLenis);
      off = () => lenis.off?.("scroll", onLenis);
    }

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      off?.();
    };
  }, [lenis]);

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

  // Hover toggle mem-preview ikon lawan (grammar diagonal Design Portfolio):
  // dark Idle Sun -> hover Moon, light Idle Moon -> hover Sun.
  const IdleThemeIcon = isDark ? Sun : Moon;
  const HoverThemeIcon = isDark ? Moon : Sun;

  return (
    <>
      {/* Lapis 1 — outer: sticky, selalu terlihat.
          Atas: floating (lg:mt-6). Scroll: menempel rapat ke viewport (lg:mt-0). */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full flex-col items-center transition-all duration-300 ease-out lg:flex xl:mx-auto xl:max-w-7xl",
          scrolled ? "lg:mt-0" : "lg:mt-6"
        )}
      >
        {/* Lapis 2 — row: solid bar di mobile (`bg-ln-gray-900` ref →
            theme-aware), transparan mulai lg. Pill selalu center:
            `mac/xl:justify-stretch` ref sengaja tidak dipakai karena
            menimpa justify-center dan menarik pill ke kiri. */}
        <nav className="relative z-20 flex w-full items-center justify-center gap-8 bg-white/80 backdrop-blur-md dark:bg-[#080808]/80 lg:bg-transparent lg:[backdrop-filter:none] dark:lg:bg-transparent">
          {/* Lapis 3 — pill: radius manual 14px (frame 6px + padding 8px),
              bukan token rounded-*. Berlaku desktop + mobile;
              saat menempel sudut atas jadi 0. */}
          <div
            className={cn(
              "relative z-10 flex w-full items-center justify-between gap-4 bg-transparent px-4 transition-all duration-300 ease-out lg:w-auto lg:justify-start lg:gap-6 lg:bg-white lg:shadow-sm dark:lg:bg-[#0d0d0d]",
              scrolled ? "h-16 lg:h-auto lg:p-2 lg:shadow-md" : "h-[72px] lg:h-auto lg:p-2"
            )}
            style={{ borderRadius: scrolled ? "0 0 14px 14px" : "14px" }}
          >
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
            className="cursor-pointer ml-2 flex-shrink-0 rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Back to top"
          >
            <img src={Logo} alt="Nadi Rakhma" width="32" height="32" className="h-8 w-auto" />
          </a>

          {/* Pembungkus nav + aksi: celah antar kedua container 1px. */}
          <div className="hidden items-center gap-[4px] lg:flex">
          <div
            className={cn(
              // Frame ikon: background transparan (light maupun dark).
              // Light: outline gray-300. Dark: outline gradient via
              // .gradient-outline (ring ::before, interior transparan).
              "hidden items-center gap-[2px] rounded-[6px] border border-gray-300 bg-transparent p-2 lg:flex",
              isDark && "gradient-outline border-transparent"
            )}
          >
            {NAV_ITEMS.map((item) => (
              <NavIconButton
                key={item.to}
                item={item}
                isActive={activeSection === item.to}
                onNav={handleNavClick}
              />
            ))}
          </div>

          {/* Aksi kanan: frame kembaran nav ikon (transparan + outline),
              jadi tingginya sejajar penuh dengan container About–Connect. */}
          <div
            className={cn(
              "hidden items-center gap-[2px] rounded-[6px] border border-gray-300 bg-transparent p-2 lg:flex",
              isDark && "gradient-outline border-transparent"
            )}
          >
            <button
              onClick={toggleTheme}
              className="btn-base btn-ghost group h-11 w-11 !p-0 shrink-0"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="relative inline-block h-5 w-5 shrink-0" aria-hidden="true">
                <IdleThemeIcon aria-hidden="true" focusable="false" className="absolute inset-0 h-5 w-5 transition-all duration-200 group-hover:opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <HoverThemeIcon aria-hidden="true" focusable="false" className="absolute inset-0 h-5 w-5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className={cn(
                "btn-base btn-primary group relative h-11 px-5 !py-0 text-sm",
                // Urgent: alert always-on reuse persis Reveal photo.
                // Tidak urgent: alert hover-only seperti semula.
                SITE.urgentHire ? "btn-reveal-alert" : "btn-hire-alert"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-[4px] p-1",
                  SITE.urgentHire ? "btn-reveal-alert-ring" : "btn-hire-alert-ring"
                )}
              />
              <span className="relative">Hire me</span>
            </a>
          </div>
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
