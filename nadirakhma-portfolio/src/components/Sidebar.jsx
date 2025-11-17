import { useState } from "react";
import {
  Home,
  User,
  BriefcaseBusiness,
  Sparkles,
  Origami,
  MessageCircleMore,
  Menu,
  X,
} from "lucide-react";
import Logo from "../assets/logo.png";

// Komponen helper untuk ikon navigasi
const NavIcon = ({ icon: Icon, label, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="group relative flex justify-center items-center w-14 h-14 md:w-14 md:h-14 bg-[#CA3132] border-2 border-transparent hover:border-[#CA3132] hover:bg-[#CA3132]/20 rounded-2xl shadow-lg transition-all duration-300"
  >
    <Icon className="text-white w-6 h-6 md:w-7 md:h-7" />
    {/* Tooltip untuk desktop */}
    <span className="hidden md:block absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
      {label}
    </span>
  </a>
);

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { icon: Home, label: "Home", href: "#hero" },
    { icon: User, label: "About Me", href: "#about" },
    { icon: BriefcaseBusiness, label: "Experience", href: "#experience" },
    { icon: Sparkles, label: "Projects", href: "#projects" },
    { icon: Origami, label: "Skills", href: "#skills" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed top-0 left-0 h-full w-20 bg-indigo-950 flex-col items-center justify-between py-6 z-50 border-r border-indigo-800/50">
        <div className="group relative w-14 h-14 flex items-center justify-center bg-[#0A005A] p-2 rounded-2xl transition-all duration-300">
          <img
            src={Logo}
            alt="Logo"
            className="w-auto h-9 transition-all duration-300 group-hover:filter group-hover:exposure-100 group-hover:invert"
          />
          <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            Nadi Rakhma
          </span>
        </div>

        {/* Ikon Navigasi Tengah */}
        <div className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <NavIcon key={index} {...item} />
          ))}
        </div>

        {/* Ikon Kontak di Bawah */}
        <div className="flex flex-col gap-6">
          <NavIcon
            icon={MessageCircleMore}
            label="Connect"
            href="#connect"
          />
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-indigo-950 border-t border-indigo-800/50 z-50">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.slice(0, 4).map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#CA3132]/20 transition-all duration-300"
            >
              <item.icon className="text-white w-6 h-6" />
              <span className="text-white text-xs">{item.label}</span>
            </a>
          ))}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#CA3132]/20 transition-all duration-300"
          >
            <Menu className="text-white w-6 h-6" />
            <span className="text-white text-xs">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-indigo-950 shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-indigo-800/50">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-auto h-9" />
            <span className="text-white font-semibold text-lg">
              Nadi Rakhma
            </span>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-[#CA3132] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={toggleMobileMenu}
              className="flex items-center gap-4 px-4 py-3 text-white hover:bg-[#CA3132]/20 rounded-lg transition-all duration-300"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-base">{item.label}</span>
            </a>
          ))}
          <a
            href="#connect"
            onClick={toggleMobileMenu}
            className="flex items-center gap-4 px-4 py-3 text-white hover:bg-[#CA3132]/20 rounded-lg transition-all duration-300 mt-2 border-t border-indigo-800/50 pt-4"
          >
            <MessageCircleMore className="w-6 h-6" />
            <span className="text-base">Connect</span>
          </a>
        </div>
      </div>

      {/* Overlay untuk mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[55]"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
