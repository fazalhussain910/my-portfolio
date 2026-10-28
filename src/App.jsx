import React, { useState, useEffect } from "react";
import { portfolioData } from "./data/portfolio";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ServicesTimeline from "./components/ServicesTimeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminModal from "./components/AdminModal";

export default function App() {
  const [selectedService, setSelectedService] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load custom projects from localStorage or fallback to portfolio.js
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("fazal_projects");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading saved projects from localStorage:", e);
    }
    return portfolioData.projects;
  });

  // Keyboard shortcut Ctrl + Shift + A to open Admin Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const handleSaveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    try {
      localStorage.setItem("fazal_projects", JSON.stringify(updatedProjects));
    } catch (e) {
      console.error("Error saving projects to localStorage:", e);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset projects back to initial default projects?")) {
      localStorage.removeItem("fazal_projects");
      setProjects(portfolioData.projects);
    }
  };

  return (
    <div className="portfolio-app">
      {/* Sticky Navigation */}
      <Navbar personalData={portfolioData.personal} />

      <main>
        {/* Hero Section */}
        <Hero
          personal={portfolioData.personal}
          socials={portfolioData.socials}
        />

        {/* About Me Section */}
        <About aboutData={portfolioData.about} />

        {/* Skills Section */}
        <Skills skills={portfolioData.skills} />

        {/* Featured Projects */}
        <Projects
          projects={projects}
          githubUrl={
            portfolioData.socials.find((s) => s.name === "GitHub")?.url ||
            "https://github.com/fazalhussain910"
          }
        />

        {/* Services & Timeline */}
        <ServicesTimeline
          services={portfolioData.services}
          timeline={portfolioData.timeline}
          onSelectService={handleSelectService}
        />

        {/* Contact Section */}
        <Contact
          contactData={portfolioData.contact}
          selectedService={selectedService}
        />
      </main>

      {/* Footer */}
      <Footer
        personalData={portfolioData.personal}
        socials={portfolioData.socials}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Project Manager Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        onSaveProjects={handleSaveProjects}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
