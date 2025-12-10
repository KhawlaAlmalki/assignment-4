// ============================
// Dynamic Year in Footer
// ============================
document.getElementById('year').textContent = new Date().getFullYear();


// ============================
// Dark Mode Toggle
// ============================
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Apply saved theme on load
try {
    if (localStorage.getItem('theme') === 'dark') {
        root.classList.add('dark');
        toggle.textContent = '☀️';
    }
} catch (error) {
    console.warn('Could not access localStorage:', error);
}

// Toggle dark mode on button click
toggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    const dark = root.classList.contains('dark');

    // Save preference
    try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (error) {
        console.warn('Could not save theme preference:', error);
    }

    // Update button icon
    toggle.textContent = dark ? '☀️' : '🌙';
});

// ============================
// Contact Form Validation & Email Sending
// ============================
const form = document.getElementById('contactForm');
const msg = document.getElementById('msg');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'eLbIMz5q_TU2EHKfX',
    SERVICE_ID: 'service_a9115es',
    TEMPLATE_ID: 'template_ncuwt0c'
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Prefill saved name/email on load
try {
    const savedName = localStorage.getItem('contact_name');
    const savedEmail = localStorage.getItem('contact_email');
    if (savedName) nameInput.value = savedName;
    if (savedEmail) emailInput.value = savedEmail;
} catch (error) {
    console.warn('Could not load saved contact info:', error);
}

const clearErrors = () => {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    msg.textContent = '';
    msg.className = 'muted';
};

const validateForm = () => {
    clearErrors();
    let valid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Name validation
    if (name.length < 3) {
        nameError.textContent = 'Please enter your full name (3+ characters).';
        valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Message validation with spam check
    if (message.length < 15) {
        messageError.textContent = 'Please write at least 15 characters.';
        valid = false;
    } else if (message.toLowerCase().includes('http')) {
        messageError.textContent = 'Please remove links from your message.';
        valid = false;
    }

    return valid;
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        msg.textContent = '⚠️ Please fix the highlighted fields.';
        msg.className = 'muted error';
        return;
    }

    // Check if EmailJS is configured
    if (typeof emailjs === 'undefined') {
        msg.textContent = '⚠️ Email service is not loaded. Please refresh the page.';
        msg.className = 'muted error';
        return;
    }

    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // Fallback: Show success message without actually sending
        msg.textContent = '✓ Thanks! Your message was received (EmailJS not configured).';
        msg.className = 'muted';

        // Save contact info
        try {
            localStorage.setItem('contact_name', nameInput.value.trim());
            localStorage.setItem('contact_email', emailInput.value.trim());
        } catch (error) {
            console.warn('Could not save contact info:', error);
        }

        form.reset();
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    msg.textContent = '📤 Sending your message...';
    msg.className = 'muted';

    try {
        // Prepare email parameters
        const templateParams = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            to_name: 'Khawlah Al-Malki'
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );

        if (response.status === 200) {
            // Success
            msg.textContent = '✓ Thanks! Your message was sent successfully.';
            msg.className = 'muted';

            // Save contact info for next time
            try {
                localStorage.setItem('contact_name', nameInput.value.trim());
                localStorage.setItem('contact_email', emailInput.value.trim());
            } catch (error) {
                console.warn('Could not save contact info:', error);
            }

            // Reset form
            form.reset();
        }
    } catch (error) {
        // Error handling
        console.error('Email send error:', error);
        msg.textContent = '⚠️ Failed to send message. Please try again or email directly.';
        msg.className = 'muted error';
    } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});


