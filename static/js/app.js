/* ============================================================
   LIFETWIN — Global JavaScript Utilities
   ============================================================ */

(function () {
    'use strict';

    /* ── DOM Ready ─────────────────────────────────────────── */
    function onReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    /* ── Scroll‑Reveal (IntersectionObserver) ──────────────── */
    function initScrollReveal() {
        const targets = document.querySelectorAll('.fade-in');
        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        targets.forEach((el) => observer.observe(el));
    }

    /* ── Mobile Nav Toggle ─────────────────────────────────── */
    function initMobileNav() {
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('nav-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ── CSRF Token Helper (Django) ────────────────────────── */
    function getCsrfToken() {
        const cookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken='));
        return cookie ? cookie.split('=')[1] : '';
    }

    /* ── Fetch Wrapper with CSRF ───────────────────────────── */
    function apiFetch(url, options = {}) {
        const defaults = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            },
        };
        return fetch(url, { ...defaults, ...options });
    }

    /* ── Expose Utilities Globally ─────────────────────────── */
    window.LifeTwin = {
        getCsrfToken,
        apiFetch,
    };

    /* ── Bootstrap ─────────────────────────────────────────── */
    onReady(() => {
        initScrollReveal();
        initMobileNav();
    });
})();
