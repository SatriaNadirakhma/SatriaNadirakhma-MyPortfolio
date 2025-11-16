// src/App.jsx
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Connect from "./components/Connect";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex min-h-screen bg-indigo-950 text-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 md:p-12 ml-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Connect />
        <Footer />
      </main>
    </div>
  );
}

export default App;
