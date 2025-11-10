/**
 * Contact form handling
 */

// DOM Elements
const contactForm = document.getElementById('contact-form');

// Initialize form functionality
document.addEventListener('DOMContentLoaded', () => {
    initFormSubmission();
});

/**
 * Initialize form submission and validation
 */
function initFormSubmission() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

/**
 * Handle form submission
 * @param {Event} e - The form submission event
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    // Validate inputs
    if (!validateForm(nameInput, emailInput, messageInput)) {
        return;
    }

    // Show loading state
    submitBtn.innerHTML = '<div class="loader"></div>';
    submitBtn.disabled = true;

    // Prepare form data
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };

    try {
        // In a real implementation, you would send the form data to a server
        // Since GitHub Pages doesn't support server-side code, we're simulating success
        await simulateFormSubmission(formData);

        // Show success message
        showFormSuccess();

        // Reset form
        contactForm.reset();
    } catch (error) {
        // Show error message
        showFormError(error.message);
    } finally {
        // Reset button state
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
}

/**
 * Validate form inputs
 * @param {HTMLInputElement} nameInput - The name input element
 * @param {HTMLInputElement} emailInput - The email input element
 * @param {HTMLTextAreaElement} messageInput - The message textarea element
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(nameInput, emailInput, messageInput) {
    let isValid = true;

    // Reset previous error styles
    [nameInput, emailInput, messageInput].forEach(input => {
        input.style.borderColor = '';
    });

    // Validate name (non-empty)
    if (!nameInput.value.trim()) {
        nameInput.style.borderColor = 'red';
        isValid = false;
    }

    // Validate email (format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = 'red';
        isValid = false;
    }

    // Validate message (non-empty)
    if (!messageInput.value.trim()) {
        messageInput.style.borderColor = 'red';
        isValid = false;
    }

    return isValid;
}

/**
 * Simulate form submission (placeholder for actual API call)
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - A promise that resolves after a delay
 */
function simulateFormSubmission(formData) {
    // Log form data to console (for demonstration purposes)
    console.log('Form data to be sent:', formData);

    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1500);
    });
}

/**
 * Show success message after form submission
 */
function showFormSuccess() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.style.color = '#4CAF50';
    successMessage.style.padding = '1rem';
    successMessage.style.marginTop = '1rem';
    successMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
    successMessage.style.borderRadius = '5px';
    successMessage.style.textAlign = 'center';
    successMessage.style.fontWeight = 'bold';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! I\'ll get back to you soon.';

    // Insert success message after form
    contactForm.insertAdjacentElement('afterend', successMessage);

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Show error message if form submission fails
 * @param {string} errorMessage - The error message to display
 */
function showFormError(errorMessage) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.style.color = 'red';
    errorElement.style.padding = '1rem';
    errorElement.style.marginTop = '1rem';
    errorElement.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    errorElement.style.borderRadius = '5px';
    errorElement.style.textAlign = 'center';
    errorElement.style.fontWeight = 'bold';
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage || 'There was an error sending your message. Please try again.'}`;

    // Insert error message after form
    contactForm.insertAdjacentElement('afterend', errorElement);

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}