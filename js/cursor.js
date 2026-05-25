/**
 * Custom dual-layer cursor (dot + lagged ring)
 * Hidden automatically on touch/mobile devices via CSS
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
});

function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring) return;

    // Exit on touch/mobile — belt-and-suspenders alongside the CSS media query,
    // because (hover: none) is unreliable on some Android browsers.
    const isTouch = window.matchMedia('(hover: none)').matches ||
                    window.matchMedia('(pointer: coarse)').matches ||
                    ('ontouchstart' in window);
    if (isTouch) {
        dot.style.display  = 'none';
        ring.style.display = 'none';
        return;
    }

    // Current mouse position
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    // Ring's lerped position
    let rx = mx;
    let ry = my;

    // Track mouse
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;

        // Dot follows instantly
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    // Lerp helper
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    // Ring follows with lag
    (function animateRing() {
        rx = lerp(rx, mx, 0.11);
        ry = lerp(ry, my, 0.11);
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    })();

    // Hover state on interactive elements
    const interactives = document.querySelectorAll(
        'a, button, .skill-item, .project-card, .tab-btn, .project-link, .hero-chip, .tech-tag'
    );

    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('cursor-hover');
            ring.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('cursor-hover');
            ring.classList.remove('cursor-hover');
        });
    });

    // Hide cursors when mouse leaves window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
    });
}
