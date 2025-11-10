/**
 * Custom cursor functionality
 */

// DOM Elements
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// Don't initialize custom cursor on touch devices
if (!('ontouchstart' in window)) {
    initCustomCursor();
}

/**
 * Initialize custom cursor functionality
 */
function initCustomCursor() {
    // Initial cursor position outside viewport
    let cursorX = -100;
    let cursorY = -100;

    // Smoothing factor (0 = no smoothing, 1 = maximum smoothing)
    const smoothing = 0.15;

    // For smooth animation
    let currentX = -100;
    let currentY = -100;

    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-item');

    interactiveElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.border = '2px solid rgba(11, 211, 211, 0.5)';
        });

        element.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.border = '2px solid rgba(0, 122, 204, 0.5)';
        });
    });

    // Animation loop for smooth cursor movement
    function animateCursor() {
        // Calculate new position with smoothing
        currentX += (cursorX - currentX) * smoothing;
        currentY += (cursorY - currentY) * smoothing;

        // Update dot position
        cursorDot.style.left = `${currentX}px`;
        cursorDot.style.top = `${currentY}px`;

        // Update outline position with slight delay for trailing effect
        cursorOutline.style.left = `${currentX}px`;
        cursorOutline.style.top = `${currentY}px`;

        // Continue animation loop
        requestAnimationFrame(animateCursor);
    }

    // Start animation loop
    animateCursor();

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Show custom cursor
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';

    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        }
    });

    // Show cursor when entering window
    document.addEventListener('mouseover', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}