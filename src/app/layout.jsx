import "./globals.css";

export const metadata = {
  title: "Fazal Hussain | Agentic AI Developer & Web Engineer",
  description:
    "Personal portfolio of Fazal Hussain, an Agentic AI Developer and Web Engineer from Faisalabad, Pakistan. Featuring live projects managed dynamically via Notion Headless CMS.",
  keywords: [
    "Fazal Hussain",
    "Agentic AI",
    "Python Developer",
    "Web Developer",
    "Next.js",
    "Notion CMS",
    "LangGraph",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%238B5CF6'/%3E%3Cstop offset='100%25' stop-color='%233B82F6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='8' fill='%23050816'/%3E%3Cpath d='M9 8h14v3.5h-9.5v4.5h8v3.5h-8v4.5H9z' fill='url(%23g)'/%3E%3C/svg%3E"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
