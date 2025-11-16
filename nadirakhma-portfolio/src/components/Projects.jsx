// src/components/Projects.jsx
// ❗ Impor gambar untuk proyek Anda
import ProjectGenesis from '../assets/project-genesis.jpg'; // Contoh dari image_95662a.jpg
import ProjectOther from '../assets/project-other.jpg'; // Gambar placeholder

import { ArrowRight } from 'lucide-react';

// ❗ Ganti dengan data proyek Anda
const projects = {
  development: [
    {
      title: "Portfolio Website",
      description: "Website ini, dibangun dengan React, Vite, dan Tailwind CSS.",
      image: ProjectOther, // Ganti dengan gambar
      link: "#"
    },
    {
      title: "E-commerce Dashboard",
      description: "Panel admin untuk mengelola produk, pesanan, dan pengguna.",
      image: ProjectOther, // Ganti dengan gambar
      link: "#"
    }
  ],
  graphicDesign: [
    {
      title: "Genesis UI Concept",
      description: "Konsep alur onboarding aplikasi mobile (seperti gambar contoh).",
      image: ProjectGenesis, // Ganti dengan gambar
      link: "#"
    },
    {
      title: "Brand Identity Kopi",
      description: "Paket branding lengkap untuk kedai kopi lokal.",
      image: ProjectOther, // Ganti dengan gambar
      link: "#"
    }
  ]
};

// Komponen Card - Meniru gaya image_95662a.jpg
const ProjectCard = ({ title, description, image, link }) => (
  <div className="bg-white text-gray-900 rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a 
        href={link} 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        Lihat Proyek <ArrowRight className="w-4 h-4 ml-2" />
      </a>
    </div>
  </div>
);


const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">Featured Projects</h2>

      {/* Development Projects */}
      <div className="mb-16">
        <h3 className="text-3xl font-semibold text-white mb-8">Development</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.development.map((p, i) => <ProjectCard key={`dev-${i}`} {...p} />)}
        </div>
      </div>

      {/* Graphic Design Projects */}
      <div>
        <h3 className="text-3xl font-semibold text-white mb-8">Graphic Design</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.graphicDesign.map((p, i) => <ProjectCard key={`gd-${i}`} {...p} />)}
        </div>
      </div>
    </section>
  );
};
export default Projects;