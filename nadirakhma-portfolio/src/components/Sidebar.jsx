import { useEffect, useRef, useState } from "react";
import {
  Home,
  User,
  BriefcaseBusiness,
  Sparkles,
  Origami,
  MessageCircleMore,
} from "lucide-react";

// Item navigasi desktop
const NavItem = ({ icon: Icon, label, href, isExpanded }) => (
  <a
    href={href}
    className="group flex items-center px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
  >
    {/* Icon dikunci posisinya dengan lebar tetap */}
    <div className="w-8 flex justify-center">
      <Icon className="w-6 h-6 shrink-0" />
    </div>

    {/* Teks hanya muncul saat expanded, tapi tanpa menggeser icon */}
    <div
      className={`
        ml-3 text-sm whitespace-nowrap overflow-hidden
        transition-[max-width,opacity,transform] duration-300 origin-left
        ${isExpanded ? "max-w-[140px] opacity-100 scale-100" : "max-w-0 opacity-0 scale-95"}
      `}
    >
      {label}
    </div>
  </a>
);

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);

  const navItems = [
    { icon: Home, label: "Home", href: "#hero" },
    { icon: User, label: "About Me", href: "#about" },
    { icon: BriefcaseBusiness, label: "Experience", href: "#experience" },
    { icon: Sparkles, label: "Projects", href: "#projects" },
    { icon: Origami, label: "Skills", href: "#skills" },
    { icon: MessageCircleMore, label: "Connect", href: "#connect" },
  ];

  // Deteksi kursor di sekitar kotak sidebar (bukan seluruh sisi kiri layar)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = sidebarRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      const paddingX = 24; // jarak trigger horizontal di luar kotak
      const paddingY = 32; // jarak trigger vertikal di luar kotak

      const insideX =
        e.clientX >= rect.left - paddingX &&
        e.clientX <= rect.right + paddingX;
      const insideY =
        e.clientY >= rect.top - paddingY &&
        e.clientY <= rect.bottom + paddingY;

      setIsExpanded(insideX && insideY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        `}
      >
        <div className="flex flex-col items-stretch gap-2 w-full">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} isExpanded={isExpanded} />
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Navigation: hanya icon */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10 z-40 font-modern font-semibold">
        <div className="flex justify-around items-center py-2 px-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center justify-center px-3 py-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              <item.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
