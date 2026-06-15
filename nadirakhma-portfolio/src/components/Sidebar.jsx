import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import Logo from "@assets/logo.png";
import { SECTION_IDS } from "@constants/index";

const NAV_ITEMS = [
  { label: "About", to: SECTION_IDS.about },
  { label: "Experience", to: SECTION_IDS.experience },
  { label: "Projects", to: SECTION_IDS.projects },
  { label: "Skills", to: SECTION_IDS.skills },
  { label: "Connect", to: SECTION_IDS.connect },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-lg shadow-sm dark:bg-[#111111]/50 dark:shadow-none"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to={SECTION_IDS.hero}
            smooth
            duration={500}
            className="cursor-pointer"
            aria-label="Back to top"
          >
            <img src={Logo} alt="Nadi Rakhma Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={500}
                offset={-60}
                className="text-[11px] tracking-[0.2em] uppercase font-modern text-gray-500 hover:text-gray-900 dark:text-white/35 dark:hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-500 hover:text-gray-900 dark:text-white/60 dark:hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 backdrop-blur-xl bg-white/95 dark:bg-[#080808]/95" />

          <div className="relative flex flex-col items-center justify-center h-full gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={500}
                offset={-60}
                onClick={() => setIsOpen(false)}
                className="text-lg tracking-[0.3em] uppercase font-modern text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
