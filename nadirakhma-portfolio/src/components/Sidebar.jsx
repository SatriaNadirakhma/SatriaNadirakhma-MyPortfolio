import { Home, User, Briefcase, Star, Wrench, MessageSquare } from 'lucide-react';
import Logo from '../assets/logo.png'; 

// Komponen helper untuk ikon navigasi
const NavIcon = ({ icon: Icon, label, href }) => (
  <a 
    href={href}
    className="group relative flex justify-center items-center w-14 h-14 bg-red-600 hover:bg-red-700 rounded-xl shadow-lg transition-all duration-300"
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
      
      <div className="w-14 h-14 flex items-center justify-center bg-indigo-800 p-2 rounded-lg">
        <img src={Logo} alt="Logo" className="w-8 h-auto" />
      </div>

      {/* Ikon Navigasi Tengah */}
      <div className="flex flex-col gap-6">
        <NavIcon icon={Home} label="Home" href="#hero" />
        <NavIcon icon={User} label="About Me" href="#about" />
        <NavIcon icon={Briefcase} label="Experience" href="#experience" />
        <NavIcon icon={Star} label="Projects" href="#projects" />
        <NavIcon icon={Wrench} label="Skills" href="#skills" />
      </div>

      {/* Ikon Kontak di Bawah */}
      <div className="flex flex-col gap-6">
        <NavIcon icon={MessageSquare} label="Connect" href="#connect" />
      </div>
    </nav>
  );
};
export default Sidebar;