# Technical Documentation – Personal Portfolio Web Application (Assignment 4)

## 1. Introduction
This document provides a detailed technical overview of the personal portfolio website developed across Assignments 1–4. The final version (Assignment 4) integrates responsive layout techniques, interactivity, state persistence, animations, and new features such as the downloadable CV button and improved contact form validation.

This documentation explains:

- System architecture and structure
- Major implementation details
- Design decisions
- Testing and known limitations
- Responsible use of AI tools

---

## 2. System Overview
The portfolio is a static, client-side web application built using HTML, CSS, and JavaScript. It requires no backend server or database.

Core capabilities include:

- Introduction and About sections
- Collapsible Experience timeline
- Interactive Projects section
- Contact form with improved validation
- Downloadable CV button
- Dark/light theme mode
- Scroll reveal animations
- Weather widget with live timer
- Fully responsive design across all screen sizes

---

## 3. Repository Structure

```
assignment-4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── cv/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides.pdf
│   └── demo-video.mp4
└── .gitignore
```

All JavaScript features (projects filtering, animations, weather, contact form logic, theme toggling, etc.) are contained within a single file: `script.js`.

---

## 4. Technology Stack
- HTML5 – semantic structure and accessible layouts
- CSS3 – responsive design, variables, Grid, Flexbox
- JavaScript (ES6) – event handling, DOM manipulation, animations
- localStorage – persistence for theme, form inputs, timeline state
- Open-Meteo API – live weather information
- AI Tools (ChatGPT) – debugging guidance and documentation refinement

---

## 5. Implementation Details

### 5.1 HTML Structure
Semantic HTML organizes the portfolio into:

- Header with navigation and theme toggle
- Hero section with introduction and CV download button
- Weather widget
- About section
- Collapsible timeline for Experience
- Searchable and sortable Projects section
- Skills and Awards
- Contact form with validation
- Footer with dynamic year

---

### 5.2 CSS Implementation

#### Layout & Responsiveness
The site uses Flexbox and CSS Grid to structure content.  
Media queries provide layouts for mobile, tablet, and desktop.

#### Theme Management
A `.dark` class toggles dark mode using CSS variables.  
User preference is stored in localStorage.

#### Animations
CSS transitions combined with JavaScript class toggling create reveal effects.

---

### 5.3 JavaScript Implementation
(All implemented inside one file: `script.js`.)

#### 1) Theme Toggle
- Toggles `.dark` class
- Saves theme in localStorage
- Restores preference on load

#### 2) Reveal Animations
- Implemented using IntersectionObserver
- Adds `.in` class when elements enter the viewport

#### 3) Projects Section
Includes real-time search, category filters, and sorting options.

Logic flow:
```
Load → Filter → Sort → Render → Display Results/Empty State
```

#### 4) Experience Timeline
- Expand/collapse on click or keyboard
- State persisted in localStorage

#### 5) Contact Form (Improved in Assignment 4)
- Required-field and email validation
- Inline error messages
- Prevents empty submissions
- Saves name/email to localStorage
- Autofills fields on load

#### 6) Download CV Button (Assignment 4 Enhancement)
- Link-based download hosted in `/assets/cv/`
- Styled for visibility and accessibility

#### 7) Weather Widget
Uses Open-Meteo API to:

- Fetch temperature
- Display text-based condition
- Run a timer updated every second

Example:
```js
setInterval(() => {
    seconds++;
    weatherText.textContent = temp + " °C | " + formatTime(seconds);
}, 1000);
```

#### 8) Dynamic Footer Year
```js
document.getElementById('year').textContent = new Date().getFullYear();
```

---

## 6. Design Decisions

### Aesthetic Choices
- Minimalistic, modern interface
- Dark mode default
- Consistent spacing, rounded corners, readable typography

### Usability Enhancements
- Project filters for better navigation
- Collapsible timeline for reduced clutter
- CV button for practical portfolio use

### Maintainability
- Centralized JS logic
- CSS variables for global styling
- Semantic HTML sectioning

---

## 7. Testing & Compatibility

### Browsers
- Chrome
- Edge
- Safari

### Devices
- Windows desktop
- MacBook
- iPad
- iPhone

### Validated Behaviors
- Dark mode persistence
- Project filtering/search/sort
- Timeline collapse persistence
- Contact form validation and persistence
- Weather widget
- Reveal animations
- Responsive layout

### Known Limitations
- Weather API may be delayed on slow networks

---

## 8. AI Assistance Summary
AI was used to:

- Debug JavaScript
- Explain browser APIs
- Suggest UI and code improvements
- Organize documentation

All AI-generated outputs were reviewed and rewritten manually.

---

## 9. Conclusion
The project demonstrates mastery of:

- Responsive web design
- JavaScript interactivity
- State persistence
- Real-time data handling
- Performance optimization
- Documentation and presentation

Assignment 4 improvements, including the CV download button and enhanced contact form, complete the portfolio as a polished and professional web application.
