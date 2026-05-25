/**
 * Main JavaScript — Isaac Njoroge Portfolio
 */

// DOM Elements
const header    = document.getElementById('header');
const menuBtn   = document.getElementById('menu-btn');
const navList   = document.getElementById('nav-list');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section');

document.addEventListener('DOMContentLoaded', () => {
    initScrollListener();
    initMenuToggle();
    initSmoothScrolling();
    initScrollAnimation();
    initScrollProgress();
    initMagneticButtons();
    initSkillTabs();
    initFooterYear();
    initStaggerIndex();
});

/* ── Scroll: header shrink + active nav ──────────────────────── */
function initScrollListener() {
    window.addEventListener('scroll', () => {
        // Header shrink
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop    = section.offsetTop;
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

/* ── Mobile menu toggle ───────────────────────────────────────── */
function initMenuToggle() {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!e.target.closest('#menu-btn') &&
            !e.target.closest('.nav-list') &&
            navList.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navList.classList.remove('active');
        }
    });

    // Close on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });
}

/* ── Smooth scrolling ─────────────────────────────────────────── */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId  = this.getAttribute('href');
            const targetEl  = document.querySelector(targetId);
            if (targetEl) {
                const headerHeight   = header.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

/* ── Scroll-triggered animations (IntersectionObserver) ──────── */
function initScrollAnimation() {
    const animatedEls = document.querySelectorAll(
        '.animate-fade-in-up, .animate-fade-in-right, .animate-fade-in-left, .animate-zoom-in'
    );

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            if      (el.classList.contains('animate-fade-in-up'))    el.classList.add('animated', 'fade-in-up');
            else if (el.classList.contains('animate-fade-in-right'))  el.classList.add('animated', 'fade-in-right');
            else if (el.classList.contains('animate-fade-in-left'))   el.classList.add('animated', 'fade-in-left');
            else if (el.classList.contains('animate-zoom-in'))        el.classList.add('animated', 'zoom-in');

            obs.unobserve(el);
        });
    }, { root: null, rootMargin: '0px', threshold: 0.12 });

    animatedEls.forEach(el => observer.observe(el));
}

/* ── Scroll progress bar ─────────────────────────────────────── */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY /
            (document.body.scrollHeight - window.innerHeight) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
}

/* ── Magnetic buttons ────────────────────────────────────────── */
function initMagneticButtons() {
    // Only on devices with a precise pointer (mouse), not touch
    if (window.matchMedia('(hover: none)').matches) return;

    const magnets = document.querySelectorAll('.cta-btn, .submit-btn');

    magnets.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width  / 2;
            const y = e.clientY - rect.top  - rect.height / 2;
            btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ── Skills tabs ─────────────────────────────────────────────── */
function initSkillTabs() {
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `tab-${target}`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/* ── Footer year ─────────────────────────────────────────────── */
function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ── Stagger index for [data-stagger] containers ─────────────── */
function initStaggerIndex() {
    document.querySelectorAll('[data-stagger]').forEach(container => {
        Array.from(container.children).forEach((child, i) => {
            child.style.setProperty('--index', i);
        });
    });
}
