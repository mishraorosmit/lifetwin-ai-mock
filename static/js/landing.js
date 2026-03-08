/* ============================================================
   LIFETWIN — Landing Page JavaScript
   ============================================================ */

(function () {
    'use strict';

    /* ── Animate stat counters ─────────────────────────────── */
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const duration = 1600;
                    const start = performance.now();

                    function tick(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
                        if (progress < 1) requestAnimationFrame(tick);
                    }

                    requestAnimationFrame(tick);
                    observer.unobserve(el);
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach((el) => observer.observe(el));
    }

    /* ── Animate simulation bars ───────────────────────────── */
    function animateSimBars() {
        const bars = document.querySelectorAll('.sim-preview__bar-fill');
        if (!bars.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const width = el.getAttribute('data-width');
                    // Slight delay for a staggered feel
                    setTimeout(() => {
                        el.style.width = width;
                    }, 200);
                    observer.unobserve(el);
                });
            },
            { threshold: 0.3 }
        );

        bars.forEach((el) => observer.observe(el));
    }

    /* ── Typewriter effect for hero title (optional accent) ── */
    function initTypewriter() {
        const el = document.getElementById('hero-typed');
        if (!el) return;
        const words = ['Decisions', 'Health', 'Career', 'Lifestyle', 'Future'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const current = words[wordIndex];
            if (isDeleting) {
                el.textContent = current.substring(0, charIndex--);
            } else {
                el.textContent = current.substring(0, charIndex++);
            }

            let delay = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex > current.length) {
                delay = 2000; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex < 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }

            setTimeout(type, delay);
        }

        type();
    }

    /* ── Bootstrap ─────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        animateCounters();
        animateSimBars();
        initTypewriter();
    });
})();
