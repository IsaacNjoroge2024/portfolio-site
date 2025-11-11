/**
 * Contact form handling
 */

// DOM Elements
const contactForm = document.getElementById('contact-form');
const thankYouModal = document.getElementById('thank-you');
const thankYouCloseBtn = document.getElementById('thank-you-close');

// Initializing the form functionality
document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    initThankYouModal();
});

/**
 * Initialize form validation
 */
function initFormValidation() {
    if (contactForm) {
        // I'm using FormSubmit.co for email handling, so we only need client-side validation
        contactForm.addEventListener('submit', validateForm);
    }
}

/**
 * Validate form before submission
 * @param {Event} e - The form submission event
 */
function validateForm(e) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Check for empty fields
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        e.preventDefault();

        // Highlighting the empty fields
        if (!nameInput.value.trim()) {
            nameInput.style.borderColor = 'red';
        } else {
            nameInput.style.borderColor = '';
        }

        if (!emailInput.value.trim()) {
            emailInput.style.borderColor = 'red';
        } else {
            emailInput.style.borderColor = '';
        }

        if (!messageInput.value.trim()) {
            messageInput.style.borderColor = 'red';
        } else {
            messageInput.style.borderColor = '';
        }

        return false;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        e.preventDefault();
        emailInput.style.borderColor = 'red';
        return false;
    }

    return true;
}

/**
 * Initialize the thank you modal
 */
function initThankYouModal() {
    // For the thank-you page
    if (thankYouModal && thankYouCloseBtn) {
        thankYouCloseBtn.addEventListener('click', () => {
            thankYouModal.classList.remove('show');
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');

    if (success === 'true' && thankYouModal) {
        showThankYouModal();
    }
}

/**
 * Show the thank you modal
 */
function showThankYouModal() {
    if (thankYouModal) {
        thankYouModal.classList.add('show');

        // Auto-closing the thank you page after 5 seconds
        setTimeout(() => {
            thankYouModal.classList.remove('show');
        }, 5000);
    }
}

/**
 * Reset form fields on input
 */
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Resetting the border color when the user starts typing
            input.style.borderColor = '';
        });
    });
}