// ============================
// Scroll Reveal (Intersection Observer)
// ============================
// Adds "in" class when elements with .reveal enter viewport
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in'); // Trigger CSS animation
            io.unobserve(entry.target);       // Stop observing once revealed
        }
    });
}, { threshold: 0.12 }); // ~12% visible before triggering
// ============================
// Projects Section Interactivity (Search / Filter / Sort)
// ============================
(function () {
    const grid = document.querySelector("#projects .grid.projects");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".p-card"));
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const sortSelect = document.getElementById("sortSelect");
    const empty = document.getElementById("emptyState");
    const summary = document.getElementById("resultsSummary");

    const items = cards.map(card => ({
        el: card,
        title: card.querySelector("h3")?.textContent.toLowerCase() || "",
        desc: card.querySelector("p")?.textContent.toLowerCase() || "",
        tags: Array.from(card.querySelectorAll(".tag")).map(t => t.textContent.toLowerCase()),
        category: card.dataset.category,
        date: new Date(card.dataset.date)
    }));

    function applyFilters() {
        const query = searchInput.value.toLowerCase();
        const category = filterSelect.value;
        const sort = sortSelect.value;

        let filtered = items.filter(({ title, desc, tags, category: cat }) => {
            const matchesText =
                title.includes(query) ||
                desc.includes(query) ||
                tags.some(t => t.includes(query));
            const matchesCategory = category === "all" || cat === category;
            return matchesText && matchesCategory;
        });

        filtered.sort((a, b) => {
            switch (sort) {
                case "title-asc": return a.title.localeCompare(b.title);
                case "title-desc": return b.title.localeCompare(a.title);
                case "date-asc": return a.date - b.date;
                case "date-desc": return b.date - a.date;
                default: return 0;
            }
        });

        // Update DOM
        grid.innerHTML = "";
        filtered.forEach(({ el }) => grid.appendChild(el));

        summary.textContent =
            filtered.length === cards.length
                ? `${filtered.length} projects`
                : `${filtered.length} of ${cards.length} projects shown`;

        empty.hidden = filtered.length > 0;
    }

    // Debounce function to limit how often applyFilters runs
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounced search input (300ms delay)
    searchInput.addEventListener("input", debounce(applyFilters, 300));
    filterSelect.addEventListener("change", applyFilters);
    sortSelect.addEventListener("change", applyFilters);
})();

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// ============================
// Experience: collapsible cards + persistence (unified)
// ============================
(function () {
    const timeline = document.querySelector("#experience .timeline");
    if (!timeline) return;

    // 1) Tag titles first (so selectors work for the rest)
    const titles = Array.from(timeline.querySelectorAll(".t-card h3"));
    titles.forEach(h => {
        h.classList.add("t-title");
        if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "0");
        if (!h.hasAttribute("aria-expanded")) h.setAttribute("aria-expanded", "true");
    });

    // 2) Persistence helpers
    const STORAGE_KEY = 'exp_collapsed_keys_v1';
    const keyFromTitle = (h) =>
        (h.textContent || '')
            .trim().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '');

    const loadSet = () => {
        try {
            return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
        } catch (error) {
            console.warn('Could not load collapsed state:', error);
            return new Set();
        }
    };

    const saveSet = (set) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
        } catch (error) {
            console.warn('Could not save collapsed state:', error);
        }
    };

    const collapsed = loadSet();

    // 3) Apply initial state from storage
    titles.forEach(h => {
        const card = h.closest(".t-card");
        const k = keyFromTitle(h);
        const isCollapsed = collapsed.has(k);
        h.setAttribute("aria-expanded", String(!isCollapsed));
        card.classList.toggle("collapsed", isCollapsed);
    });

    // 4) Toggle + persist on interaction
    function toggle(h) {
        const card = h.closest(".t-card");
        const expanded = h.getAttribute("aria-expanded") !== "false";
        const k = keyFromTitle(h);

        // flip
        h.setAttribute("aria-expanded", String(!expanded));
        card.classList.toggle("collapsed", expanded);

        // persist
        if (expanded) collapsed.add(k); else collapsed.delete(k);
        saveSet(collapsed);
    }

    // Click
    timeline.addEventListener("click", (e) => {
        const h = e.target.closest(".t-title");
        if (h) toggle(h);
    });

    // Keyboard (Enter/Space)
    timeline.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            const h = e.target.closest(".t-title");
            if (!h) return;
            e.preventDefault();
            toggle(h);
        }
    });
})();


// ============================
// Weather API with Timer
// ============================
const weatherDisplay = document.getElementById('weather-display');
const weatherError = document.getElementById('weather-error');
let seconds = 0;
let weatherTimerInterval = null;

