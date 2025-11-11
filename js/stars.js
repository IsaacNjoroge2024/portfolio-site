/**
 * Creates an enhanced starry background effect
 */

document.addEventListener('DOMContentLoaded', () => {
    createStars();
});

/**
 * Generate and animate stars in the background
 */
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const numberOfStars = 400; // Increased from 200 to 400

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
    const isShapedStar = Math.random() < 0.5;

    // Creating the star element
    const star = document.createElement('div');
    star.classList.add('star');

    if (isShapedStar) {
        star.classList.add('shaped-star');
        // Random rotation for shaped stars
        const rotation = Math.random() * 360;
        star.style.transform = `rotate(${rotation}deg)`;
    }

    // Random size between 1px and 4px
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;

    // Animation properties
    const opacity = Math.random() * 0.7 + 0.5;
    const duration = Math.random() * 8 + 2;
    const delay = Math.random() * 5;
    const distance = Math.random() * 10 - 5;

    // Setting the CSS variables for the animation
    star.style.setProperty('--opacity', opacity);
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--distance', `${distance}px`);
    star.style.animationDelay = `${delay}s`;

    container.appendChild(star);

    // After animation completes, am recreating the star
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
    // Debouncing the resize event
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        createStars();
    }, 250);
});