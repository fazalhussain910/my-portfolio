"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolio";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import ServicesTimeline from "./ServicesTimeline";
import Contact from "./Contact";
import Footer from "./Footer";
import AdminModal from "./AdminModal";

export default function PortfolioClient({ initialProjects, cmsSource }) {
  const [selectedService, setSelectedService] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [projects, setProjects] = useState(initialProjects);

  // Sync with localStorage on client mount if not using Notion
  useEffect(() => {
    if (cmsSource === "notion") return;
    try {
      const saved = localStorage.getItem("fazal_projects");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [cmsSource]);

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
      console.error(e);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset projects back to initial projects?")) {
      localStorage.removeItem("fazal_projects");
      setProjects(initialProjects);
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

        {/* Featured Projects (Notion CMS Powered with ISR) */}
        <Projects
          projects={projects}
          cmsSource={cmsSource}
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
