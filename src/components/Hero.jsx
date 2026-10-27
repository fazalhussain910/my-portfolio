import React from "react";
import { Sparkles, Code2, Send } from "lucide-react";
import { SocialLogos } from "./Icons";
import "./Hero.css";

export default function Hero({ personal, socials }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        {/* Left Column: Bio & Calls to Action */}
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-icon">✦</span>
            <span>{personal.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            {personal.heroGreeting}{" "}
            <span className="gradient-text">{personal.heroName}</span>
          </h1>

          {/* Subtitle */}
          <h2 className="hero-subtitle">{personal.heroSubtitle}</h2>

          {/* Description */}
          <p className="hero-desc">{personal.heroDescription}</p>

          {/* Buttons */}
          <div className="hero-buttons">
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("projects");
              }}
            >
              <Code2 size={18} />
              <span>View My Projects</span>
            </a>

            <a
              href="#contact"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
            >
              <Send size={16} />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="hero-socials">
            {socials.map((s) => {
              const IconComp = SocialLogos[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label={s.name}
                  title={s.name}
                >
                  {IconComp ? <IconComp /> : null}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Portrait, Glowing Halo & Floating Accents */}
        <div className="hero-visual">
          {/* Background Ambient Halo */}
          <div className="halo-glow" />
          <div className="halo-ring" />

          {/* Floating Blurred Code Panels */}
          <div className="code-panel code-panel-left">
            <div className="code-dots">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
            </div>
            <div className="code-line">
              <span className="token-keyword">class</span>{" "}
              <span className="token-func">Agent</span>:
            </div>
            <div className="code-line" style={{ paddingLeft: "10px" }}>
              <span className="token-keyword">def</span>{" "}
              <span className="token-func">run</span>(self):
            </div>
            <div className="code-line" style={{ paddingLeft: "20px" }}>
              <span className="token-var">await</span>{" "}
              <span className="token-func">llm.invoke()</span>
            </div>
          </div>

          <div className="code-panel code-panel-right">
            <div className="code-dots">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
            </div>
            <div className="code-line">
              <span className="token-keyword">const</span>{" "}
              <span className="token-var">graph</span> =
            </div>
            <div className="code-line" style={{ paddingLeft: "10px" }}>
              <span className="token-func">new</span>{" "}
              <span className="token-keyword">StateGraph()</span>
            </div>
            <div className="code-line" style={{ paddingLeft: "10px" }}>
              .<span className="token-func">addNode</span>(
              <span className="token-string">"tool"</span>)
            </div>
          </div>

          {/* Portrait Photo */}
          <div className="portrait-container">
            <img
              src={personal.portraitImg}
              alt="Fazal Hussain"
              className="portrait-img"
              loading="eager"
            />
          </div>

          {/* Floating Glass Badge 1: Agentic AI */}
          <div className="floating-badge badge-top">
            <div className="floating-badge-icon icon-cyan">
              <Sparkles size={16} />
            </div>
            <div className="floating-badge-text">
              <span className="floating-badge-title">Agentic AI</span>
              <span className="floating-badge-subtitle">Learning</span>
            </div>
          </div>

          {/* Floating Glass Badge 2: Web Development */}
          <div className="floating-badge badge-bottom">
            <div className="floating-badge-icon icon-purple">
              <Code2 size={16} />
            </div>
            <div className="floating-badge-text">
              <span className="floating-badge-title">Web</span>
              <span className="floating-badge-subtitle">Development</span>
            </div>
          </div>

          {/* Handwritten Script Accent on Right */}
          <div className="handwritten-accent">
            <div>Build</div>
            <div>Automate</div>
            <div>Grow</div>
            <svg
              className="handwritten-underline"
              viewBox="0 0 100 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12C32 3 70 5 96 11"
                stroke="#F472B6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
