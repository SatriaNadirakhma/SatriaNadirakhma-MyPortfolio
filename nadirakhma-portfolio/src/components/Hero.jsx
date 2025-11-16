import Profile1 from '../assets/profile1.jpg';

const Hero = () => {
  const stylishFont = "font-serif"; 

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center py-20">
      <div className='inline-block bg-white/80 rounded-full p-2 mb-6'>
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-full px-8 py-2">
          <span className="text-white text-[28px] font-stylish font-medium">
            Nadi Rakhma
          </span>
        </div>
      </div>
      <h1 className={`text-6xl md:text-8xl font-stylish text-white ${stylishFont} mb-10`}>
        This is <br /> Satria Rakhmadani.
        <br />
        Explore the work.
      </h1>
      <p className="text-medium md:text-xl font-modern text-indigo-300 font-light mb-12">
        Graphic Designer / Front-End Developer
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={Profile1}
          alt="Satria Rakhmadani 1"
          className="w-64 h-48 md:w-200 md:h-120 object-cover rounded-2xl shadow-lg transform transition-transform duration-300"
        />
      </div>
    </section>
  );
};
export default Hero;