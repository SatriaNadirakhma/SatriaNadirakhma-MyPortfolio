// src/components/Footer.jsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center py-8 mt-12 border-t border-indigo-800/50">
      <p className="text-indigo-400 text-sm">
        &copy; {currentYear} Satria Rakhmadani. All Rights Reserved.
      </p>
    </footer>
  );
};
export default Footer;