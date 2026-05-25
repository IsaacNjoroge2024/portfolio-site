/**
 * Starry background — animated stars + occasional shooting stars
 */

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    scheduleShootingStars();
});

/* ── Regular stars ───────────────────────────────────────────── */
function createStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    container.innerHTML = '';

    const count = 400;
    for (let i = 0; i < count; i++) {
        createStar(container);
    }
}

function createStar(container) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Size: three tiers for visual depth
    const tier = Math.random();
    let size;
    if (tier < 0.6)       size = Math.random() * 1.2 + 0.5;  // small
    else if (tier < 0.9)  size = Math.random() * 1.5 + 1.5;  // medium
    else                  size = Math.random() * 1.5 + 3.0;   // large/bright

    star.style.width  = `${size}px`;
    star.style.height = `${size}px`;

    // Position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top  = `${Math.random() * 100}%`;

    // Animation
    const opacity  = Math.random() * 0.65 + 0.35;
    const duration = Math.random() * 7 + 2;
    const delay    = Math.random() * 5;
    const distance = Math.random() * 10 - 5;

    star.style.setProperty('--opacity',  opacity);
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--distance', `${distance}px`);
    star.style.animationDelay = `${delay}s`;

    container.appendChild(star);

    // Recycle after animation
    setTimeout(() => {
        if (container.contains(star)) {
            container.removeChild(star);
            createStar(container);
        }
    }, (duration + delay) * 1000);
}

/* ── Shooting stars ──────────────────────────────────────────── */
function scheduleShootingStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    function fire() {
        createShootingStar(container);
        // Next shooting star in 4–10 seconds
        setTimeout(fire, Math.random() * 6000 + 4000);
    }

    // First one after a short wait
    setTimeout(fire, Math.random() * 3000 + 3000);
}

function createShootingStar(container) {
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    // Random position in upper 60% of screen
    star.style.top  = `${Math.random() * 55}%`;
    star.style.left = `${Math.random() * 65}%`;

    container.appendChild(star);

    // Remove after animation completes
    setTimeout(() => {
        if (container.contains(star)) {
            container.removeChild(star);
        }
    }, 1300);
}

/* ── Recreate on resize (debounced) ──────────────────────────── */
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        createStars();
    }, 250);
});
