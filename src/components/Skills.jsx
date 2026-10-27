import React from "react";
import { Sparkles } from "lucide-react";
import { TechIcons } from "./Icons";
import "./Skills.css";

export default function Skills({ skills }) {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Header */}
        <div className="section-eyebrow">
          <Sparkles size={15} />
          <span>My Skills</span>
        </div>
        <h2 className="section-heading">Technologies I Work With</h2>

        {/* 10 Skill Cards */}
        <div className="skills-grid">
          {skills.map((skill) => {
            const IconComponent = TechIcons[skill.icon];
            return (
              <div key={skill.name} className="skill-card">
                <div className="skill-icon-wrap">
                  {IconComponent ? <IconComponent /> : <Sparkles size={28} />}
                </div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-level">{skill.level}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
