/* ============================================================
   LIFETWIN — core/animations.js
   ============================================================
   Reusable, performant animation utilities.

   RESPONSIBILITIES:
   ✦ Fade-in on scroll     — IntersectionObserver-powered
   ✦ Counter animation     — smooth ease-out number count-up
   ✦ Progress bar animation — bar-fill on scroll into view

   All helpers are exposed on window.LifeTwin.animate so that
   page scripts can call them directly. Two "auto" functions
   are also provided that core/app.js triggers on boot.
   ============================================================ */

(function () {
    'use strict';

    window.LifeTwin = window.LifeTwin || {};

    /* ══════════════════════════════════════════════════════════
       1.  FADE-IN ON SCROLL
       ──────────────────────────────────────────────────────────
       Observes elements matching the given selector and adds
       class `visible` with an optional stagger delay when each
       enters the viewport.

       @param {string} selector   — CSS selector (default '.fade-in')
       @param {Object} opts
         opts.threshold  — IntersectionObserver threshold   (0.15)
         opts.rootMargin — IntersectionObserver rootMargin  ('0px 0px -40px 0px')
         opts.stagger    — delay in ms between reveals      (0 = no stagger)
       ══════════════════════════════════════════════════════════ */
    function fadeInOnScroll(selector, opts) {
        selector = selector || '.fade-in';
        opts = opts || {};

        var threshold = opts.threshold !== undefined ? opts.threshold : 0.15;
        var rootMargin = opts.rootMargin !== undefined ? opts.rootMargin : '0px 0px -40px 0px';
        var stagger = opts.stagger || 0;

        var targets = document.querySelectorAll(selector);
        if (!targets.length) return;

        var revealIndex = 0;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    var el = entry.target;
                    var delay = stagger ? revealIndex * stagger : 0;
                    revealIndex++;

                    if (delay) {
                        setTimeout(function () { el.classList.add('visible'); }, delay);
                    } else {
                        el.classList.add('visible');
                    }

                    observer.unobserve(el);
                });
            },
            { threshold: threshold, rootMargin: rootMargin }
        );

        targets.forEach(function (el) { observer.observe(el); });
    }

    /* ══════════════════════════════════════════════════════════
       2.  COUNTER ANIMATION
       ──────────────────────────────────────────────────────────
       Smoothly counts a DOM element's textContent from 0 to
       `target` using an ease-out cubic curve.

       @param {HTMLElement} el        — element to animate
       @param {number}      target    — final numeric value
       @param {string}      suffix    — text appended (e.g. '%', '+')
       @param {number}      duration  — animation ms (default 1600)
       @param {boolean}     isFloat   — show one decimal place
       ══════════════════════════════════════════════════════════ */
    function animateCounter(el, target, suffix, duration, isFloat) {
        if (!el) return;
        suffix = suffix || '';
        duration = duration || 1600;

        var start = performance.now();

        function tick(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            var value = target * eased;

            el.textContent = isFloat
                ? value.toFixed(1) + suffix
                : Math.round(value).toLocaleString() + suffix;

            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    /* ── Auto Counters ────────────────────────────────────── *
     * Looks for [data-count] elements and uses
     * IntersectionObserver to trigger animateCounter
     * when each scrolls into view.
     * ═══════════════════════════════════════════════════════ */
    function autoCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    var el = entry.target;
                    var target = parseFloat(el.getAttribute('data-count'));
                    var suffix = el.getAttribute('data-suffix') || '';
                    var dur = parseInt(el.getAttribute('data-duration'), 10) || 1600;
                    var float = el.hasAttribute('data-float');

                    animateCounter(el, target, suffix, dur, float);
                    observer.unobserve(el);
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach(function (el) { observer.observe(el); });
    }

    /* ══════════════════════════════════════════════════════════
       3.  PROGRESS BAR ANIMATION
       ──────────────────────────────────────────────────────────
       Animates the width of bar-fill elements when they first
       scroll into view. Reads the target width from:
         • data-width attribute   ("87%")
         • inline style width     (already set but starts at 0)

       @param {string} selector — CSS selector for bar fills
       @param {Object} opts
         opts.threshold — IntersectionObserver threshold (0.3)
         opts.delay     — base delay before animating ms (200)
         opts.stagger   — extra delay per bar in ms      (0)
       ══════════════════════════════════════════════════════════ */
    function animateProgressBars(selector, opts) {
        selector = selector || '[data-width]';
        opts = opts || {};

        var threshold = opts.threshold !== undefined ? opts.threshold : 0.3;
        var baseDelay = opts.delay || 200;
        var stagger = opts.stagger || 0;

        var bars = document.querySelectorAll(selector);
        if (!bars.length) return;

        var index = 0;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    var el = entry.target;
                    var width = el.getAttribute('data-width') || el.dataset.target || '';
                    var delay = baseDelay + (stagger ? index * stagger : 0);
                    index++;

                    if (width) {
                        // Start width at 0, then animate to target
                        el.style.width = '0%';
                        el.style.transition = 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
                        setTimeout(function () { el.style.width = width; }, delay);
                    }

                    observer.unobserve(el);
                });
            },
            { threshold: threshold }
        );

        bars.forEach(function (el) { observer.observe(el); });
    }

    /* ── Auto Progress Bars ───────────────────────────────── *
     * Convenience wrapper called by core/app.js on boot.
     * Targets common bar-fill selectors across all pages.
     * ═══════════════════════════════════════════════════════ */
    function autoProgressBars() {
        animateProgressBars('.sim-preview__bar-fill', { stagger: 100 });
        animateProgressBars('.lifestyle-item__bar-fill', { stagger: 120 });
    }

    /* ══════════════════════════════════════════════════════════
       4.  STAGGERED FADE-IN  (utility)
       ──────────────────────────────────────────────────────────
       Immediately adds .visible to a group of elements with
       a configurable stagger delay. Useful for JS-driven
       reveals without IntersectionObserver.
       ══════════════════════════════════════════════════════════ */
    function staggerFadeIn(selector, delayStep) {
        var elements = document.querySelectorAll(selector);
        if (!elements.length) return;
        delayStep = delayStep || 100;

        elements.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('visible'); }, i * delayStep);
        });
    }

    /* ══════════════════════════════════════════════════════════
       5.  EXPOSE ON NAMESPACE
       ══════════════════════════════════════════════════════════ */
    window.LifeTwin.animate = {
        /* manual helpers — called by page scripts */
        fadeInOnScroll: fadeInOnScroll,
        counter: animateCounter,
        progressBars: animateProgressBars,
        staggerFadeIn: staggerFadeIn,

        /* auto helpers — called by core/app.js on boot */
        autoCounters: autoCounters,
        autoProgressBars: autoProgressBars,
    };

    /* ══════════════════════════════════════════════════════════
       6.  BOOTSTRAP
       ══════════════════════════════════════════════════════════ */
    function initPage() {
        console.log('[LifeTwin] core/animations.js initialized');
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPage();
    });
})();
