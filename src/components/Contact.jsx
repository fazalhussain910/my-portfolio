import React, { useState, useEffect } from "react";
import { Mail, MessageCircle, MapPin, ArrowRight, X, Send, Copy, Check } from "lucide-react";
import "./Contact.css";

export default function Contact({ contactData, selectedService }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
      setIsModalOpen(true);
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Build mailto URI
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name}${
        formData.service ? ` [${formData.service}]` : ""
      }`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${
        formData.service || "General Inquiry"
      }\n\nMessage:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${contactData.email}?subject=${subject}&body=${body}`;

    // Copy text to clipboard for convenience
    const fullText = `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${
      formData.service || "General Inquiry"
    }\n\nMessage:\n${formData.message}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 4000);
    }

    setStatusMessage(
      "Opening your default email client... The inquiry text was also copied to your clipboard!"
    );

    // Open mailto
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card-main">
          {/* Top Intro */}
          <div className="contact-top">
            <div className="contact-intro">
              <span className="contact-eyebrow">{contactData.eyebrow}</span>
              <h2 className="contact-heading">{contactData.heading}</h2>
              <p className="contact-desc">{contactData.description}</p>
            </div>

            <button
              className="btn-send-message"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Send Message</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Contact Pills */}
          <div className="contact-items-row">
            {/* Email */}
            <a
              href={`mailto:${contactData.email}`}
              className="contact-item-pill"
              title="Send an email"
            >
              <div className="contact-pill-icon">
                <Mail size={18} />
              </div>
              <div className="contact-pill-details">
                <span className="contact-pill-label">Email</span>
                <span className="contact-pill-value">{contactData.email}</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contactData.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item-pill"
              title="Chat on WhatsApp"
            >
              <div className="contact-pill-icon">
                <MessageCircle size={18} />
              </div>
              <div className="contact-pill-details">
                <span className="contact-pill-label">WhatsApp</span>
                <span className="contact-pill-value">{contactData.phone}</span>
              </div>
            </a>

            {/* Location */}
            <div className="contact-item-pill">
              <div className="contact-pill-icon">
                <MapPin size={18} />
              </div>
              <div className="contact-pill-details">
                <span className="contact-pill-label">Location</span>
                <span className="contact-pill-value">{contactData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Contact Form */}
      {isModalOpen && (
        <div className="form-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="form-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="form-modal-header">
              <h3 className="form-modal-title">Get in Touch with Fazal</h3>
              <button
                className="btn-close-modal"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {statusMessage && (
              <div className="form-status-alert">
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="service">
                  Interested Service / Subject
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select a service (optional)</option>
                  <option value="Website Development">Website Development</option>
                  <option value="AI Automation (n8n & APIs)">
                    AI Automation (n8n & APIs)
                  </option>
                  <option value="AI Chatbots & Agents">
                    AI Chatbots & Agents
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Project Details / Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  placeholder="Tell me about your project goals, timeline, and requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>

              <div className="form-notice">
                ℹ Direct client inquiry: submitting opens your configured mail app with this message prepared for <strong>{contactData.email}</strong>.
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                <Send size={16} />
                <span>Launch Email Client</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
