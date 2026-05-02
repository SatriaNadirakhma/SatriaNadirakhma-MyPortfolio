// src/components/Sidebar.jsx
import { useState, useEffect, useRef } from "react";
import {
  Home,
  User,
  BriefcaseBusiness,
  Sparkles,
  CircleStar,
  Origami,
  MessageCircleMore,
  MoreHorizontal,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [moreOpen, setMoreOpen]           = useState(false);
  const moreRef                           = useRef(null);

  // 5 item utama di nav bar — urut sesuai alur App.jsx
  const mainNav = [
    { label: "Home",      href: "#hero",       id: "hero",       icon: Home              },
    { label: "About",     href: "#about",      id: "about",      icon: User              },
    { label: "Experience",href: "#experience", id: "experience", icon: BriefcaseBusiness },
    { label: "Projects",  href: "#projects",   id: "projects",   icon: Sparkles          },
    { label: "Champions", href: "#champions",  id: "champions",  icon: CircleStar        },
  ];

  // Item tersembunyi di dalam "More" — lanjutan urutan
  const moreNav = [
    { label: "Skills",   href: "#skills",   id: "skills",   icon: Origami           },
    { label: "Connect",  href: "#connect",  id: "connect",  icon: MessageCircleMore },
  ];

  const allNav = [...mainNav, ...moreNav];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      let current = "hero";
      for (const item of allNav) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup popover saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreOpen]);

  // Apakah ada item "more" yang sedang aktif
  const moreIsActive = moreNav.some((item) => item.id === activeSection);

  return (
    <>
      {/* ── Desktop: Top Navbar ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          <a
            href="#hero"
            className="font-stylish italic text-white text-xl sm:text-2xl tracking-wide hover:text-orange-200 transition-colors duration-300 select-none"
          >
            Nadi Rakhma
          </a>

          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {allNav.slice(1).map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`text-[10px] lg:text-xs tracking-[0.18em] uppercase font-modern transition-all duration-300 relative group ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-white/35 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-orange-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Mobile: Bottom Nav Bar ─────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080808]/85 backdrop-blur-xl border-t border-white/[0.06]">

        {/* "More" popover — muncul tepat di atas tombol More */}
        <div
          ref={moreRef}
          className={`absolute bottom-full right-4 mb-3 transition-all duration-300 ${
            moreOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-[#141414] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl min-w-[160px]">
            {/* Header popover */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-[9px] tracking-[0.2em] uppercase font-modern text-white/25">
                More
              </span>
              <button
                onClick={() => setMoreOpen(false)}
                className="text-white/25 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Hidden nav items */}
            {moreNav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.05]"
                      : "text-white/40 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-modern tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Popover tail/arrow */}
          <div
            className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#141414] border-r border-b border-white/[0.1] rotate-45"
          />
        </div>

        {/* Nav items row */}
        <div className="flex items-center justify-around px-1 py-2">
          {mainNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-label={item.label}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-300 ${
                  isActive ? "text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
                <span
                  className={`text-[9px] tracking-wide font-modern transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-orange-400" />
                )}
              </a>
            );
          })}

          {/* ── More button ── */}
          <button
            onClick={() => setMoreOpen((prev) => !prev)}
            aria-label="More navigation"
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-300 ${
              moreIsActive || moreOpen ? "text-white" : "text-white/30 hover:text-white/60"
            }`}
          >
            <div className="relative">
              <MoreHorizontal
                className={`w-5 h-5 transition-transform duration-300 ${
                  moreOpen ? "scale-110" : "scale-100"
                }`}
              />
              {/* Badge — muncul kalau salah satu item "more" sedang aktif */}
              {moreIsActive && !moreOpen && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-orange-400" />
              )}
            </div>
            <span
              className={`text-[9px] tracking-wide font-modern transition-all duration-300 ${
                moreIsActive || moreOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              More
            </span>
            {(moreIsActive || moreOpen) && (
              <span className="w-1 h-1 rounded-full bg-orange-400" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;