// src/components/Footer.jsx
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-5 sm:px-8 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.2em] uppercase font-modern text-white/20">
            &copy; {currentYear} Satria Rakhmadani
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase font-modern text-white/15">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
