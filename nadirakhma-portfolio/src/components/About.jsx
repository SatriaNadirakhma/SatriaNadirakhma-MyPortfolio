// src/components/About.jsx
import Sticker from "../assets/sticker.png";

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 md:py-36 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top divider + label */}
        <div className="flex items-center gap-5 mb-12 sm:mb-16">
          <div className="w-8 h-px bg-white/20" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-modern text-white/30">
            About Me
          </p>
        </div>

        {/* Main content: two-column editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 sm:gap-16 lg:gap-20 items-start">
          {/* Left: sticker + small info */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-20 sm:h-20 flex-shrink-0 hover:rotate-12 transition-transform duration-500">
              <img
                src={Sticker}
                alt="Decorative sticker"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="lg:mt-4">
              <p className="text-[10px] tracking-[0.25em] uppercase font-modern text-white/20 mb-1">
                Role
              </p>
              <p className="text-sm font-modern text-white/50">
                Graphic Designer
              </p>
              <p className="text-sm font-modern text-white/50">
                Front-End Developer
              </p>
            </div>
          </div>

          {/* Right: big statement */}
          <div>
            {/* Big headline */}
            <h2
              className="font-stylish italic text-white leading-[1.0] mb-8 sm:mb-10"
              style={{ fontSize: "clamp(28px, 4.5vw, 68px)" }}
            >
              Passionate about building{" "}
              <span
                className="font-stylish"
                style={{
                  WebkitTextStroke: "0.8px rgba(255,255,255,0.8)",
                  color: "transparent",
                }}
              >
                creative
              </span>{" "}
              and{" "}
              <span
                className="font-stylish"
                style={{
                  WebkitTextStroke: "0.8px rgba(255,255,255,0.8)",
                  color: "transparent",
                }}
              >
                user-centered
              </span>{" "}
              digital experiences.
            </h2>

            {/* Body text */}
            <p className="text-sm sm:text-base md:text-lg font-modern text-white/40 leading-relaxed max-w-2xl mb-8">
              Through Front-End Development, Graphic and UI Design, I'm driven
              by curiosity and innovation. I aim to contribute to
              forward-thinking teams where my design sense and technical
              expertise create meaningful digital solutions.
            </p>

            {/* Horizontal stat strip */}
            <div className="flex flex-wrap gap-8 sm:gap-12 pt-8 border-t border-white/[0.07]">
              {[
                { value: "2+", label: "Years Experience" },
                { value: "10+", label: "Projects Built" },
                { value: "5+", label: "Tools Mastered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-stylish italic text-white text-3xl sm:text-4xl leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-modern text-white/30">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