// Get weather emoji based on WMO code
const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️';
    if ([1, 2, 3].includes(code)) return '⛅';
    if ([51, 53, 55].includes(code)) return '🌦️';
    if ([61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
    if ([45, 48].includes(code)) return '🌫️';
    if ([95, 96, 99].includes(code)) return '⛈️';
    return '🌡️';
};

// Format time as mm:ss
const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Update weather display with temperature and timer
const updateWeatherDisplay = (temp, emoji) => {
    const formatted = formatTime(seconds);
    weatherDisplay.textContent = `${emoji} ${temp}°C | ${formatted}`;
};

// Fetch weather from Open-Meteo API
const fetchWeather = async () => {
    try {
        // Clear existing interval to prevent memory leak
        if (weatherTimerInterval) {
            clearInterval(weatherTimerInterval);
        }

        const latitude = 26.1551;
        const longitude = 50.1655;
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=auto`
        );

        if (!response.ok) throw new Error('Weather API request failed');

        const data = await response.json();
        const current = data.current;
        const emoji = getWeatherEmoji(current.weather_code);
        const temp = Math.round(current.temperature_2m);

        updateWeatherDisplay(temp, emoji);
        weatherError.style.display = 'none';

        // Update timer every second
        weatherTimerInterval = setInterval(() => {
            seconds++;
            updateWeatherDisplay(temp, emoji);
        }, 1000);
    } catch (error) {
        weatherDisplay.textContent = 'Weather unavailable';
        weatherError.textContent = 'Weather data is temporarily unavailable.';
        weatherError.style.display = 'block';
        console.error('Weather fetch error:', error);
    }
};


// ====================
// JOKE/ADVICE API
// ====================
const newJokeBtn = document.getElementById('new-joke-btn');
const jokeContent = document.getElementById('joke-content');
const jokeError = document.getElementById('joke-error');

async function fetchJoke() {
    jokeError.style.display = 'none';
    jokeContent.innerHTML = '<p class="loading">Loading insight...</p>';

    try {
        const response = await fetch('https://api.adviceslip.com/advice');

        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        const advice = data.slip.advice;

        // Use textContent to prevent XSS, then wrap in styled paragraph
        const paragraph = document.createElement('p');
        paragraph.style.fontSize = '16px';
        paragraph.style.fontWeight = '500';
        paragraph.style.lineHeight = '1.6';
        paragraph.textContent = `"${advice}"`;

        jokeContent.innerHTML = '';
        jokeContent.appendChild(paragraph);
        jokeError.style.display = 'none';
    } catch (error) {
        jokeContent.innerHTML = '';
        jokeError.textContent = 'Unable to load a new insight right now. Please try again later.';
        jokeError.style.display = 'block';
        console.error('Advice fetch error:', error);
    }
}

// Fetch new joke on button click
newJokeBtn.addEventListener('click', fetchJoke);

// ====================
// SMOOTH SCROLLING
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);

            // Respect user's motion preferences
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================
// PERFORMANCE OPTIMIZATION
// ====================
// ============================
// Show/Hide Experience Section
// ============================
const expBtn = document.getElementById('toggle-experience');
const expSection = document.getElementById('experience');

// Load saved state
let expHidden = false;
try {
    expHidden = localStorage.getItem('exp_hidden') === 'true';
} catch (error) {
    console.warn('Could not access localStorage:', error);
}

// Apply state
const renderExperience = () => {
    expSection.style.display = expHidden ? 'none' : '';
    expBtn.textContent = expHidden ? 'Show Experience' : 'Hide Experience';
};

// Initial render
renderExperience();

// Toggle logic
expBtn.addEventListener('click', () => {
    expHidden = !expHidden;
    try {
        localStorage.setItem('exp_hidden', expHidden);
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
    renderExperience();
});

// ============================
// Initialize on Page Load
// ============================
document.addEventListener('DOMContentLoaded', () => {
    // Fetch weather data
    fetchWeather();

    // Fetch initial advice/joke
    fetchJoke();
});