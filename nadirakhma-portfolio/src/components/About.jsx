import Logo from "../assets/logo.png";
import cvATS from "../assets/pdf/cv-ats.pdf";
import cvCreative from "../assets/pdf/cv.pdf";

const About = () => {
  const stylishFont = "font-serif";

  // Helper untuk teks bergaris bawah
  const HighlightText = ({ children }) => (
    <span className="relative inline-block">
      {children}
      <span className="absolute left-0 -bottom-0 w-full h-0.5 bg-[#FF6600] opacity-50"></span>
    </span>
  );

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Konten Teks */}
        <div>
          <h2 className={`text-6xl md:text-8xl font-stylish text-white mb-8`}>
            About Me
          </h2>
          <p className="text-lg font-modern text-indigo-200 leading-relaxed mb-10">
            I am passionate about building{" "}
            <HighlightText>
              creative and user-centered digital experiences
            </HighlightText>{" "}
            through{" "}
            <HighlightText>
              Front-End Development, Graphic and UI Design
            </HighlightText>
            . Driven by curiosity and innovation, I aim to contribute to a
            forward-thinking team where I can apply my{" "}
            <HighlightText>design sense and technical expertise</HighlightText>{" "}
            to create{" "}
            <HighlightText>meaningful digital solutions</HighlightText>.
          </p>

          <div className="flex gap-6">
            <a
              href={cvATS}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              CV ATS
            </a>

            <a
              href={cvCreative}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              CV Creative
            </a>
          </div>
        </div>

        {/* Logo M */}
        <div className="flex justify-center items-center">
          {/* ❗ Pastikan path logo-m-3d.png sudah benar */}
          <img src={Logo} alt="Logo" className="w-full max-w-sm" />
        </div>
      </div>
    </section>
  );
};
export default About;
