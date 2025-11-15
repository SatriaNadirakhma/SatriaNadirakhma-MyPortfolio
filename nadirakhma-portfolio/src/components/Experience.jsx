// src/components/Experience.jsx
import { Building } from 'lucide-react';

// ❗ Ganti dengan data pengalaman Anda
const experiences = [
  {
    title: "Senior Front-End Developer",
    company: "Tech Solutions Inc.",
    date: "Jan 2022 - Present",
    description: "Memimpin pengembangan aplikasi web skalabel menggunakan React dan Tailwind CSS. Membimbing developer junior."
  },
  {
    title: "UI/UX Designer",
    company: "Creative Agency",
    date: "Jun 2020 - Dec 2021",
    description: "Merancang antarmuka yang berpusat pada pengguna untuk platform mobile dan web. Melakukan riset pengguna dan membuat prototipe."
  },
];

// Komponen Card
const ExperienceCard = ({ title, company, date, description }) => (
  <div className="bg-indigo-900 p-6 rounded-lg shadow-lg border border-indigo-800/50">
    <div className="flex items-center gap-4 mb-3">
      <span className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
        <Building className="w-5 h-5 text-white" />
      </span>
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-indigo-300">{company} / {date}</p>
      </div>
    </div>
    <p className="text-indigo-200 leading-relaxed">
      {description}
    </p>
  </div>
);

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-4 text-white">My Experience</h2>
      <p className="text-xl text-center text-indigo-300 mb-12">
        Perjalanan profesional saya sejauh ini.
      </p>

      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
    </section>
  );
};
export default Experience;