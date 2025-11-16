import {
  Home,
  User,
  BriefcaseBusiness,
  Sparkles,
  Origami,
  MessageCircleMore,
} from "lucide-react";
import Logo from "../assets/logo.png";

// Komponen helper untuk ikon navigasi
const NavIcon = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    className="group relative flex justify-center items-center w-14 h-14 bg-[#CA3132] border-2 border-transparent hover:border-[#CA3132] hover:bg-[#CA3132]/20 rounded-2xl shadow-lg transition-all duration-300"
  >
    <Icon className="text-white w-7 h-7" />
    {/* Tooltip yang muncul saat hover */}
    <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
      {label}
    </span>
  </a>
);

const Sidebar = () => {
  return (
    <nav className="fixed top-0 left-0 h-full w-20 bg-indigo-950 flex flex-col items-center justify-between py-6 z-50 border-r border-indigo-800/50">
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
        <NavIcon icon={Home} label="Home" href="#hero" />
        <NavIcon icon={User} label="About Me" href="#about" />
        <NavIcon
          icon={BriefcaseBusiness}
          label="Experience"
          href="#experience"
        />
        <NavIcon icon={Sparkles} label="Projects" href="#projects" />
        <NavIcon icon={Origami} label="Skills" href="#skills" />
      </div>

      {/* Ikon Kontak di Bawah */}
      <div className="flex flex-col gap-6">
        <NavIcon icon={MessageCircleMore} label="Connect" href="#connect" />
      </div>
    </nav>
  );
};
export default Sidebar;
