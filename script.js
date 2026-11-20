/* ==========================================
   Portfolio JavaScript — Interactions & Animations
   ========================================== */

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Data Science Enthusiast',
    'Python Developer',
    'Power BI Dashboard Creator',
    'AI & ML Explorer',
    'AWS Certified Cloud Practitioner'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

typeWriter();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== Active Nav Link Highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// ===== Cursor Glow Follow =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== Stat Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = counter.getAttribute('data-decimal') === 'true';
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (isDecimal) {
                counter.textContent = current.toFixed(2) + suffix;
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                if (isDecimal) {
                    counter.textContent = target.toFixed(2) + suffix;
                } else {
                    counter.textContent = target + suffix;
                }
            }
        }

        requestAnimationFrame(update);
    });
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .edu-card, .cert-card, .stat-card, .contact-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

let countersAnimated = false;

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter animation when stats become visible
            if (entry.target.classList.contains('stat-card') && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }

            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('%c👩‍💻 Portfolio by Pujala Venkata Swathi', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
