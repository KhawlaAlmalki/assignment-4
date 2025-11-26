


// ============================
// Dynamic Year in Footer
// ============================
document.getElementById('year').textContent = new Date().getFullYear();


// ============================
// Dark Mode Toggle (with persistence)
// ============================
const toggle = document.getElementById('themeToggle');   // Button element
const root = document.documentElement;                   // <html> element

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    root.classList.add('dark');
    toggle.textContent = '☀️';  // Switch icon to sun if dark mode is active
}

// Toggle dark mode on button click
toggle.addEventListener('click', () => {
    root.classList.toggle('dark');               // Add/remove .dark class
    const dark = root.classList.contains('dark');

    // Save preference
    localStorage.setItem('theme', dark ? 'dark' : 'light');

    // Update button icon
    toggle.textContent = dark ? '☀️' : '🌙';
});


// ============================
// Simple Contact Form Feedback (front-end only)
// ============================
const form = document.getElementById('contactForm');
const msg = document.getElementById('msg');
// Prefill saved name/email on load
(function () {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    if (!nameEl || !emailEl) return;

    const savedName = localStorage.getItem('contact_name');
    const savedEmail = localStorage.getItem('contact_email');
    if (savedName) nameEl.value = savedName;
    if (savedEmail) emailEl.value = savedEmail;
})();
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!form.checkValidity()) {
        msg.textContent = "Please fill all fields correctly.";
        return;
    }

    msg.textContent = "Thanks! Your message was sent.";

    // Save name and email for next visit (must be before reset!)
    try {
        localStorage.setItem('contact_name', document.getElementById('name').value.trim());
        localStorage.setItem('contact_email', document.getElementById('email').value.trim());
    } catch (e) {
        console.warn("Couldn't save contact info:", e);
    }

    form.reset(); // Clear form fields
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

    searchInput.addEventListener("input", applyFilters);
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
    const STORAGE_KEY = "exp_collapsed_keys_v1";
    const keyFromTitle = (h) =>
        (h.textContent || "")
            .trim().toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");

    const loadSet = () => {
        try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
        catch { return new Set(); }
    };
    const saveSet = (set) => localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
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


// ====================
// WEATHER API
// ====================
function getWeatherEmoji(code) {
    if (code === 0) return "☀️";                 // clear
    if ([1, 2, 3].includes(code)) return "⛅";     // cloudy
    if ([51, 53, 55].includes(code)) return "🌦️"; // drizzle
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️"; // rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️"; // snow
    if ([45, 48].includes(code)) return "🌫️";     // fog
    if ([95, 96, 99].includes(code)) return "⛈️"; // thunder

    return "🌡️"; // default
}

async function fetchWeather() {
    const weatherCard = document.getElementById('weather-card');
    const weatherContent = document.getElementById('weather-content');
    const weatherError = document.getElementById('weather-error');

    try {
        // Using Open-Meteo API (no API key required)
        const latitude = 26.1551; // Dhahran latitude
        const longitude = 50.1655; // Dhahran longitude

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m&temperature_unit=celsius&timezone=auto`
        );

        if (!response.ok) throw new Error('Weather API request failed');

        const data = await response.json();
        const current = data.current;

        // Convert weather code to description
        const weatherDesc = getWeatherDescription(current.weather_code);
        const emoji = getWeatherEmoji(current.weather_code);

        weatherContent.innerHTML = `
    <div class="weather-inline">
        <span class="weather-emoji">${emoji}</span>
        <span class="weather-temp">${Math.round(current.temperature_2m)}°C</span>
 
    </div>
`;
        weatherError.style.display = 'none';



        weatherError.style.display = 'none';
    } catch (error) {
        weatherContent.innerHTML = '';
        weatherError.textContent = 'Weather data is temporarily unavailable. Please try again later.';
        weatherError.style.display = 'block';
        console.error('Weather fetch error:', error);
    }
}

function getWeatherDescription(code) {
    // WMO Weather interpretation codes
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };

    return descriptions[code] || 'Unknown';
}

// Fetch weather on page load
document.addEventListener('DOMContentLoaded', fetchWeather);


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

        jokeContent.innerHTML = `<p style="font-size: 16px; font-weight: 500; line-height: 1.6;">"${advice}"</p>`;
        jokeError.style.display = 'none';
    } catch (error) {
        jokeContent.innerHTML = '';
        jokeError.textContent = 'Unable to load a new insight right now. Please try again later.';
        jokeError.style.display = 'block';
        console.error('Advice fetch error:', error);
    }
}

// Fetch joke on page load
document.addEventListener('DOMContentLoaded', fetchJoke);

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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================
// PERFORMANCE OPTIMIZATION
// ====================
// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}// ============================
// STATE: Show / Hide Experience
// ============================

const expBtn = document.getElementById('toggle-experience');
const expSection = document.getElementById('experience');

// Load state from storage
let expHidden = localStorage.getItem('exp_hidden') === 'true';

// Apply state
function renderExperience() {
    expSection.style.display = expHidden ? 'none' : '';
    expBtn.textContent = expHidden ? 'Show Experience' : 'Hide Experience';
}

// Initial render
renderExperience();

// Toggle logic
expBtn.addEventListener('click', () => {
    expHidden = !expHidden;
    localStorage.setItem('exp_hidden', expHidden);
    renderExperience();
});

// ============================
// WEATHER + INLINE TIMER
// ============================

const weatherDisplay = document.getElementById("weather-display");

// ---- Weather + Emoji -----
function updateWeather(temp, emoji) {
    // لما يجهز الطقس، نرسم النص لأول مرة
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeSpent =
        mins > 0 ? `${mins}m ${secs.toString().padStart(2, "0")}s` : `${secs}s`;

    weatherDisplay.textContent = `${emoji} ${temp}°C | ${timeSpent}`;
}

// ---- Timer -----
let seconds = 0;

// Format → 00:00 (mm:ss)
function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    const mm = mins.toString().padStart(2, "0");
    const ss = secs.toString().padStart(2, "0");

    return `${mm}:${ss}`;
}

// Update timer every second
setInterval(() => {
    seconds++;

    const currentLeft = weatherDisplay.textContent.split("|")[0].trim();
    if (!currentLeft) return; // if weather not loaded yet

    const formatted = formatTime(seconds);

    weatherDisplay.textContent = `${currentLeft} | ${formatted}`;
}, 1000);

// ---- Fetch Weather -----
async function fetchWeather() {
    try {
        // Random emoji for example; use your own logic if needed
        const emoji = "☀️";
        const temperature = 16;

        updateWeather(temperature, emoji);
    } catch (e) {
        weatherDisplay.textContent = "Weather unavailable";
    }
}

fetchWeather();
