import React from "react";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { SocialLogos } from "./Icons";
import "./Projects.css";

export default function Projects({ projects, githubUrl = "https://github.com/fazalhussain910" }) {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <div>
            <div className="section-eyebrow">
              <Sparkles size={15} />
              <span>My Projects</span>
            </div>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>
              Featured Work
            </h2>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-view-all"
            title="View all repositories on GitHub"
          >
            <span>View All Projects</span>
            <ArrowRight size={15} />
          </a>
        </div>

        {/* 4 Project Cards Grid */}
        <div className="projects-grid">
          {projects.map((proj) => (
            <article key={proj.id} className="project-card">
              {/* Thumbnail */}
              <div className="project-thumb-wrap">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="project-thumb"
                  loading="lazy"
                />
              </div>

              {/* Card Details */}
              <div className="project-body">
                <h3 className="project-title">{proj.title}</h3>

                <div className="project-badge">
                  <span className="badge-dot" />
                  <span>{proj.category}</span>
                </div>

                <p className="project-desc">{proj.description}</p>

                {/* Footer link */}
                <div className="project-footer">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <span>{proj.status}</span>
                    <ExternalLink size={14} />
                  </a>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github-link"
                      title="GitHub Repository"
                    >
                      <SocialLogos.github width={16} height={16} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
