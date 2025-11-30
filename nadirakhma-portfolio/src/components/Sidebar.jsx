import { useEffect, useRef, useState } from "react";
import {
  Home,
  User,
  BriefcaseBusiness,
  Sparkles,
  Origami,
  MessageCircleMore,
} from "lucide-react";

// Item navigasi desktop - dengan active state
const NavItem = ({ icon: Icon, label, href, isExpanded, isActive }) => (
  <a
    href={href}
    className={`group flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-white/20 text-white shadow-lg"
        : "text-white/70 hover:text-white hover:bg-white/10"
    }`}
  >
    {/* Icon dengan fixed width */}
    <div className="w-8 flex justify-center">
      <Icon
        className={`w-6 h-6 shrink-0 transition-colors duration-300 ${
          isActive ? "text-orange-300" : "text-white"
        }`}
      />
    </div>

    {/* Teks hanya muncul saat expanded */}
    <div
      className={`
        ml-3 text-sm whitespace-nowrap overflow-hidden
        transition-[max-width,opacity,transform] duration-300 origin-left
        ${
          isExpanded
            ? "max-w-[140px] opacity-100 scale-100"
            : "max-w-0 opacity-0 scale-95"
        }
      `}
    >
      {label}
    </div>

    {/* Indicator dot untuk active state */}
    {isActive && !isExpanded && (
      <div className="absolute left-0 w-1 h-8 bg-orange-300 rounded-r-lg"></div>
    )}
  </a>
);

// Item navigasi mobile - dengan active state
const MobileNavItem = ({ icon: Icon, href, isActive }) => (
  <a
    href={href}
    className={`flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-white/20 text-orange-300 shadow-md"
        : "text-white/70 hover:text-white hover:bg-white/10"
    }`}
    aria-label="Navigation item"
  >
    <Icon className="w-6 h-6" />
  </a>
);

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const sidebarRef = useRef(null);

  const navItems = [
    { icon: Home, label: "Home", href: "#hero", id: "hero" },
    { icon: User, label: "About Me", href: "#about", id: "about" },
    {
      icon: BriefcaseBusiness,
      label: "Experience",
      href: "#experience",
      id: "experience",
    },
    { icon: Sparkles, label: "Projects", href: "#projects", id: "projects" },
    { icon: Origami, label: "Skills", href: "#skills", id: "skills" },
    { icon: MessageCircleMore, label: "Connect", href: "#connect", id: "connect" },
  ];

  // Deteksi kursor di sekitar kotak sidebar untuk expand/collapse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = sidebarRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const paddingX = 24;
      const paddingY = 32;

      const insideX =
        e.clientX >= rect.left - paddingX && e.clientX <= rect.right + paddingX;
      const insideY =
        e.clientY >= rect.top - paddingY && e.clientY <= rect.bottom + paddingY;

      setIsExpanded(insideX && insideY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Deteksi scroll untuk highlight active section [web:63]
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      let currentSection = "hero";

      // Iterate through sections to find which one is in view
      for (const section of sections) {
        if (!section.element) continue;

        const rect = section.element.getBoundingClientRect();

        // Jika section berada di atas tengah viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <>
      {/* Desktop Floating Glass Sidebar */}
      <nav
        ref={sidebarRef}
        className={`
          hidden md:flex fixed left-4 top-1/2 -translate-y-1/2
          z-50 pointer-events-auto
          rounded-3xl border border-white/20
          bg-white/10 backdrop-blur-xl shadow-2xl
          transition-all duration-300 ease-out
          overflow-hidden
          ${isExpanded ? "w-56 px-3" : "w-16 px-2"}
          py-3
          font-modern font-semibold
          flex-col gap-2
        `}
      >
        <div className="flex flex-col items-stretch gap-2 w-full">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              <NavItem
                {...item}
                isExpanded={isExpanded}
                isActive={activeSection === item.id}
              />
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Navigation: Icon dengan active state */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-xl border-t border-white/10 z-40 font-modern font-semibold safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2 px-2 gap-1">
          {navItems.map((item, index) => (
            <MobileNavItem
              key={index}
              icon={item.icon}
              href={item.href}
              isActive={activeSection === item.id}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
