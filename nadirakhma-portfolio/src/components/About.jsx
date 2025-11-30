import Sticker from "../assets/sticker.png";

const About = () => {
  // Helper untuk teks bergaris bawah - Responsive
  const HighlightText = ({ children }) => (
    <span className="font-modern font-semibold italic relative inline-block text-orange-100">
      {children}
      <span className="absolute left-0 -bottom-0 sm:-bottom-0.5 w-full h-0.5 bg-orange-100 opacity-50"></span>
    </span>
  );

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6"
    >
      <div className="flex flex-col items-center text-center max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {/* Heading - Responsive */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-stylish text-white italic leading-tight">
          About Me
        </h2>

        {/* Deskripsi - Responsive */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-modern text-gray-300 leading-relaxed sm:leading-relaxed md:leading-relaxed">
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
          <HighlightText>design sense and technical expertise</HighlightText> to
          create <HighlightText>meaningful digital solutions</HighlightText>.
        </p>

        {/* Sticker - Responsive */}
        <div className="w-20 sm:w-24 md:w-28 lg:w-36 mt-2 sm:mt-3 md:mt-4 rotate-8 hover:rotate-12 transition-transform duration-300">
          <img 
            src={Sticker} 
            alt="Decorative sticker" 
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
