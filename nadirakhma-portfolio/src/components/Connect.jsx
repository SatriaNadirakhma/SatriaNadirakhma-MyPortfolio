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
  { icon: FaGithub, href: "https://github.com/SatriaNadirakhma", name: "GitHub" },
  { icon: FaInstagram, href: "https://www.instagram.com/nadirakhma.svg/", name: "Instagram" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/satria-rakhmadani/", name: "LinkedIn" },
  { icon: FaDribbble, href: "https://dribbble.com/Rakhmadani", name: "Dribbble" },
  { icon: FaBehance, href: "https://www.behance.net/rakhmanadi2005", name: "Behance" },
  { icon: FaWhatsapp, href: "https://wa.me/qr/QZZFNQE72CGXP1", name: "WhatsApp" },
];

const Connect = () => {
  return (
    <section id="connect" className="py-20 text-center">
      <h2 className="text-6xl md:text-8xl font-stylish italic text-white mb-3">Let's Connect</h2>
      <p className="text-lg font-modern text-gray-300 mb-10 max-w-lg mx-auto">
        I am looking for new opportunities and project collaborations. Please feel free to contact me!
      </p>

      <div className="flex justify-center flex-wrap gap-6 md:gap-8">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="text-gray-300 hover:text-gray-400 transform transition-all duration-300 hover:scale-125"
          >
            <link.icon className="w-8 h-8 md:w-10 md:h-10" />
          </a>
        ))}
      </div>
    </section>
  );
};
export default Connect;
