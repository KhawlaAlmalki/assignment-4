# Technical Documentation – Personal Portfolio Website

## 1. Introduction
This document provides the **technical overview and implementation details** of the personal portfolio website developed for **Assignment 1 (Foundations & AI Integration)**. The project demonstrates the integration of **HTML, CSS, and JavaScript** to build a clean, responsive, and interactive portfolio.

The purpose of this documentation is to explain:
- Website architecture and file structure
- Implementation of main features
- Design decisions and rationale
- Testing, limitations, and compatibility
- Responsible use of AI tools during development

---

## 2. System Overview
The portfolio website is a **fully client-side static application** that runs entirely in the browser. No backend or database is required.

**Key functionalities include:**
- Personal biography and introduction
- Interactive Projects section with search, filter, and sort
- Collapsible Experience timeline with animations
- Contact form with validation and persistent input
- **Dark/light mode** with saved user preference
- Scroll-based reveal animations using `IntersectionObserver`
- **Weather widget**: real-time temperature + emoji + live timer
- Fully responsive layout across screen sizes

---

## 3. Repository Structure
```
assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## 4. Technology Stack
- **HTML5** — semantic structure, accessibility
- **CSS3** — Flexbox, Grid, custom variables, dark mode
- **JavaScript (ES6)** — interactivity, state management, animations
- **localStorage** — persistent state (theme, form, timeline)
- **Open-Meteo API** — weather data
- **AI Tools** — debugging, documentation refinement, concept explanation

---

## 5. Implementation Details

## 5.1 HTML
The structure uses semantic tags for clarity and accessibility:
- `<header>` Navigation bar + theme toggle
- **Hero section** with headline and introductory content
- **Weather widget** (fixed position) showing temperature, emoji, and timer
- **About Me**: profile image + personal summary
- **Experience Timeline**: collapsible cards
- **Projects Section**: search/filter/sort UI + project cards
- **Skills, Awards, Contact** sections
- `<footer>` with dynamic year

Semantic structure improves SEO and screen-reader compatibility.

---

## 5.2 CSS
### Layout
- **Flexbox**: navbar, header layout, general alignment
- **Grid**: Projects grid, skills grid, awards section
- **CSS Variables** for theme consistency (`--bg`, `--text`, `--card`, ...)

### Responsive Design
Breakpoints:
- **700px** — tablet mode
- **1024px** — desktop adjustments

Grid columns and spacing adjust smoothly based on screen width.

### Dark Mode
Activated by a `.dark` class on `<html>`:
- Uses variable swapping to change backgrounds, text, and card colors
- Default mode: **dark**
- User preference saved in `localStorage`

### Animations
Elements with `.reveal` animate using CSS transitions. JS adds the `.in` class when elements enter the viewport.

---

## 5.3 JavaScript

### 1) Dark Mode Toggle
- Updates color theme by toggling `.dark` class
- Saves preference in `localStorage`
- Applies saved theme on page load

### 2) Scroll Reveal Animation
- Implemented using `IntersectionObserver`
- Adds `.in` when an element becomes visible
- Avoids heavy on-scroll event listeners

### 3) Projects Section Logic
Supports:
- Search
- Category filtering
- Sorting (A–Z, Z–A, date)

Workflow:
1. Load project cards into an array
2. Apply filters based on UI inputs
3. Re-render matching cards
4. Display a fallback message if no results

### 4) Experience Collapse & Persistence
- Each timeline card expands/collapses when clicked
- Accessible via keyboard (Enter/Space)
- Saves open/closed state to `localStorage`
- Ensures consistency across page reloads

### 5) Contact Form Validation
- Prevents empty submissions
- Validates email pattern
- Displays error messages
- Saves name + email to `localStorage`
- Prefills saved values on next visit

### 6) Dynamic Footer Year
```js
document.getElementById('year').textContent = new Date().getFullYear();
```

### 7) Weather Widget
Uses the **Open-Meteo API** to fetch real-time temperature.

Includes:
- Emoji mapping (☀️, 🌧️, ⛅, 🌩️)
- Temperature display
- Live timer updated every second

Timer logic:
```js
setInterval(() => {
    seconds++;
    weatherDisplay.textContent = `${emoji} ${temp}°C | ${formatTime(seconds)}`;
}, 1000);
```

---

## 6. Design Decisions
- **Minimal, Apple-inspired aesthetic**: rounded corners, clean spacing, soft shadows
- Dark mode default to match modern trends
- Fixed weather widget for personality and interactivity
- Modular JavaScript for maintainability
- CSS variables for consistent theming and simpler mode switching
- Grid layouts for readability and scalability

---

## 7. Testing & Compatibility
### Tested On
**Browsers:** Chrome, Edge, Safari  
**Devices:**
- 1920×1080 desktop
- MacBook Air/Pro
- iPad
- iPhone (Safari + Chrome)

### Verified Working
- Theme toggle persistence
- Experience collapse persistence
- Project search / filter / sort
- Weather widget + timer
- Scroll animations
- Contact form memory
- Responsive layout

### Known Limitations
- Contact form does not send real messages
- Weather API may fail on slow networks
- Changing timeline titles breaks saved collapse state

---

## 8. AI Assistance Summary
AI assistance (ChatGPT) was used to:
- Explain programming concepts (IntersectionObserver, timers, localStorage)
- Provide debugging help
- Suggest UI/UX improvements
- Refactor logic for maintainability
- Improve documentation clarity

All code was fully reviewed and rewritten to ensure originality and correctness.

---

## 9. Conclusion
This portfolio demonstrates strong understanding of modern front-end development, including:
- Responsive layout techniques
- JavaScript state management
- Persistent storage with `localStorage`
- Real-time API integration
- Accessible UI patterns
- Clean and reusable CSS architecture

The final result reflects thoughtful design, solid engineering, and responsible use of AI tools