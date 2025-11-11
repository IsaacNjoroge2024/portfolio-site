/**
 * Contact form handling with Web3Forms integration
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

function initFormValidation() {
    if (contactForm) {
        // Replacing the default form submission with fetch API for Web3Forms
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        return false;
    }

    // the loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Getting the form data
    const formData = new FormData(contactForm);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    // Sending data to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(object)
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                // Success
                contactForm.reset();
                showThankYouModal();
            } else {
                // Error
                console.error('Form submission error:', json);
                alert('Something went wrong. Please try again or contact me directly via email.');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please try again or contact me directly via email.');
        })
        .finally(() => {
            // the reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
}

function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Check for empty fields
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
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

    // Checking URL parameters for the thank you page redirect
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