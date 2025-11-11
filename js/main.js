/**
 * Main JavaScript file for the portfolio website
 */

// DOM Elements
const header = document.getElementById('header');
const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Initializing the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    initScrollListener();
    initMenuToggle();
    initSmoothScrolling();
    initScrollAnimation();
});

/**
 * Handle header styles on scroll
 */
function initScrollListener() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlighting the active nav link based on scroll position
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.parentElement.classList.add('active');
            }
        });
    });
}

/**
 * Mobile menu toggle functionality
 */
function initMenuToggle() {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Closing the menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
        const isMenuBtn = e.target.closest('#menu-btn');
        const isNavList = e.target.closest('.nav-list');

        if (!isMenuBtn && !isNavList && navList.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navList.classList.remove('active');
        }
    });

    // Closing the mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Accounting for the fixed header height
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Handle scroll-based animations
 */
function initScrollAnimation() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-right, .animate-fade-in-left');

    // Observer options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Adding the animation class based on the element's class
                if (element.classList.contains('animate-fade-in-up')) {
                    element.classList.add('animated', 'fade-in-up');
                } else if (element.classList.contains('animate-fade-in-right')) {
                    element.classList.add('animated', 'fade-in-right');
                } else if (element.classList.contains('animate-fade-in-left')) {
                    element.classList.add('animated', 'fade-in-left');
                }

                // Unobserving element after animation
                observer.unobserve(element);
            }
        });
    }, options);

    // Observing all elements to animate
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}