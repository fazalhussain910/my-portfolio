import React, { useState, useEffect } from "react";
import { Send, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ personalData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check section in view
      const sections = ["home", "about", "projects", "services", "skills", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        {/* Brand */}
        <a
          href="#home"
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, "#home")}
          aria-label="Fazal Hussain Home"
        >
          <div className="brand-icon">F</div>
          <span className="brand-name">{personalData.name}</span>
        </a>

        {/* Desktop / Mobile Menu */}
        <nav>
          <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
            {navItems.map((item) => {
              const secId = item.href.replace("#", "");
              const isActive = activeSection === secId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Hire Me CTA + Mobile Toggle */}
        <div className="nav-actions">
          <a
            href="#contact"
            className="btn-hire"
            onClick={(e) => handleLinkClick(e, "#contact")}
          >
            <Send size={14} />
            <span>Hire Me</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
