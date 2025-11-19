import Sticker from "../assets/sticker.png";

const About = () => {
  // Helper untuk teks bergaris bawah
  const HighlightText = ({ children }) => (
    <span className="font-modern font-semibold italic relative inline-block text-orange-100">
      {children}
      <span className="absolute left-0 -bottom-0 w-full h-0.5 bg-orange-100 opacity-50"></span>
    </span>
  );

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="flex flex-col items-center text-center max-w-5xl gap-12">
        
        {/* Heading */}
        <h2 className="text-6xl md:text-8xl font-stylish text-white italic">
          About Me
        </h2>

        {/* Deskripsi */}
        <p className="text-lg md:text-2xl font-modern text-gray-300 leading-relaxed">
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

        <div className="w-24 md:w-36 mt-4 rotate-8">
          <img src={Sticker} alt="Sticker" />
        </div>

      </div>
    </section>
  );
};

export default About;
