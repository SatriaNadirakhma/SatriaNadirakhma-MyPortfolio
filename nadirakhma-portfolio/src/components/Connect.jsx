// src/components/Connect.jsx
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaDribbble,
  FaBehance,
  FaWhatsapp,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/SatriaNadirakhma",
    name: "GitHub",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/nadirakhma.svg/",
    name: "Instagram",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/satria-rakhmadani/",
    name: "LinkedIn",
  },
  {
    icon: FaDribbble,
    href: "https://dribbble.com/Rakhmadani",
    name: "Dribbble",
  },
  {
    icon: FaBehance,
    href: "https://www.behance.net/rakhmanadi2005",
    name: "Behance",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/qr/QZZFNQE72CGXP1",
    name: "WhatsApp",
  },
];

const Connect = () => {
  return (
    <section id="connect" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top border */}
        <div className="border-t border-white/[0.07] pt-16 sm:pt-20">
          {/* Label */}
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="w-6 h-px bg-white/20" />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/30">
              Get In Touch
            </p>
          </div>

          {/* Big headline */}
          <h2
            className="font-stylish italic text-white leading-[0.92] mb-8 sm:mb-12"
            style={{ fontSize: "clamp(48px, 9vw, 144px)" }}
          >
            Let's{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                color: "transparent",
              }}
            >
              work
            </span>
            <br />
            together.
          </h2>

          {/* Subtext */}
          <p className="text-sm sm:text-base font-modern text-white/35 max-w-md leading-relaxed mb-12 sm:mb-16">
            Looking for new opportunities and project collaborations. Feel free
            to reach out — I'd love to hear from you.
          </p>

          {/* Social Links row */}
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-modern text-white/25 hover:text-white transition-all duration-300"
              >
                <link.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                {link.name}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-0.5 translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
