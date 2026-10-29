import React from "react";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { SocialLogos } from "./Icons";
import "./Projects.css";

export default function Projects({
  projects,
  cmsSource,
  githubUrl = "https://github.com/fazalhussain910",
}) {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <div>
            <div className="section-eyebrow">
              <Sparkles size={15} />
              <span>
                {cmsSource === "notion"
                  ? "Notion Headless CMS"
                  : "My Projects"}
              </span>
              {cmsSource === "notion" && (
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "0.72rem",
                    color: "var(--cyan)",
                    border: "1px solid var(--border-cyan)",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    background: "rgba(34, 211, 238, 0.1)",
                  }}
                >
                  🟢 Live ISR Sync (60s)
                </span>
              )}
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

        {/* Project Cards Grid */}
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

                {/* Tech Stack Pills (if provided from Notion CMS) */}
                {Array.isArray(proj.techStack) && proj.techStack.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "14px",
                    }}
                  >
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "0.7rem",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                          color: "#CBD5E1",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer link */}
                <div className="project-footer">
                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span>{proj.status || "Live Demo"}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span
                      style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}
                    >
                      {proj.status || "View Demo"}
                    </span>
                  )}

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
