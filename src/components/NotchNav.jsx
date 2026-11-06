import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import {
  Check,
  NavArrowDown,
  NavArrowUp,
  User,
  Suitcase,
  Folder,
  Trophy,
  Tools,
  Mail,
  HalfMoon as Moon,
  SunLight as Sun,
} from "iconoir-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import { useActiveSection } from "@hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { REVEAL_SECTIONS_EVENT } from "@components/InView";
import Logo from "@assets/logo.png";
import { SITE, SECTION_IDS } from "@constants/index";

/* ── Notch navbar ──────────────────────────────────────────────────────
   Mengikuti template NotchNav: frame bezel 8px dengan sudut dalam rounded-2xl
   (md+), tiga notch terpisah di desktop (logo kiri, tablist tengah, aksi
   kanan) yang menempel di tepi dalam frame, dan satu island compact +
   dropdown di bawah `xl`. Stack site ini: motion/react, iconoir-react,
   Lenis, scrollspy useActiveSection. Non-aktif tanpa efek hover; pill aktif
   memakai gradient biru brand. */

const NAV_ITEMS = [
  { label: "About", to: SECTION_IDS.about, Icon: User },
  { label: "Experience", to: SECTION_IDS.experience, Icon: Suitcase },
  { label: "Projects", to: SECTION_IDS.projects, Icon: Folder },
  { label: "Champions", to: SECTION_IDS.champions, Icon: Trophy },
  { label: "Skills", to: SECTION_IDS.skills, Icon: Tools },
  { label: "Connect", to: SECTION_IDS.connect, Icon: Mail },
];

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.to);

// Satu spring untuk pill aktif — satu-satunya animasi motion di navbar.
const NOTCH_SPRING = { type: "spring", stiffness: 400, damping: 30 };

/* Warna notch mengikuti tema situs (resolvedTheme dari ThemeContext), BUKAN
   varian Tailwind `dark:` — varian itu bisa mengikuti preferensi OS alih-alih
   tombol toggle, sehingga notch jadi kebalik. Tone soft-shaded: light → notch
   putih, dark → notch hitam. String kelas ditulis utuh agar terbaca scanner
   Tailwind. */
const NOTCH_TONE = {
  light: {
    // Light mode → notch PUTIH (soft: #ffffff di atas bg halaman #fafafa,
    // beda halus seperti `bg-white` navbar lama — island tetap terlihat).
    bg: "bg-white text-zinc-950",
    fill: "text-white",
    muted: "text-zinc-500",
    selected: "bg-blue-600/15 text-zinc-900",
    check: "text-blue-600",
    badge: "bg-zinc-200 text-zinc-700",
    bezel: "shadow-[0_0_0_100vmax_#ffffff]",
    backdrop: "bg-black/20",
  },
  dark: {
    // Dark mode → notch HITAM (soft: #0d0d0d di atas bg halaman #080808,
    // warna yang sama dipakai navbar lama `dark:lg:bg-[#0d0d0d]`).
    bg: "bg-[#0d0d0d] text-zinc-50",
    fill: "text-[#0d0d0d]",
    muted: "text-zinc-400",
    selected: "bg-blue-500/15 text-white",
    check: "text-blue-400",
    badge: "bg-zinc-800 text-zinc-300",
    bezel: "shadow-[0_0_0_100vmax_#0d0d0d]",
    backdrop: "bg-black/40",
  },
};

function useNotchTone() {
  const { resolvedTheme } = useTheme();
  return NOTCH_TONE[resolvedTheme === "dark" ? "dark" : "light"];
}

/* ══ Wings (sudut cekung) ═════════════════════════════════════════════ */

