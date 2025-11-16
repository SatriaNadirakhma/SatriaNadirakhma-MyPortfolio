// src/components/Connect.jsx
// Gunakan react-icons untuk ikon brand
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaDribbble,
  FaBehance,
  FaWhatsapp,
} from "react-icons/fa";

// ❗ Ganti link '#' dengan URL Anda
const socialLinks = [
  { icon: FaGithub, href: "#", name: "GitHub" },
  { icon: FaInstagram, href: "#", name: "Instagram" },
  { icon: FaLinkedin, href: "#", name: "LinkedIn" },
  { icon: FaDribbble, href: "#", name: "Dribbble" },
  { icon: FaBehance, href: "#", name: "Behance" },
  { icon: FaWhatsapp, href: "#", name: "WhatsApp" },
];

const Connect = () => {
  return (
    <section id="connect" className="py-20 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
      <p className="text-xl text-indigo-300 mb-10 max-w-lg mx-auto">
        Saya sedang mencari peluang baru. Jangan ragu untuk menghubungi saya!
      </p>

      <div className="flex justify-center flex-wrap gap-6 md:gap-8">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="text-indigo-300 hover:text-red-500 transform transition-all duration-300 hover:scale-125"
          >
            <link.icon className="w-8 h-8 md:w-10 md:h-10" />
          </a>
        ))}
      </div>
    </section>
  );
};
export default Connect;
