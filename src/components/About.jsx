import React from "react";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Download,
  Sparkles,
  Monitor,
  Layers,
  Globe2,
} from "lucide-react";
import "./About.css";

export default function About({ aboutData }) {
  const getInfoIcon = (type) => {
    switch (type) {
      case "mapPin":
        return <MapPin size={18} />;
      case "calendar":
        return <Calendar size={18} />;
      case "graduationCap":
        return <GraduationCap size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-eyebrow">
          <Sparkles size={15} />
          <span>{aboutData.eyebrow}</span>
        </div>
        <h2 className="section-heading">{aboutData.heading}</h2>

        <div className="about-grid">
          {/* Left Column */}
          <div className="about-left">
            <p className="about-bio">{aboutData.description}</p>

            {/* Quick Info Items */}
            <div className="about-info-row">
              {aboutData.infoList.map((item, idx) => (
                <div key={idx} className="info-item">
                  <div className="info-icon-box">{getInfoIcon(item.icon)}</div>
                  <div className="info-text">
                    <span className="info-label">{item.label}</span>
                    <span className="info-val">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <a
              href={aboutData.cvUrl}
              download="Fazal-Hussain-CV.pdf"
              className="btn-download"
              title="Download Fazal Hussain's CV"
            >
              <span>Download CV</span>
              <Download size={16} />
            </a>
          </div>

          {/* Right Column: Glassmorphism Quote & Focus Card */}
          <div className="about-quote-card">
            {/* Quote Half */}
            <div className="quote-box">
              <span className="quote-mark">“</span>
              <p className="quote-content">"{aboutData.quote}"</p>
              <span className="quote-author">— {aboutData.quoteAuthor}</span>
            </div>

            {/* Subtle Divider */}
            <div className="quote-divider" />

            {/* Details List */}
            <div className="about-details-list">
              <div className="about-detail-item">
                <div className="detail-icon-box">
                  <Monitor size={17} />
                </div>
                <div className="detail-content">
                  <span className="detail-title">Currently Learning</span>
                  <span className="detail-value">{aboutData.currentlyLearning}</span>
                </div>
              </div>

              <div className="about-detail-item">
                <div className="detail-icon-box">
                  <Layers size={17} />
                </div>
                <div className="detail-content">
                  <span className="detail-title">Interests</span>
                  <span className="detail-value">{aboutData.interests}</span>
                </div>
              </div>

              <div className="about-detail-item">
                <div className="detail-icon-box">
                  <Globe2 size={17} />
                </div>
                <div className="detail-content">
                  <span className="detail-title">Languages</span>
                  <span className="detail-value">{aboutData.languages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
