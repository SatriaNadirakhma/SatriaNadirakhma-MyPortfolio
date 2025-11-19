// src/components/Footer.jsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center py-8 mt-12">
      <p className="text-gray-400 text-sm font-modern">
        &copy; {currentYear} Satria Rakhmadani. All Rights Reserved.
      </p>
    </footer>
  );
};
export default Footer;
