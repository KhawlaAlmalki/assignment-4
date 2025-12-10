# Technical Documentation – Personal Portfolio Web Application (Assignment 4)

## 1. Introduction
This document provides a detailed technical overview of the personal portfolio website developed across Assignments 1–4. The final version (Assignment 4) integrates responsive layout techniques, interactivity, state persistence, animations, and new features such as the downloadable CV button, improved contact form validation, and full EmailJS-powered email delivery.

This documentation explains:

- System architecture and structure
- Major implementation details
- Design decisions
- Testing and known limitations
- Responsible use of AI tools

---

## 2. System Overview
The portfolio is a static, client-side web application built using HTML, CSS, and JavaScript. It requires no backend server or database.  
Assignment 4 introduces client-side email sending via EmailJS, enabling real contact form submissions without needing a custom backend.

Core capabilities include:

- Introduction and About sections
- Collapsible Experience timeline
- Interactive Projects section
- Contact form with improved validation
- EmailJS integration for real email delivery
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

All JavaScript features—including projects filtering, animations, weather logic, EmailJS integration, validation, and theme toggling—are contained within a single file: `script.js`.

---

## 4. Technology Stack
- HTML5 – semantic structure and accessible layouts
- CSS3 – responsive design, variables, Grid, Flexbox
- JavaScript (ES6) – interactivity and DOM manipulation
- localStorage – persistence for theme, form inputs, and timeline state
- Open-Meteo API – live weather information
- EmailJS SDK – client-side email delivery
- AI Tools (ChatGPT) – debugging guidance and documentation refinement

---

## 5. Implementation Details

### 5.1 HTML Structure
Semantic HTML organizes the portfolio into:

- Header and theme toggle
- Hero section with introduction and CV download button
- Weather widget
- About section
- Collapsible Experience timeline
- Projects with search, filter, and sort
- Skills and Awards sections
- Contact form with validation and email sending
- Footer with dynamic year

---

### 5.2 CSS Implementation

#### Layout & Responsiveness
- Flexbox for structural alignment  
- CSS Grid for card layouts  
- Media queries for mobile, tablet, and desktop  

#### Theme Management
- `.dark` mode class applied to the `<html>` element  
- Colors controlled via CSS variables  
- Theme saved in `localStorage`  

#### Animations
- CSS transitions combined with JS-triggered reveal classes  

---

## 5.3 JavaScript Implementation  
(All implemented inside `script.js`.)

### 1) Theme Toggle
- Adds/removes `.dark`
- Saves user preference in `localStorage`

### 2) Reveal Animations
- Uses IntersectionObserver
- Adds `.in` when elements enter the viewport

### 3) Projects Section
Real-time interactive filtering:

```
Load → Filter → Sort → Render → Display Results/Empty State
```

### 4) Experience Timeline
- Expand/collapse on click or keyboard
- State persisted using `localStorage`

### 5) Contact Form (Improved in Assignment 4)
- Custom validation rules for all fields
- Inline error messages
- LocalStorage draft-saving
- Prevents invalid or incomplete submissions

---

## 5.4 EmailJS Integration (Assignment 4 Enhancement)
A major upgrade to the contact form is the addition of EmailJS-based email delivery, enabling real messages to be sent without a backend server.

### Implementation Details
- EmailJS SDK added via CDN in `index.html`
- EmailJS initialized in `script.js` using a Public Key
- Configured Service ID and Template ID for message routing

### Email Sending Flow
1. Validate form inputs  
2. Disable submit button and display “Sending…”  
3. Build template parameters (name, email, message)  
4. Call `emailjs.send()` asynchronously  
5. Display success or error message  
6. Re-enable the button  

### Additional Enhancements
- URL detection and blocking to reduce spam  
- ARIA live region for accessibility  
- LocalStorage used to save name and email for returning visitors  

This transforms the contact form into a functional, reliable communication tool.

---

### 5.5 Weather Widget
- Retrieves temperature from the Open-Meteo API  
- Displays a text-based weather description  
- Includes a continuously updated timer  

### 5.6 Dynamic Footer Year
```js
document.getElementById('year').textContent = new Date().getFullYear();
```

---

## 6. Design Decisions

### Aesthetic Choices
- Clean, minimalistic UI  
- Default dark mode  
- Rounded components and uniform spacing  

### Usability Enhancements
- Interactive project filtering  
- Collapsible timeline reduces information overload  
- Clear validation messages in the contact form  
- Easy résumé download  

### Maintainability
- Single JS file simplifies project management  
- Semantic HTML improves clarity  
- Reusable CSS variables  

---

## 7. Testing & Compatibility

### Browsers Tested
- Chrome  
- Edge  
- Safari  

### Devices Tested
- Desktop (Windows & macOS)  
- iPad  
- iPhone  

### Validated Behaviors
- Dark mode toggle persistence  
- Projects filtering/search/sort  
- Timeline opening/closing persistence  
- EmailJS form submission  
- Success/error messaging in contact form  
- Weather widget  
- Reveal animations  
- Fully responsive layout  

### Known Limitations
- Email delivery depends on EmailJS service uptime  
- Weather API may load slowly on low bandwidth  

---

## 8. AI Assistance Summary
AI was used to:

- Debug JavaScript  
- Explain APIs (IntersectionObserver, localStorage, EmailJS)  
- Suggest UX improvements  
- Improve documentation clarity  

All AI-generated suggestions were manually rewritten and validated.

---

## 9. Conclusion
The portfolio demonstrates strong proficiency in:

- Responsive web development  
- JavaScript-based interactivity  
- Client-side state management  
- Real email delivery using EmailJS  
- API consumption  
- Performance optimization  
- Professional documentation  

Assignment 4 enhancements—including the CV download button, improved contact form, and EmailJS integration—complete the project as a polished, functional, and user-friendly portfolio application.
