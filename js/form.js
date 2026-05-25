/**
 * Contact form — Web3Forms integration
 */

const contactForm    = document.getElementById('contact-form');
const thankYouModal  = document.getElementById('thank-you');
const thankYouClose  = document.getElementById('thank-you-close');

document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    initThankYouModal();
});

/* ── Form submit ─────────────────────────────────────────────── */
function initFormValidation() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return false;

    const submitBtn = contactForm.querySelector('.submit-btn');
    setLoading(submitBtn, true);

    const formData = new FormData(contactForm);
    const object   = {};
    formData.forEach((value, key) => { object[key] = value; });

    fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(object)
    })
    .then(async response => {
        const json = await response.json();
        if (response.status === 200) {
            contactForm.reset();
            showThankYouModal();
        } else {
            console.error('Form submission error:', json);
            alert('Something went wrong. Please try again or contact me directly via email.');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        alert('Something went wrong. Please try again or contact me directly via email.');
    })
    .finally(() => {
        setLoading(submitBtn, false);
    });
}

/* ── Loading state ───────────────────────────────────────────── */
function setLoading(btn, isLoading) {
    if (!btn) return;
    if (isLoading) {
        btn.classList.add('loading');
        btn.disabled = true;
    } else {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

/* ── Validation ──────────────────────────────────────────────── */
function validateForm() {
    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');

    let valid = true;

    [nameInput, emailInput, messageInput].forEach(input => {
        if (!input.value.trim()) {
            setFieldError(input, true);
            valid = false;
        } else {
            setFieldError(input, false);
        }
    });

    if (valid) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            setFieldError(emailInput, true);
            valid = false;
        }
    }

    return valid;
}

function setFieldError(input, hasError) {
    if (hasError) {
        input.style.borderColor = '#ef4444';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 450);
    } else {
        input.style.borderColor = '';
    }
}

/* ── Thank-you modal ─────────────────────────────────────────── */
function initThankYouModal() {
    if (thankYouModal && thankYouClose) {
        thankYouClose.addEventListener('click', () => {
            thankYouModal.classList.remove('show');
        });
    }

    // URL param support (for redirect flow)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' && thankYouModal) {
        showThankYouModal();
    }
}

function showThankYouModal() {
    if (thankYouModal) {
        thankYouModal.classList.add('show');
        setTimeout(() => thankYouModal.classList.remove('show'), 5000);
    }
}

/* ── Reset field error on typing ─────────────────────────────── */
if (contactForm) {
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}
