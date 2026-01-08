// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

// Sticky Navbar Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('nav-logo');

    if (window.scrollY > 50) {
        navbar.classList.add('py-1', 'shadow-md');
        navbar.classList.remove('py-2');

        if (logo) {
            logo.classList.remove('h-24');
            logo.classList.add('h-16');
        }
    } else {
        navbar.classList.remove('py-1', 'shadow-md');
        navbar.classList.add('py-2');

        if (logo) {
            logo.classList.remove('h-16');
            logo.classList.add('h-24');
        }
    }
});

// Scroll Reveal Observer (Industrial/Mechanical Reveal)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
});

// Simple Form Handler (Generic)
document.querySelectorAll('form').forEach(form => {
    // Skip forms that have specific handlers
    if (form.id === 'hero-quote-form') return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Request received. Our marine team will contact you shortly.');
    });
});

// Hero Quote Form Handler (Web3Forms Integration)
const heroForm = document.getElementById('hero-quote-form');
if (heroForm) {
    const submitBtn = heroForm.querySelector('button[type="submit"]');

    heroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(heroForm);
        formData.append("access_key", "0ac9e31f-be1d-48c4-829e-e5de6641c3b7");

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! Your message has been sent.");
                heroForm.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Smooth Hover Effect for Cards (replacing 3D tilt)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Highlight active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match current page or default to index.html for root
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Initialize intl-tel-input for phone with flags
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput && window.intlTelInput) {
        const iti = window.intlTelInput(phoneInput, {
            initialCountry: "in",
            preferredCountries: ["in", "us", "gb", "ae", "sg"],
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js"
        });
    }
});
