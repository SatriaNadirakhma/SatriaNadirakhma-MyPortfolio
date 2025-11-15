// src/components/Hero.jsx
// ❗ Impor 3 foto profil Anda dari folder assets
import Profile1 from '../assets/profile1.jpg';
import Profile2 from '../assets/profile2.jpg';
import Profile3 from '../assets/profile3.jpg';

const Hero = () => {
  // Font serif stylish seperti di gambar
  const stylishFont = "font-serif"; 

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center py-20">
      <h1 className={`text-5xl md:text-7xl font-bold text-white ${stylishFont} mb-6`}>
        This is Satria Rakhmadani.
        <br />
        Explore the work.
      </h1>
      <p className="text-xl md:text-2xl text-indigo-300 font-light mb-12">
        Graphic Designer / Front-End Developer
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ❗ Pastikan path gambar sudah benar */}
        <img
          src={Profile1}
          alt="Satria Rakhmadani 1"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
        />
        <img
          src={Profile2}
          alt="Satria Rakhmadani 2"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
        />
        <img
          src={Profile3}
          alt="Satria Rakhmadani 3"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>
  );
};
export default Hero;