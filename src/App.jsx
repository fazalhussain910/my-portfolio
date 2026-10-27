import React, { useState } from "react";
import { portfolioData } from "./data/portfolio";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ServicesTimeline from "./components/ServicesTimeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [selectedService, setSelectedService] = useState("");

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
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
        <Projects projects={portfolioData.projects} />

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
      />
    </div>
  );
}
