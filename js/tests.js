/**
 * Test suite for the portfolio website
 *
 * This file contains tests for the main functionality of the portfolio website.
 * To run the tests, open the browser console on the website.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Running portfolio website tests...');
    runAllTests();
});

/**
 * Run all test functions
 */
function runAllTests() {
    try {
        testDOMElements();
        testNavigation();
        testResponsiveMenu();
        testContactForm();
        testAnimations();

        console.log('%c✅ All tests passed!', 'color: green; font-weight: bold; font-size: 14px;');
    } catch (error) {
        console.error('%c❌ Test failed:', 'color: red; font-weight: bold; font-size: 14px;', error);
    }
}

/**
 * Test if all important DOM elements are present
 */
function testDOMElements() {
    console.log('Testing DOM elements...');

    // Test critical elements
    const criticalElements = [
        { id: 'header', name: 'Header' },
        { id: 'menu-btn', name: 'Menu Button' },
        { id: 'nav-list', name: 'Navigation List' },
        { id: 'hero', name: 'Hero Section' },
        { id: 'about', name: 'About Section' },
        { id: 'projects', name: 'Projects Section' },
        { id: 'contact', name: 'Contact Section' },
        { id: 'contact-form', name: 'Contact Form' }
    ];

    criticalElements.forEach(element => {
        const domElement = document.getElementById(element.id);
        if (!domElement) {
            throw new Error(`Critical element not found: ${element.name} (id: ${element.id})`);
        }
    });

    // Test form elements
    const formElements = [
        { id: 'name', name: 'Name Input' },
        { id: 'email', name: 'Email Input' },
        { id: 'message', name: 'Message Input' }
    ];

    formElements.forEach(element => {
        const domElement = document.getElementById(element.id);
        if (!domElement) {
            throw new Error(`Form element not found: ${element.name} (id: ${element.id})`);
        }
    });

    console.log('✓ All DOM elements present');
}

/**
 * Test navigation functionality
 */
function testNavigation() {
    console.log('Testing navigation...');

    const navLinks = document.querySelectorAll('.nav-link');

    // Test if navigation links exist
    if (navLinks.length === 0) {
        throw new Error('No navigation links found');
    }

    // Test if navigation links have correct href attributes
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) {
            throw new Error(`Navigation link has invalid href: ${href}`);
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) {
            throw new Error(`Navigation link target not found: ${targetId}`);
        }
    });

    console.log('✓ Navigation links correct');
}

/**
 * Test responsive menu functionality
 */
function testResponsiveMenu() {
    console.log('Testing responsive menu...');

    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');

    // Test menu button click
    const originalState = navList.classList.contains('active');

    // Simulate click
    menuBtn.click();

    // Check if state changed
    const newState = navList.classList.contains('active');
    if (newState === originalState) {
        throw new Error('Menu button click did not toggle menu state');
    }

    // Reset state
    if (newState !== originalState) {
        menuBtn.click();
    }

    console.log('✓ Responsive menu works');
}

/**
 * Test contact form validation
 */
function testContactForm() {
    console.log('Testing contact form validation...');

    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Save original values
    const originalValues = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };

    // Test empty validation
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';

    // Create submit event
    const submitEvent = new Event('submit', { cancelable: true });

    // Dispatch event
    const prevented = !contactForm.dispatchEvent(submitEvent);

    if (!prevented) {
        throw new Error('Form submission not prevented with empty fields');
    }

    // Test email validation
    nameInput.value = 'Test Name';
    emailInput.value = 'invalid-email';
    messageInput.value = 'Test message';

    // Dispatch event again
    const preventedInvalidEmail = !contactForm.dispatchEvent(new Event('submit', { cancelable: true }));

    if (!preventedInvalidEmail) {
        throw new Error('Form submission not prevented with invalid email');
    }

    // Restore original values
    nameInput.value = originalValues.name;
    emailInput.value = originalValues.email;
    messageInput.value = originalValues.message;

    console.log('✓ Contact form validation works');
}

/**
 * Test if animation classes are properly applied
 */
function testAnimations() {
    console.log('Testing animations...');

    // Test if animation classes exist in CSS
    const styleSheets = Array.from(document.styleSheets);
    let animationRulesFound = false;

    for (const sheet of styleSheets) {
        try {
            // Access cssRules safely (can throw if CORS issue)
            const cssRules = sheet.cssRules;
            for (let i = 0; i < cssRules.length; i++) {
                const rule = cssRules[i];
                if (rule.type === CSSRule.KEYFRAMES_RULE) {
                    animationRulesFound = true;
                    break;
                }
            }
        } catch (e) {
            // Silently fail on CORS issues
        }

        if (animationRulesFound) break;
    }

    if (!animationRulesFound) {
        console.warn('⚠️ Could not verify animation rules due to CORS or other issues');
    } else {
        console.log('✓ Animation rules found in CSS');
    }

    // Test if title and subtitle have animation classes
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');

    if (title && !getComputedStyle(title).animationName) {
        console.warn('⚠️ Title element does not have animation applied');
    }

    if (subtitle && !getComputedStyle(subtitle).animationName) {
        console.warn('⚠️ Subtitle element does not have animation applied');
    }

    console.log('✓ Animation tests completed');
}

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runAllTests,
        testDOMElements,
        testNavigation,
        testResponsiveMenu,
        testContactForm,
        testAnimations
    };
}