export function NotchLeftWing({ position = "top", className }) {
  const isBottom = position === "bottom";
  const tone = useNotchTone();

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-full size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        tone.fill,
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 0 20 C 11.046 20 20 11.046 20 0 H 21 V 21 H 0 Z"
            : "M 0 0 C 11.046 0 20 8.954 20 20 H 21 V -1 H 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchRightWing({ position = "top", className }) {
  const isBottom = position === "bottom";
  const tone = useNotchTone();

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-full size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        tone.fill,
        isBottom ? "bottom-0" : "top-0",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 20 20 C 8.954 20 0 11.046 0 0 H -1 V 21 H 20 Z"
            : "M 20 0 C 8.954 0 0 8.954 0 20 H -1 V -1 H 20 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerLeftWing({ position = "top", className }) {
  const isBottom = position === "bottom";
  const tone = useNotchTone();

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute left-0 size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        tone.fill,
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 0 20 H 20 C 8.954 20 0 11.046 0 0 V 20 Z"
            : "M 0 0 H 20 C 8.954 0 0 8.954 0 20 V 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function NotchCornerRightWing({ position = "top", className }) {
  const isBottom = position === "bottom";
  const tone = useNotchTone();

  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      shapeRendering="geometricPrecision"
      className={cn(
        "pointer-events-none absolute right-0 size-2.5 md:size-4 overflow-visible select-none transition-colors duration-200",
        tone.fill,
        isBottom ? "bottom-full" : "top-full",
        className
      )}
    >
      <path
        d={
          isBottom
            ? "M 20 20 H 0 C 11.046 20 20 11.046 20 0 V 20 Z"
            : "M 20 0 H 0 C 11.046 0 20 8.954 20 20 V 0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

/* ══ Item tablist (desktop) ═══════════════════════════════════════════
   Idle: ikon + teks selalu tampil penuh. Non-aktif: tanpa efek hover.
   Aktif: pill gradient biru brand (layout spring) + brightness saat hover. */

export const NotchItem = forwardRef(
  (
    {
      id,
      label,
      isActive,
      icon: Icon,
      badge,
      disabled,
      className,
      onClick,
      onSelect,
      ...props
    },
    ref
  ) => {
    const tone = useNotchTone();

    const handleClick = (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onSelect(id);
      onClick?.(event);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!disabled) onSelect(id);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "group relative flex h-9 cursor-pointer items-center gap-2 rounded-full px-3.5 text-sm font-medium outline-none select-none",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
          // Idle: teks + ikon selalu terlihat, hanya beda intensitas warna.
          isActive
            ? "font-semibold text-white"
            : tone.muted,
          disabled && "cursor-not-allowed pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {isActive && (
          <motion.span
            layoutId="notch-active-pill"
            transition={NOTCH_SPRING}
            className="absolute inset-0 rounded-xl bg-[linear-gradient(0deg,#0055d4,#002f76)] shadow-[0_0_14px_rgba(59,130,246,0.35)] group-hover:brightness-110 motion-reduce:transition-none"
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {Icon && (
            <Icon
              aria-hidden="true"
              focusable="false"
              className={cn(
                "size-4 shrink-0",
                !isActive && "opacity-70"
              )}
            />
          )}

          <span className="leading-none whitespace-nowrap">{label}</span>

          {badge && (
            <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-tight uppercase", tone.badge)}>
              {badge}
            </span>
          )}
        </span>
      </button>
    );
  }
);

NotchItem.displayName = "NotchItem";

/* ══ Item dropdown (mobile) ═══════════════════════════════════════════ */

function NotchDropdownItem({ item, isSelected, onSelect }) {
  const Icon = item.Icon;
  const tone = useNotchTone();

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(item.to)}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-left text-sm outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500",
        isSelected
          ? cn("font-semibold", tone.selected)
          : tone.muted,
        item.disabled && "cursor-not-allowed pointer-events-none opacity-40"
      )}
    >
      <span className="flex items-center gap-2.5">
        {Icon && (
          <Icon
            aria-hidden="true"
            focusable="false"
            className={cn("size-4 shrink-0", !isSelected && "opacity-70")}
          />
        )}

        <span>{item.label}</span>
      </span>

      {isSelected && (
        <Check
          aria-hidden="true"
          className={cn("size-3.5", tone.check)}
        />
      )}
    </button>
  );
}

/* ══ NotchNav ═════════════════════════════════════════════════════════ */

