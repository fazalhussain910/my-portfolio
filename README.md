# Fazal Hussain — Personal Portfolio Website

A personal portfolio website for **Fazal Hussain**, a Web Developer and Agentic AI Enthusiast from Faisalabad, Pakistan.

Rebuilt from scratch with React + Vite, featuring a dark neon aesthetic, glassmorphism cards, purple/electric-blue/cyan gradients, smooth micro-interactions, responsive mobile layout, and zero bloat (runs on an 8 GB RAM laptop).

---

## 🚀 Live Demo & Deployment

- **Bakery Project Live Link**: [Al-Khalil Bakery](https://al-khalil-bakery.netlify.app/)
- **Deploy to Netlify**: Connect this repository to [Netlify](https://www.netlify.com/), set the build command to `npm run build` and publish directory to `dist` (pre-configured in `netlify.toml`).
- **Deploy to Vercel**: Connect to [Vercel](https://vercel.com/) with default Vite settings (pre-configured in `vercel.json`).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom High-Fidelity SVGs
- **Styling**: Vanilla CSS with CSS Variables, Glassmorphism & GPU-accelerated transforms
- **Fonts**: Plus Jakarta Sans, Caveat (script accent), JetBrains Mono
- **Image Processing**: OpenCV Alpha Matting / GrabCut

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
The optimized static bundle will be built in the `dist/` directory.

---

## ⚙️ Customizing Your Details & Links

All personal info, project URLs, skills, services, and contact information are centralized in **[`src/data/portfolio.js`](src/data/portfolio.js)**:

| Item | Location in `portfolio.js` | Notes |
|------|---------------------------|-------|
| **Name & Bio** | `personal.name`, `personal.heroSubtitle`, `personal.heroDescription` | Edit your intro heading and bio text |
| **Social Links** | `socials[]` | Update your real GitHub, LinkedIn, Discord, and YouTube profile URLs |
| **CV Document** | `about.cvUrl` (`/documents/Fazal-Hussain-CV.pdf`) | Replace the file in `public/documents/` with your real resume |
| **Portrait Photo** | `personal.portraitImg` (`/images/fazal-portrait.png`) | Replace with an updated transparent PNG if desired |
| **Skills & Badges** | `skills[]` | Add or adjust skills and proficiency levels (`Intermediate`, `Learning`, `Advanced`) |
| **Projects & Demos** | `projects[]` | Add live demo links and GitHub repository URLs |
| **Services Offered** | `services[]` | Edit your service titles, descriptions, and feature bullet points |
| **Timeline** | `timeline[]` | Add milestones, education status, or certifications |
| **Contact Info** | `contact.email`, `contact.phone`, `contact.whatsappNumber` | Configure your real email and WhatsApp phone number |

---

## 📁 Project Structure

```text
├── public/
│   ├── documents/
│   │   └── Fazal-Hussain-CV.pdf     # Downloadable CV
│   ├── images/
│   │   ├── fazal-portrait.png       # Clean cutout portrait of Fazal
│   │   ├── project-bakery.png       # Al-Khalil Bakery thumbnail
│   │   ├── project-kisan-dost.png   # Kisan Dost thumbnail
│   │   ├── project-agenticaim.png   # AgenticAim thumbnail
│   │   └── project-langgraph.png    # SMIT LangGraph thumbnail
├── src/
│   ├── components/
│   │   ├── Icons.jsx                # Tech & social vector SVG components
│   │   ├── Navbar.jsx               # Sticky navbar with active scroll spy
│   │   ├── Hero.jsx                 # Two-column hero with halo & code cards
│   │   ├── About.jsx                # Who I Am & glassmorphism quote card
│   │   ├── Skills.jsx               # 10 compact technology cards
│   │   ├── Projects.jsx             # 4 featured project cards with live links
│   │   ├── ServicesTimeline.jsx     # What I Can Do & Experience timeline
│   │   ├── Contact.jsx              # Contact pills & interactive inquiry modal
│   │   └── Footer.jsx               # Brand footer with dynamic year & socials
│   ├── data/
│   │   └── portfolio.js             # Centralized config for all content & URLs
│   ├── App.jsx                      # App root component
│   ├── index.css                    # Design system, tokens, animations
│   └── main.jsx                     # Vite mount point
├── netlify.toml                     # Netlify SPA deployment config
├── vercel.json                      # Vercel SPA deployment config
└── package.json
```

---

## 🔒 Contact Form Behavior

The contact section includes an inquiry modal that opens when visitors click **"Send Message"** or an inquiry arrow on any service card. It performs input validation, launches their default email client with a pre-filled subject and body addressed to `fazalhussain.work@gmail.com`, and copies the text to the visitor's clipboard. No external server or paid API is required.
