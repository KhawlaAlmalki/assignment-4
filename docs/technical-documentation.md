# Technical Documentation – Personal Portfolio Website

## 1. Introduction
This document provides the **technical details** of the personal portfolio website developed for **Assignment 1 (Foundations & AI Integration)**.
The project demonstrates the use of **HTML, CSS, and JavaScript** to build a responsive, interactive, and professional portfolio that showcases personal information, experience, and projects.

The purpose of this documentation is to explain:
- The **architecture** and **file structure**.
- The **implementation details** of all major features.
- The **design decisions** made.
- The **testing, compatibility, and limitations**.
- The responsible use of **AI assistance**.

---

## 2. System Overview
The portfolio is a **fully client-side static web application**, functioning without a backend or database.
It runs in any modern browser and includes:

- Personal introduction and biography.
- Interactive project list with search, filter, and sort.
- Collapsible experience timeline.
- Contact form with validation and field memory.
- **Dark/light mode** with persistent preference.
- Scroll animations using Intersection Observer.
- **Weather widget** displaying temperature + emoji + live timer.
- Responsive layout across devices.

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
- **HTML5** — Semantic sections and accessible structure.
- **CSS3** — Flexbox, Grid, custom variables, dark mode.
- **JavaScript (ES6)**:
    - DOM manipulation.
    - `localStorage` for persistence.
    - Dynamic filtering/sorting.
    - Collapsible timeline.
    - Contact form validation.
    - Weather API integration.
    - Timers and UI state management.
- **AI Tools** — Used for debugging, documentation, logic explanation, and code refinement.

---

## 5. Implementation Details

## 5.1 HTML
The HTML file provides a clean, semantic layout including:

- **Header**
  Navigation bar + Theme toggle button.

- **Hero Section**
  Intro, headline, and CTA buttons.

- **Weather Widget (Fixed Position)**
  Displays temperature, emoji, and a live timer in the format `☀️ 16°C | 01:25`.

- **About Me Section**
  Profile image + detailed description.

- **Experience & Education**
  Vertical timeline with collapsible cards.

- **Projects Section**
  Search bar, filters, sorting controls, and project grid.

- **Skills, Awards, and Contact Sections**
  List structures and styled cards.

- **Footer**
  Automatically updates to the current year.

Semantic tags used:
```
<header>, <nav>, <section>, <article>, <footer>
```
ensuring accessibility and clear structure.

---

## 5.2 CSS

### Layout
- **Flexbox** used for header, navigation, and content alignment.
- **CSS Grid** used for Projects, Skills, Awards, and Contact layouts.
- **Custom variables** (`--bg`, `--text`, etc.) used for theme consistency.

### Responsive Design
- Breakpoints at:
    - **700px** (tablets)
    - **1024px** (desktops)
- Adjusts grid column counts and spacing.

### Dark Mode
- Implemented using the `.dark` class on `<html>`.
- By default, the site loads in **dark mode** when visited for the first time.
- Color theme switches by replacing CSS variables.

### Animations
- All elements with `.reveal` fade in or slide in using CSS transitions.
- Animation is triggered by JS when the element enters the viewport.

---

## 5.3 JavaScript

### Dark Mode Toggle
- A toggle button updates the site theme.
- The user’s preference is saved in `localStorage`.
- On load, the saved theme is applied automatically.

### Scroll Reveal Animation
- Implemented using `IntersectionObserver`.
- When elements enter the viewport, `.in` is added to trigger CSS-based animations.

### Interactive Project Section
The project grid supports:

- **Search**
- **Filter by category**
- **Sort by title/date**

The logic:
1. Load all project cards into an array.
2. Apply filters based on input values.
3. Update the DOM with matching results.
3. Show/hide the empty-state message accordingly.

### Experience Collapse & Persistence
- Clicking a timeline title collapses/expands the card.
- Keyboard navigation supported: **Enter** or **Space**.
- State stored in `localStorage` using unique keys per job title.
- Ensures the user returns to the same open/closed state on reload.

### Contact Form Validation & Memory
- Prevents empty submissions.
- Uses built-in validation for email format.
- After submission:
    - Saves name + email into `localStorage`.
    - Prefills fields on the next visit.

### Dynamic Year
```js
document.getElementById('year').textContent = new Date().getFullYear();
```

### Weather Widget (Temperature + Emoji + Timer)
- Fetches real-time weather using the **Open-Meteo API**.
- Maps weather codes to emojis (☀️, 🌧️, ⛅, ⛈️…).
- Displays:
  `☀️ 18°C | 00:45`
- Timer updates every second using:

```js
setInterval(() => {
    seconds++;
    weatherDisplay.textContent = `${emoji} ${temp}°C | ${formatTime(seconds)}`;
}, 1000);
```

---

## 6. Design Decisions

- **Apple-inspired minimalist design**:
    - Soft shadows, rounded corners, neutral colors.
    - Clean typography and generous spacing.
- **Dark mode by default** to match modern UI trends.
- Fixed weather widget for personality and interactivity.
- Modular JS structure so each feature (theme, projects, weather, experience) stays isolated and maintainable.
- Reusable CSS variables to simplify theme switching and ensure consistency.

---

## 7. Testing & Compatibility

### Tested On:
- **Browsers**: Chrome, Edge, Safari (latest versions).
- **Devices**:
    - Desktop (1920×1080)
    - MacBook (13-inch & 14-inch)
    - iPad
    - iPhone (Safari & Chrome)

### Works Correctly:
- Dark/light mode toggle
- Experience collapse persistence
- Project search/filter/sort
- Contact form validation
- Weather widget + live timer
- Scroll animations
- Responsive scaling down to 360px width

### Known Limitations:
- Contact form does not send real messages (client-only).
- Weather API may occasionally fail if the network is unstable.
- Collapsible timeline uses text-based keys; renaming titles breaks stored state.

---

## 8. AI Assistance Summary
AI tools (ChatGPT) were used responsibly to:

- Explain concepts (IntersectionObserver, localStorage, timers).
- Debug features (weather widget, collapse logic, timer formatting).
- Suggest design enhancements (spacing, colors, typography).
- Provide documentation and clarity improvements.
- Assist in understanding best practices in accessibility and responsiveness.

All final code was reviewed, customized, and rewritten to fit the project requirements.

---

## 9. Conclusion
The portfolio demonstrates strong understanding of modern front-end principles including:

- Responsive layout
- State management
- Persistent data using `localStorage`
- Real-time UI updates
- Accessible components
- Clean and reusable CSS
- API integration

This project reflects both technical proficiency and thoughtful design choices, enhanced through responsible AI-assisted development.
