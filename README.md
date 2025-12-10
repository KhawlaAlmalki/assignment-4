# 🌐 Personal Portfolio Web Application – Assignment 4
**Web Engineering (SWE363) – Final Enhanced Version**  
**Student:** Khawlah Almalki 


This project represents the **culmination of Assignments 1–4**, evolving from a basic static layout into a **fully-featured personal portfolio web application** with interactive components, persistent client-side data, performance optimizations, and Assignment-4-specific enhancements, including a backend-ready architecture, improved form handling, and a downloadable CV feature.

The final deliverable demonstrates professional design, modular code structure, usability, responsiveness, and readiness for future backend expansion.

---

# 🎨 Overview of the Web Application

The website presents key information about me:

- Background & personal introduction  
- Skillset and achievements  
- Experience timeline  
- Projects with sorting, searching, and filtering  
- Downloadable résumé (new)  
- Contact form with enhanced logic (new)  

It is built with **HTML, CSS, and vanilla JavaScript** and structured to support future backend integration.

---

# ✨ Key Features (Final Version)

## 🧱 **Core Structure**
- **About Me** – Profile image, bio, links  
- **Projects Showcase** – Responsive grid, cards with metadata  
- **Experience Timeline** – Chronological and collapsible  
- **Skills & Awards** – Categorized and visually organized  
- **Dark/Light Mode** – System-aware, toggle-based  
- **Mobile-first Responsive Layout** – Flexbox + CSS Grid  

---

## ⚙️ **Interactive & Dynamic Enhancements**

### 🔍 Projects  
- Search  
- Category filtering  
- Sorting (A–Z, Z–A, by date)  
- Smooth animations & reveal effects  

### 📝 Experience Timeline  
- Expand/collapse with keyboard support  
- State saved using `localStorage`  

### 📩 Contact Form (Improved for Assignment 4)  
- Custom validation rules  
- Prevents incomplete/invalid submissions  
- Inline error feedback  
- Stores name/email in `localStorage`  
- **Backend-ready submission hook (new)**  
  JS now includes a structured `submitContactForm()` handler that can integrate with a real API later.

---

## 🆕 **Assignment 4 Enhancements**

### 🟩 1. **Download CV Button**
- New prominent button in the About section  
- Links to a hosted PDF in `/assets/cv/`  
- Demonstrates a real-world portfolio practice  

### 🟧 2. **Better Contact Form Logic**
- Rebuilt validation flow  
- Cleaner error handling  
- Pre-submission formatting of form data  
- Backend-stub function that prepares payload  

---


# Assignment 4 Enhancements

## 1. Download CV Button  
- Added to the About section  
- Initiates immediate PDF download  
- Uses /assets/cv/ directory  

## 2. EmailJS Contact Form Integration  
A fully functional client-side email system was added using EmailJS.
<img width="807" height="310" alt="image" src="https://github.com/user-attachments/assets/64ad6e34-24cd-4f90-aa63-a7a292cf84fe" />

### Capabilities
- Sends visitor messages directly to the portfolio owner  
- No backend server required  
- Async/Await-based email sending  
- Error and success states with user feedback  
- Disabled button during sending to prevent duplication  
- URL detection and blocking for basic spam protection  

### Implementation Notes
- EmailJS SDK included via CDN in index.html  
- Initialization and email sending logic inside script.js  
- Template parameters: name, email, message  
- Accessible ARIA live regions for feedback  

This transforms the static contact form into a functional communication channel.

---

# ⚡ Performance & Accessibility Enhancements

- Compressed/resized images  
- Lazy-loaded noncritical assets  
- Inline critical CSS  
- Preloaded main stylesheet  
- Reduced cumulative layout shift  
- Removed unused JS and CSS  
- Ensured accessible contrast, labels, ARIA roles  

---

# 📊 Lighthouse Score (Final)
<img width="1904" height="1170" alt="image" src="https://github.com/user-attachments/assets/0fabc664-f930-4e74-b160-cdb115d66502" />

**Performance: 99**  
- FCP: 0.9s  
- LCP: 1.8s  
- TBT: 0ms  
- CLS: 0  

---

# 🧱 System Architecture

```
root/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── script.js
│   ├── projects.js
│   ├── weather.js
│   ├── contact.js
│   └── api.js
├── assets/
│   ├── images/
│   └── cv/
├── docs/
│   ├── technical-documentation.md
│   └── ai-usage-report.md
└── presentation/
```

---

# 🛠️ Installation & Setup

```bash
git clone https://github.com/KhawlaAlmalki/assignment-4
cd assignment-4
open index.html
```

No dependencies required — static website.

---

# 🤖 AI Usage Summary

AI tools (ChatGPT & Claude) were used for:

- Debugging JavaScript  
- Improving form logic & validation  
- Creating backend stub functions  
- Enhancing readability and structure  
- Improving animations & layout spacing  
- Refining documentation wording  

Full usage breakdown is in:  
📄 `docs/ai-usage-report.md`

---

# 🚀 Live Demo

🔗 **https://khawlaalmalki.github.io/assignment-4/**  

