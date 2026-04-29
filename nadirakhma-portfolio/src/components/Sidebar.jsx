// src/components/Sidebar.jsx
// Converted from floating sidebar → minimal editorial top navbar
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "About", href: "#about", id: "about" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Champions", href: "#champions", id: "champions" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Connect", href: "#connect", id: "connect" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));
      let current = "hero";
      for (const section of sections) {
        if (!section.element) continue;
        const rect = section.element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Top Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#hero"
            className="font-stylish italic text-white text-xl sm:text-2xl tracking-wide hover:text-blue-200 transition-colors duration-300 select-none"
          >
            Nadi Rakhma
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.slice(1).map((item) => (
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
                {/* Active underline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-blue-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white/50 hover:text-white transition-colors p-1 -mr-1"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#080808] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Nav Items */}
        <div className="flex flex-col items-center gap-7">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-4xl font-stylish italic transition-all duration-300 ${
                activeSection === item.id
                  ? "text-white"
                  : "text-white/25 hover:text-white"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="absolute bottom-8 text-xs tracking-[0.3em] uppercase font-modern text-white/20">
          Malang, Indonesia
        </p>
      </div>
    </>
  );
};

export default Sidebar;
