import React, { useState } from "react";
import {
  Lock,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  X,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import "./AdminModal.css";

export default function AdminModal({
  isOpen,
  onClose,
  projects,
  onSaveProjects,
  onResetDefaults,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState("manage"); // 'manage', 'add', 'export'
  const [copiedCode, setCopiedCode] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Website",
    description: "",
    image: "/images/project-bakery.png",
    liveUrl: "",
    githubUrl: "",
    status: "View Demo",
  });

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === "fazal123" || pinInput === "admin") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Website",
      description: "",
      image: "/images/project-bakery.png",
      liveUrl: "",
      githubUrl: "",
      status: "Live Demo",
    });
    setActiveTab("add");
  };

  const handleStartEdit = (proj) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      image: proj.image,
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || "",
      status: proj.status || "View Demo",
    });
    setActiveTab("add");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id);
      onSaveProjects(updated);
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a project title.");
      return;
    }

    let updatedProjects;
    if (editingId) {
      // Update existing
      updatedProjects = projects.map((p) =>
        p.id === editingId
          ? {
              ...p,
              ...formData,
            }
          : p
      );
    } else {
      // Add new
      const newProj = {
        id: "proj-" + Date.now(),
        ...formData,
        featured: true,
      };
      updatedProjects = [...projects, newProj];
    }

    onSaveProjects(updatedProjects);
    setActiveTab("manage");
    setEditingId(null);
  };

  const generateExportCode = () => {
    return JSON.stringify(projects, null, 2);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-modal-header">
          <div className="admin-header-title">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFF" }}>
              Project Management Portal
            </h3>
            <span className="admin-badge">Admin Mode</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#94A3B8",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="admin-modal-body">
          {!isAuthenticated ? (
            /* PIN Screen */
            <form onSubmit={handleLogin} className="admin-auth-box">
              <div className="auth-lock-icon">
                <Lock size={26} />
              </div>
              <h4 style={{ fontSize: "1.1rem", color: "#FFF" }}>
                Admin Authentication
              </h4>
              <p style={{ fontSize: "0.86rem", color: "#94A3B8" }}>
                Enter your security PIN to manage portfolio projects. Default
                PIN: <strong style={{ color: "var(--cyan)" }}>fazal123</strong>
              </p>

              <input
                type="password"
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="form-input auth-input"
                autoFocus
              />

              {pinError && (
                <span style={{ color: "#EF4444", fontSize: "0.82rem" }}>
                  Incorrect PIN. Please try again.
                </span>
              )}

              <button type="submit" className="btn-primary" style={{ marginTop: "8px" }}>
                Unlock Dashboard
              </button>
            </form>
          ) : (
            /* Authenticated Portal */
            <div>
              {/* Navigation Tabs */}
              <div className="admin-tabs">
                <button
                  className={`admin-tab-btn ${
                    activeTab === "manage" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("manage")}
                >
                  Current Projects ({projects.length})
                </button>
                <button
                  className={`admin-tab-btn ${
                    activeTab === "add" ? "active" : ""
                  }`}
                  onClick={handleStartAdd}
                >
                  <Plus size={14} style={{ display: "inline", marginRight: "4px" }} />
                  {editingId ? "Edit Project" : "Add New Project"}
                </button>
                <button
                  className={`admin-tab-btn ${
                    activeTab === "export" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("export")}
                >
                  Export Code
                </button>
              </div>

              {/* TAB 1: MANAGE PROJECTS */}
              {activeTab === "manage" && (
                <div>
                  <div className="admin-project-list">
                    {projects.map((proj) => (
                      <div key={proj.id} className="admin-project-item">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="admin-item-thumb"
                        />
                        <div className="admin-item-info">
                          <span className="admin-item-title">{proj.title}</span>
                          <span className="admin-item-cat">{proj.category}</span>
                        </div>
                        <div className="admin-item-actions">
                          <button
                            onClick={() => handleStartEdit(proj)}
                            className="btn-item-action"
                            title="Edit project"
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id)}
                            className="btn-item-action btn-item-delete"
                            title="Delete project"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      onClick={onResetDefaults}
                      className="btn-secondary"
                      style={{ fontSize: "0.82rem", padding: "8px 16px" }}
                      title="Reset to initial 4 projects"
                    >
                      <RotateCcw size={14} />
                      <span>Reset to Original Projects</span>
                    </button>

                    <button onClick={handleStartAdd} className="btn-primary">
                      <Plus size={15} />
                      <span>Add Another Project</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ADD / EDIT PROJECT */}
              {activeTab === "add" && (
                <form onSubmit={handleSaveProject} className="contact-form">
                  <div className="admin-form-grid">
                    <div className="form-group">
                      <label className="form-label">Project Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. My Next AI App"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. AI Agent • Full Stack"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="form-input"
                      />
                    </div>

                    <div className="form-group admin-form-full">
                      <label className="form-label">Description *</label>
                      <textarea
                        required
                        rows="2"
                        placeholder="Brief summary of what this project does..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="form-textarea"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Live Demo URL</label>
                      <input
                        type="url"
                        placeholder="https://myproject.com"
                        value={formData.liveUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, liveUrl: e.target.value })
                        }
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/fazalhussain910/..."
                        value={formData.githubUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            githubUrl: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Button Label</label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="form-select"
                      >
                        <option value="Live Demo">Live Demo</option>
                        <option value="View Demo">View Demo</option>
                        <option value="View Project">View Project</option>
                        <option value="Coming Soon">Coming Soon</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Project Screenshot</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-input"
                        style={{ padding: "8px" }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "flex-end",
                      marginTop: "16px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab("manage")}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingId ? "Update Project" : "Publish Project to Site"}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: EXPORT CODE */}
              {activeTab === "export" && (
                <div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "#94A3B8",
                      marginBottom: "12px",
                    }}
                  >
                    Here is the JSON code for your projects. You can copy this
                    and paste it directly into{" "}
                    <code style={{ color: "var(--cyan)" }}>
                      src/data/portfolio.js
                    </code>{" "}
                    if you ever want to commit your changes permanently to Git:
                  </p>
                  <pre className="code-export-box">{generateExportCode()}</pre>
                  <button onClick={handleCopyCode} className="btn-primary">
                    {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedCode ? "Copied!" : "Copy Code to Clipboard"}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
