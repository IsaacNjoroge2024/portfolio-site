/**
 * Typing animation for hero subtitle
 * Cycles through an array of phrases with type/erase loop
 */

document.addEventListener('DOMContentLoaded', () => {
    initTyping();
});

function initTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'production-grade backends.',
        'microservice architectures.',
        'fullstack web apps.',
        'clean, scalable APIs.',
        'things that actually work.'
    ];

    const TYPE_SPEED   = 75;   // ms per character while typing
    const ERASE_SPEED  = 38;   // ms per character while erasing
    const PAUSE_AFTER  = 1800; // ms to pause at end of phrase
    const PAUSE_BEFORE = 400;  // ms to pause before typing next phrase

    let phraseIndex = 0;
    let charIndex   = 0;
    let isErasing   = false;

    function tick() {
        const current = phrases[phraseIndex];

        if (isErasing) {
            // Remove one character
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isErasing = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(tick, PAUSE_BEFORE);
                return;
            }
            setTimeout(tick, ERASE_SPEED);

        } else {
            // Add one character
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                // Finished typing — pause then erase
                isErasing = true;
                setTimeout(tick, PAUSE_AFTER);
                return;
            }
            setTimeout(tick, TYPE_SPEED);
        }
    }

    // Small initial delay so the hero fade-in animation finishes first
    setTimeout(tick, 1200);
}
