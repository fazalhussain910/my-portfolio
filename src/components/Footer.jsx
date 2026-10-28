import React from "react";
import { SocialLogos } from "./Icons";
import "./Footer.css";

export default function Footer({ personalData, socials, onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Brand */}
        <a href="#home" className="footer-brand">
          <div className="footer-logo">F</div>
          <span>{personalData.name}</span>
        </a>

        {/* Copyright */}
        <div className="footer-copyright">
          © {currentYear} {personalData.name}. All rights reserved.
        </div>

        {/* Socials & Tagline */}
        <div className="footer-right">
          <div className="footer-socials">
            {socials.map((s) => {
              const IconComp = SocialLogos[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={s.name}
                  title={s.name}
                >
                  {IconComp ? <IconComp width={17} height={17} /> : null}
                </a>
              );
            })}
          </div>

          <span className="footer-tagline">Code • Build • Innovate</span>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="admin-trigger-btn"
              title="Open Admin Project Manager (Ctrl+Shift+A)"
            >
              ⚙ Admin
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
