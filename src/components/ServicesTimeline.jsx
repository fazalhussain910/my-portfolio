import React from "react";
import { Sparkles, Globe, Cpu, MessageSquare, ArrowRight, Check } from "lucide-react";
import "./ServicesTimeline.css";

export default function ServicesTimeline({ services, timeline, onSelectService }) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case "globe":
        return <Globe size={22} />;
      case "cpu":
        return <Cpu size={22} />;
      case "messageSquare":
        return <MessageSquare size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  const handleServiceClick = (service) => {
    if (onSelectService) {
      onSelectService(service.title);
    }
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="services-timeline-grid">
          {/* Left Column: My Services */}
          <div>
            <div className="section-eyebrow">
              <Sparkles size={15} />
              <span>My Services</span>
            </div>
            <h2 className="section-heading">What I Can Do</h2>

            <div className="services-list">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="service-card"
                  onClick={() => handleServiceClick(svc)}
                  title={`Inquire about ${svc.title}`}
                >
                  <div className="service-left">
                    <div className="service-icon-box">
                      {getServiceIcon(svc.icon)}
                    </div>
                    <div className="service-info">
                      <h3 className="service-title">{svc.title}</h3>
                      <p className="service-desc">{svc.description}</p>
                      <div className="service-features">
                        {svc.features.map((f, i) => (
                          <span key={i} className="service-feature">
                            <span className="feature-check">✓</span>
                            <span>{f}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="service-arrow-btn">
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience & Achievements Timeline */}
          <div className="timeline-wrapper">
            <div className="timeline-card">
              <h3 className="timeline-heading">Experience & Achievements</h3>

              <div className="timeline-list">
                <div className="timeline-line" />

                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`timeline-item ${item.isCurrent ? "current" : ""}`}
                  >
                    <div className="timeline-dot" />

                    <div className="timeline-content">
                      <span className="timeline-title">{item.title}</span>
                      <span className="timeline-role">{item.role}</span>
                    </div>

                    <span
                      className={`timeline-badge ${
                        item.isCurrent ? "current" : "past"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