const NotchNav = () => {
  const containerRef = useRef(null);

  const layoutGroupId = useId();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tone = NOTCH_TONE[isDark ? "dark" : "light"];
  const { lenis } = useLenis();
  const routerNavigate = useNavigate();
  const location = useLocation();

  // Scrollspy real — hanya di landing; di /projects tidak ada section.
  const rawActive = useActiveSection(NAV_SECTION_IDS);
  const activeSection = location.pathname === "/" ? rawActive : null;

  // Semua tab dianggap aktif via scrollspy — pill juga bergerak saat masih
  // di Hero (activeSection null): tidak ada item aktif, pill disembunyikan.
  // Trigger dropdown mobile butuh label fallback saat tidak ada aktif.
  const activeItem = useMemo(
    () => NAV_ITEMS.find((item) => item.to === activeSection) || null,
    [activeSection]
  );

  // Dropdown terbuka → stop Lenis, bukan cuma overflow (gesture wheel/trackpad
  // di atas menu bisa tetap menggulir halaman di belakangnya kalau cuma
  // body overflow yang dikunci).
  useEffect(() => {
    if (isDropdownOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDropdownOpen, lenis]);

  // Tutup dropdown: klik di luar island, atau tekan Escape.
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  const scrollToId = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -64 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return true;
    },
    [lenis]
  );

  // Scroll yang juga menjangkau section lazy di <InView> yang belum
  // ter-mount: paksa render semuanya dulu, lalu scroll setelah target ada.
  const scrollToSection = useCallback(
    (id) => {
      // Saat dropdown terbuka, Lenis stopped + overflow terkunci — start
      // dan buka kunci dulu supaya scrollTo tidak no-op.
      lenis?.start();
      document.body.style.overflow = "";
      if (scrollToId(id)) return true;
      window.dispatchEvent(new Event(REVEAL_SECTIONS_EVENT));
      let attempts = 0;
      const poll = () => {
        if (scrollToId(id)) return;
        // Chunk lazy butuh waktu fetch di jaringan lambat — hingga ~5 dtk.
        if (attempts++ < 25) setTimeout(poll, 200);
      };
      setTimeout(poll, 120);
      return true;
    },
    [lenis, scrollToId]
  );

  const handleNavClick = useCallback(
    (sectionId) => {
      // Cross-page: dari /projects balik ke landing pada section target.
      if (location.pathname !== "/") {
        setIsDropdownOpen(false);
        lenis?.start();
        document.body.style.overflow = "";
        routerNavigate(`/#${sectionId}`);
        // Tunggu route + lazy section mount (App-level hash effect juga
        // me-retry + me-reveal; ini cadangan untuk chunk lambat).
        window.dispatchEvent(new Event(REVEAL_SECTIONS_EVENT));
        let attempts = 0;
        const tryScroll = () => {
          if (scrollToId(sectionId)) return;
          window.dispatchEvent(new Event(REVEAL_SECTIONS_EVENT));
          if (attempts++ < 25) setTimeout(tryScroll, 200);
        };
        setTimeout(tryScroll, 250);
        return;
      }
      // Same page. Saat dropdown terbuka, tutup dulu lalu scroll setelah
      // tutup (Lenis masih stopped saat klik terjadi).
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
        setTimeout(() => scrollToSection(sectionId), 80);
        return;
      }
      scrollToSection(sectionId);
    },
    [
      lenis,
      location.pathname,
      routerNavigate,
      scrollToId,
      scrollToSection,
      isDropdownOpen,
    ]
  );

  const handleLogoClick = useCallback(
    (event) => {
      event.preventDefault();
      if (location.pathname !== "/") {
        routerNavigate("/");
        setTimeout(() => {
          if (lenis) lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }, 150);
        return;
      }
      handleNavClick(SECTION_IDS.hero);
    },
    [location.pathname, routerNavigate, lenis, handleNavClick]
  );

  return (
    <>
      {/* Backdrop dropdown mobile/tablet — mengikuti area dalam frame template
          (inset-2 + rounded-2xl di md+), klik menutup, di bawah island (z-40). */}
      <div
        aria-hidden="true"
        onClick={() => setIsDropdownOpen(false)}
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-200 ease-out md:inset-2 md:rounded-2xl xl:hidden",
          isDropdownOpen
            ? cn("pointer-events-auto opacity-100 backdrop-blur-[2px]", tone.backdrop)
            : "pointer-events-none opacity-0"
        )}
      />

      {/* ── Frame / bezel ala template: p-2 + area dalam rounded-2xl (md+) ──
          Halaman scroll di window (Lenis), jadi frame digambar sebagai
          overlay: kotak inset-2 rounded-2xl dengan box-shadow spread besar
          mewarnai semua yang di luarnya — hasilnya bezel 8px dengan sudut
          dalam membulat persis seperti `p-2` + `rounded-2xl` di template.
          Mobile (< md) p-0 tanpa rounded → tidak ada bezel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 hidden overflow-hidden md:block"
      >
        <div className={cn("absolute inset-2 rounded-2xl transition-shadow duration-200", tone.bezel)} />
      </div>

      {/* ── 1. Desktop: notch logo (kiri) ── */}
      <aside
        aria-label="Brand logo notch"
        className={cn("fixed top-2 left-2 z-50 hidden h-10 items-start rounded-br-[24px] px-5 select-none transition-colors duration-200 xl:flex", tone.bg)}
      >
        <NotchRightWing />
        <NotchCornerLeftWing />

        <a
          href={`#${SECTION_IDS.hero}`}
          onClick={handleLogoClick}
          className="flex h-9 shrink-0 cursor-pointer items-center rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Back to top"
        >
          <img
            src={Logo}
            alt="Nadi Rakhma"
            width="32"
            height="32"
            className="h-6 w-auto"
          />
        </a>
      </aside>

      {/* ── 2. Desktop: notch menu (tengah) ── */}
      <header
        role="tablist"
        aria-orientation="horizontal"
        className={cn("fixed top-2 left-1/2 z-50 hidden h-11 -translate-x-1/2 items-start rounded-b-[24px] px-4 select-none transition-colors duration-200 xl:flex", tone.bg)}
      >
        <NotchLeftWing />
        <NotchRightWing />

        <LayoutGroup id={layoutGroupId}>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NotchItem
                key={item.to}
                id={item.to}
                label={item.label}
                icon={item.Icon}
                isActive={activeSection === item.to}
                onSelect={handleNavClick}
              />
            ))}
          </div>
        </LayoutGroup>
      </header>

      {/* ── 3. Desktop: notch aksi (kanan) ── */}
      <aside
        aria-label="Aksi pengguna notch"
        className={cn("fixed top-2 right-2 z-50 hidden h-10 items-start rounded-bl-[24px] px-5 select-none transition-colors duration-200 xl:flex", tone.bg)}
      >
        <NotchLeftWing />
        <NotchCornerRightWing />

        <div className="flex h-9 items-center gap-2">
          <button
            onClick={toggleTheme}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun aria-hidden="true" focusable="false" className="size-5" />
            ) : (
              <Moon aria-hidden="true" focusable="false" className="size-5" />
            )}
          </button>

          <a
            href={`mailto:${SITE.email}`}
            className={cn(
              "btn-base btn-primary group relative h-8 !py-0 px-4 text-xs",
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
      </aside>

      {/* ───────────────────────────────────────────────────────────────
          TABLET & MOBILE (< 1280px): satu island compact + dropdown,
          sama seperti template — logo kiri, trigger tengah, aksi kanan.
      ──────────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className={cn("fixed top-0 left-1/2 z-50 flex w-auto max-w-[calc(100vw-1.5rem)] -translate-x-1/2 flex-col rounded-b-[24px] px-4 select-none transition-colors duration-200 md:top-2 xl:hidden", tone.bg)}
      >
        <NotchLeftWing />
        <NotchRightWing />

        {/* Bar utama */}
        <div className="flex h-10 w-full items-center justify-between gap-3 sm:gap-5 md:items-start">
          {/* Logo kiri */}
          <a
            href={`#${SECTION_IDS.hero}`}
            onClick={handleLogoClick}
            className="flex h-8 shrink-0 cursor-pointer items-center rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:h-9"
            aria-label="Back to top"
          >
            <img
              src={Logo}
              alt="Nadi Rakhma"
              width="24"
              height="24"
              className="h-6 w-auto"
            />
          </a>

          {/* Trigger dropdown — ikon + label section aktif selalu tampil. */}
          <button
            type="button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Toggle navigation menu"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex h-8 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm md:h-9"
          >
            {activeItem?.Icon ? (
              <activeItem.Icon
                aria-hidden="true"
                focusable="false"
                className="size-3.5 shrink-0 opacity-70 sm:size-4"
              />
            ) : null}

            <span className="leading-none truncate">
              {activeItem ? activeItem.label : "Menu"}
            </span>

            {isDropdownOpen ? (
              <NavArrowUp aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
            ) : (
              <NavArrowDown aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
            )}
          </button>

          {/* Aksi kanan */}
          <div className="flex h-8 w-max shrink-0 items-center justify-end gap-1 md:h-9">
            <button
              onClick={() => {
                toggleTheme();
                setIsDropdownOpen(false);
              }}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun aria-hidden="true" focusable="false" className="size-4" />
              ) : (
                <Moon aria-hidden="true" focusable="false" className="size-4" />
              )}
            </button>

            <a
              href={`mailto:${SITE.email}`}
              className={cn(
                "btn-base btn-primary group relative h-7 !py-0 px-3 text-[11px]",
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
              <span className="relative">Hire</span>
            </a>
          </div>
        </div>

        {/* Dropdown expandable — grid-rows transition, tanpa motion. */}
        <div
          role="listbox"
          aria-label="Pilihan navigasi"
          className={cn(
            "grid w-full transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
            isDropdownOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] pointer-events-none opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex w-full flex-col gap-0.5 px-0.5 pt-1.5 pb-2.5">
              {NAV_ITEMS.map((item) => (
                <NotchDropdownItem
                  key={item.to}
                  item={item}
                  isSelected={item.to === activeSection}
                  onSelect={(id) => {
                    setIsDropdownOpen(false);
                    handleNavClick(id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotchNav;