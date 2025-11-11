/**
 * Creates a starry background effect
 */

document.addEventListener('DOMContentLoaded', () => {
    createStars();
});

/**
 * Generate and animate stars in the background
 */
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const numberOfStars = 200;

    if (!starsContainer) return;

    // Clear any existing stars first
    starsContainer.innerHTML = '';

    for (let i = 0; i < numberOfStars; i++) {
        createStar(starsContainer);
    }
}

/**
 * Create a single star element
 * @param {HTMLElement} container - The container to append the star to
 */
function createStar(container) {
    // Create star element
    const star = document.createElement('div');
    star.classList.add('star');

    // Random size between 1px and 3px
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;

    // Animation properties
    const opacity = Math.random() * 0.5 + 0.3; // Between 0.3 and 0.8
    const duration = Math.random() * 15 + 10; // Between 10s and 25s
    const delay = Math.random() * 10; // Between 0s and 10s
    const distance = Math.random() * 10 - 5; // Between -5px and 5px (for subtle movement)

    // Set CSS variables for the animation
    star.style.setProperty('--opacity', opacity);
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--distance', `${distance}px`);
    star.style.animationDelay = `${delay}s`;

    // Add star to container
    container.appendChild(star);

    // After animation completes, recreate the star
    setTimeout(() => {
        if (container.contains(star)) {
            container.removeChild(star);
            createStar(container);
        }
    }, (duration + delay) * 1000);
}

/**
 * Re-create stars when the window is resized
 */
window.addEventListener('resize', () => {
    // Debounce the resize event
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        createStars();
    }, 250);
});