# Shivanand Kalashetti — Software Engineering Portfolio

A high-level, production-grade developer portfolio built with semantic HTML5, modern CSS architecture, and vanilla JavaScript. Designed with a Silicon Valley technical bento aesthetic, keyboard-accessible command palette (`⌘K`), real-time Bengaluru (IST) clock, interactive code execution simulator, and project architecture deep-dives.

## Key Features

- **Executive Bento Layout & Glassmorphism**: High-contrast, dark-mode design system with ambient glows, fluid typography, and responsive grid structures.
- **Interactive Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-driven quick-launcher for navigating sections, filtering projects, switching themes, and copying contact info.
- **Dynamic Theme Accent Switcher**: Live switching between 4 curated technical accents (*Acid Lime*, *Electric Cyan*, *Cyber Violet*, *Sunset Amber*) with persistent `localStorage` memory.
- **Bengaluru (IST) Real-time Clock**: Live synchronized local time widget (`Asia/Kolkata` / UTC+5:30) highlighting developer availability.
- **Interactive Code Workbench & Simulator**: Live syntax examples across Java, Python, SQL, and JavaScript with algorithmic complexity badges and simulated console outputs.
- **Project Architecture Deep Dives**: Accessible modal dialogs detailing system pipelines, technical trade-offs, and engineering highlights.
- **Top Reading Progress Indicator**: Real-time progress bar tracking scroll depth.
- **Zero Dependencies**: Pure vanilla web standards—no framework bloat, fast load times, and 100% offline-ready.

## Directory Structure

```text
My portfolio/
├── index.html                 # Semantic HTML structure, modals & command palette
├── style.css                  # Custom design system, bento layout & responsive styles
├── script.js                  # Progressively enhanced interactions & state engine
├── config.js                  # Centralized content, projects, and architecture data
├── validate_site.py           # Automated structural and accessibility validator
├── CHANGELOG.md               # Version history and refinement logs
├── README.md
└── assets/
    └── images/                # Favicon and vector project illustrations
```

## Running Locally

Run a local HTTP server with Python:

```bash
cd "My portfolio"
python -m http.server 3000
```

Open <http://localhost:3000> in your browser.

## Customization Guide

All data, projects, and links are decoupled into `config.js`:

1. **Profile & Links**:
   ```js
   profile: {
     name: "Shivanand Kalashetti",
     role: "Aspiring Software Developer & CSE Student",
     githubUrl: "https://github.com/your-username",
     linkedinUrl: "https://linkedin.com/in/your-profile",
     publicEmail: "your.email@example.com",
     resumePath: "assets/resume.pdf" // Set after adding your reviewed PDF
   }
   ```
2. **Projects**: Add or update entries under `projects` in `config.js`. Each entry supports `architecture`, `highlights`, `tags`, and links.
3. **Interactive Code Lab**: Customize code examples in `learningSnippets` (Java, Python, SQL, JavaScript).

## Validation & Quality Checks

Run the automated test suite:

```bash
python validate_site.py
node --check script.js
node --check config.js
```
