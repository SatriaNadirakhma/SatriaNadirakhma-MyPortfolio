import { Home, User, Users, GraduationCap, Star, MessageCircle, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navItems = [
  { icon: Home, href: "#home", label: "Home" },
  { icon: User, href: "#profile", label: "Profile" },
  { icon: Users, href: "#team", label: "Team" },
  { icon: GraduationCap, href: "#education", label: "Education" },
  { icon: Star, href: "#favorites", label: "Favorites" },
];

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-24 bg-gradient-to-b from-[hsl(var(--sidebar-bg))] to-[hsl(244,65%,15%)] flex flex-col items-center py-8 px-4 z-50">
      {/* Logo Section */}
      <div className="mb-12">
        <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--sidebar-logo-bg))] border-2 border-[hsl(244,45%,35%)] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[hsl(244,45%,25%)]" />
          <BarChart3 className="w-8 h-8 text-[hsl(var(--sidebar-logo-accent))] relative z-10" strokeWidth={2.5} />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className={`w-14 h-14 rounded-2xl bg-[hsl(var(--sidebar-nav-bg))] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[hsl(var(--sidebar-nav-hover))] shadow-lg hover:shadow-xl ${
              activeSection === item.href.substring(1) ? "ring-2 ring-white ring-offset-2 ring-offset-[hsl(var(--sidebar-bg))] scale-105" : ""
            }`}
            title={item.label}
          >
            <item.icon className="w-6 h-6 text-[hsl(var(--sidebar-nav-icon))]" strokeWidth={2.5} />
          </button>
        ))}
      </nav>

      {/* Bottom Action */}
      <div className="mt-auto">
        <button
          className="w-14 h-14 rounded-2xl bg-[hsl(var(--sidebar-nav-bg))] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[hsl(var(--sidebar-nav-hover))] shadow-lg hover:shadow-xl"
          title="Messages"
        >
          <MessageCircle className="w-6 h-6 text-[hsl(var(--sidebar-nav-icon))]" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
