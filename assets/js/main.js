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
    if (form.id === 'hero-quote-form' || form.id === 'contact-page-form') return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Success Toast
        showToast('Request received. Our marine team will contact you shortly.', 'success');
    });
});

// Toast Notification Helper
function showToast(message, type = 'success') {
    let toastContainer = document.querySelector('.toast-container');

    // Create container if it doesn't exist
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icon based on type
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
    `;

    // Append to container
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400); // Wait for transition out
    }, 4000);
}

// Web3Forms Integration Handler (Reusable)
function attachWeb3FormHandler(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validation Check
        if (!form.checkValidity()) {
            showToast("Please fill in all required fields.", 'error');
            // Allow browser default validation UI to show (if needed, but preventing default might stop it, so we rely on toast)
            // Actually, if we preventDefault() immediately, the browser popup might not show. 
            // Better to let browser handle validation? 
            // The user asked for "show any type of message or error use the same style toast message".
            // So suppressing browser default and using Toast is better.

            // To highlight invalid fields we can do:
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        formData.append("access_key", "0ac9e31f-be1d-48c4-829e-e5de6641c3b7");

        // Keep the icon if it exists, simplified for now:
        const originalHtml = submitBtn.innerHTML;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                showToast("Success! Your message has been sent.", 'success');

                // Button Success State
                submitBtn.textContent = "Message Sent!";
                submitBtn.style.backgroundColor = "#00838F"; // Brand Mint
                submitBtn.style.borderColor = "#00838F";

                form.reset();

                // Revert button after 4 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalHtml; // Restore original text + icon
                    submitBtn.style.backgroundColor = ""; // Reset to default CSS
                    submitBtn.style.borderColor = "";
                    submitBtn.disabled = false;
                }, 4000);

            } else {
                showToast("Error: " + data.message, 'error');
                submitBtn.innerHTML = originalHtml;
                submitBtn.disabled = false;
            }

        } catch (error) {
            showToast("Something went wrong. Please try again.", 'error');
            submitBtn.innerHTML = originalHtml;
            submitBtn.disabled = false;
        }
    });
}

// Initialize Handlers
attachWeb3FormHandler('hero-quote-form');
attachWeb3FormHandler('contact-page-form');

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
